import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../common/Button'
import { HighlightText } from '../ui/HighlightText'
import FuzzyText from '../ui/FuzzyText'
import { TextAnimate } from '../ui/text-animate'

type HeroProps = {
  name: string
  title: string
  bio: string
  titleGradientColors?: [string, string, string]
}

const DEFAULT_GRADIENT: [string, string, string] = ['#22d3ee', '#8b5cf6', '#f43f5e']

export const Hero = ({ name, title, bio, titleGradientColors = DEFAULT_GRADIENT }: HeroProps) => {
  const [angle, setAngle] = useState(0)
  const rafRef = useRef<number | null>(null)
  const lastUpdateRef = useRef<number>(0)

  useEffect(() => {
    const UPDATE_INTERVAL = 50 // ms

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= UPDATE_INTERVAL) {
        setAngle((prev) => (prev + 1) % 360)
        lastUpdateRef.current = timestamp
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])


  // Memoize gradient style
  const gradientStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(${angle}deg, ${titleGradientColors[0]}, ${titleGradientColors[1]}, ${titleGradientColors[2]})`
  }), [angle, titleGradientColors])

  const scrollToProjects = useCallback(() => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const scrollToContact = useCallback(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.24),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_55%)]" />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex h-72 w-72 items-center justify-center self-center md:h-80 md:w-80"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-aurora/30 via-violet/20 to-rose/30 blur-2xl" />
          <div className="flex h-64 w-64 items-center justify-center rounded-full border border-white/40 bg-white/60 shadow-glass backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 overflow-hidden">
            <img
              src="/profile.svg"
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <TextAnimate
            as="p"
            animation="slideUp"
            by="word"
            className="text-xs font-bold uppercase tracking-[0.4em] text-black dark:font-semibold dark:text-slate-400"
          >
            {name}
          </TextAnimate>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:font-semibold dark:text-white sm:text-5xl">
            <HighlightText
              className="bg-gradient-to-r from-aurora via-violet to-rose"
              style={gradientStyle}
            >
              {title}
            </HighlightText>
          </h1>
          <TextAnimate
            as="p"
            animation="slideUp"
            by="word"
            className="mt-5 text-lg font-medium text-black dark:font-normal dark:text-slate-300 text-justify"
          >
            {bio}
          </TextAnimate>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button onClick={scrollToProjects}>
              View Projects
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToContact}
            >
              Contact Me
            </Button>
          </div>
          <p className="mt-3 text-base text-slate-800 dark:text-slate-300">
            Or {' '}
            <a
              href="/resume.pdf"
              download
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-black hover:text-black dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover className="text-black dark:text-blue-400">
                DOWNLOAD MY CV ▸
              </FuzzyText>
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
