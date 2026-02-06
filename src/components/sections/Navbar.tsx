import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { navItems } from '../../constants/navigation'
import { ThemeSwitcher } from '../common/ThemeSwitcher'
import { useTheme } from '../../contexts/ThemeContext'
import ShinyText from '../ui/ShinyText'

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Glass effect trigger
      setScrolled(currentScrollY > 12)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  return (
    <header
      className="fixed top-0 z-50 w-full px-6 py-6"
    >
      <div
        className={clsx(
          'mx-auto flex max-w-6xl items-center justify-between rounded-full border px-6 py-3 transition-all duration-300',
          scrolled
            ? 'border-white/40 bg-white/75 shadow-glass backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70'
            : 'border-transparent bg-white/30 backdrop-blur',
        )}
      >
        <a href="#home" className="flex items-center gap-3">
          <img
            src="/Marr.gif"
            alt="Logo"
            className="h-10 w-10 object-contain self-center"
          />
          <ShinyText
            text="Pai Min Thway"
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
          <div className="md:hidden">
            <select
              aria-label="Jump to section"
              className="rounded-full border border-slate-200 bg-white/70 px-3 py-2 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200"
              onChange={(event) => {
                const target = document.querySelector(event.target.value)
                target?.scrollIntoView({ behavior: 'smooth' })
              }}
              value={activeSection || ""}
            >
              <option value="" disabled>
                Navigate
              </option>
              {navItems.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <ThemeSwitcher theme={theme} onToggle={toggleTheme} />
        </div>
      </div>
    </header>
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
