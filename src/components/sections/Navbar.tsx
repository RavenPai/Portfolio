import { useEffect, useState, memo, useRef } from 'react'
import clsx from 'clsx'
import { Menu, X } from 'lucide-react'
import { navItems } from '../../constants/navigation'
import { ThemeSwitcher } from '../common/ThemeSwitcher'
import { useTheme } from '../../contexts/ThemeContext'
import ShinyText from '../ui/ShinyText'
import { AnimatePresence, motion } from 'framer-motion'

const NavbarComponent = () => {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scrollTimeoutRef = useRef<number | null>(null)

  // Handle scroll effect with debouncing
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = window.setTimeout(() => {
        const currentScrollY = window.scrollY
        // Glass effect trigger
        setScrolled(currentScrollY > 12)
      }, 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  // Active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    navItems.forEach((item) => {
      const section = document.querySelector(item.href)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  // Close menu when clicking on a link
  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 w-full px-6 py-6">
        <div
          className={clsx(
            'mx-auto flex max-w-6xl items-center justify-between rounded-full border px-6 py-3 transition-all duration-300',
            scrolled
              ? 'bg-page-light/80 dark:bg-page-dark/80 backdrop-blur-md shadow-glass border-page-light/30 dark:border-page-dark/30'
              : 'bg-transparent border-transparent'
          )}
        >
          <a href="#home" className="flex items-center gap-3">
            <img
              src="/Marr.gif"
              alt="Logo"
              className="h-10 w-10 object-contain self-center"
            />
            <ShinyText
              text="PMT"
              speed={2}
              delay={0}
              color={theme === 'dark' ? '#b5b5b5' : '#1e293b'}
              shineColor={theme === 'dark' ? '#ffffff' : '#cbd5e1'}
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
              className="text-base leading-none font-bold tracking-tight"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-300 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={activeSection === item.href}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden rounded-full p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <ThemeSwitcher theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-[75%] max-w-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl md:hidden border-l border-white/20 dark:border-slate-700/30"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img
                      src="/Marr.gif"
                      alt="Logo"
                      className="h-8 w-8 object-contain"
                    />
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      PMT
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-full p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 overflow-y-auto p-6">
                  <ul className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <a
                          href={item.href}
                          onClick={handleNavClick}
                          className={clsx(
                            'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                            activeSection === item.href
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          )}
                        >
                          {item.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Menu Footer */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    © 2024 Pai. All rights reserved.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const NavLink = ({ href, label, isActive }: { href: string; label: string; isActive: boolean }) => {
  return (
    <a
      href={href}
      className={clsx(
        "relative text-xs font-semibold uppercase tracking-[0.25em] transition hover:text-slate-900 dark:hover:text-white",
        isActive && "text-blue-600 dark:text-blue-400"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400 rounded-full" />
      )}
    </a>
  )
}

export const Navbar = memo(NavbarComponent)
