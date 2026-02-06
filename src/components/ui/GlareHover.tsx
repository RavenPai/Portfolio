import { useRef, useState, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type GlareHoverProps = {
  children: ReactNode
  glareColor?: string
  glareOpacity?: number
  glareAngle?: number
  glareSize?: number
  transitionDuration?: number
  playOnce?: boolean
  className?: string
  lightGlareColor?: string
  lightGlareOpacity?: number
  blendMode?: React.CSSProperties['mixBlendMode']
  blur?: number
}

export default function GlareHover({
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.3,
  glareAngle = -70,
  glareSize = 800,
  transitionDuration = 400,
  playOnce = false,
  className = '',
  lightGlareColor = '#e5e7eb',
  lightGlareOpacity = 0.6,
  blendMode = 'soft-light',
  blur = 3,
}: GlareHoverProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [played, setPlayed] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useLayoutEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    setWidth(el.offsetWidth)
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth))
    ro.observe(el)
    // detect dark mode via Tailwind 'dark' class on <html>
    const root = document.documentElement
    const update = () => setIsDark(root.classList.contains('dark'))
    update()
    const mo = new MutationObserver(update)
    mo.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => ro.disconnect()
  }, [])

  const start = () => {
    if (playOnce && played) return
    setHovered(true)
  }
  const stop = () => {
    if (playOnce) setPlayed(true)
    setHovered(false)
  }

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      {children}
      <motion.div
        initial={{ left: -glareSize }}
        animate={{ left: hovered ? width : -glareSize }}
        transition={{ duration: transitionDuration / 1000, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: glareSize,
          pointerEvents: 'none',
          background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${isDark ? glareColor : lightGlareColor
            } 50%, rgba(255,255,255,0) 100%)`,
          opacity: isDark ? glareOpacity : lightGlareOpacity,
          transform: `rotate(${glareAngle}deg)`,
          filter: `blur(${blur}px)`,
          mixBlendMode: isDark ? 'normal' : blendMode,
          boxShadow: isDark ? undefined : '0 0 0 1px rgba(0,0,0,0.06)',
        }}
        onAnimationComplete={() => {
          if (playOnce) setPlayed(true)
          setHovered(false)
        }}
      />
    </div>
  )
}
