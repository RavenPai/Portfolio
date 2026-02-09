import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

const ATOM_COUNT = 60
const ATOM_RADIUS_MIN = 1.5
const ATOM_RADIUS_MAX = 3.5
const CLICK_PARTICLE_COUNT = 12
const CLICK_PARTICLE_LIFESPAN = 800
const TARGET_FPS = 60
const FRAME_DURATION = 1000 / TARGET_FPS

type Atom = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

type ClickParticle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  createdAt: number
}

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const atomsRef = useRef<Atom[]>([])
  const clickParticlesRef = useRef<ClickParticle[]>([])
  const animationRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef<number>(0)
  const { theme } = useTheme()
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 })

  const isDark = theme === 'dark'

  // Memoize color calculations
  const colors = useMemo(() => ({
    atomColor: isDark ? 'rgba(148, 163, 184, ' : 'rgba(15, 23, 42, ',
    clickColor: isDark ? 'rgba(56, 189, 248, ' : 'rgba(30, 64, 175, ',
  }), [isDark])

  const initAtoms = useCallback(
    (w: number, h: number) => {
      return Array.from({ length: ATOM_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius:
          ATOM_RADIUS_MIN + Math.random() * (ATOM_RADIUS_MAX - ATOM_RADIUS_MIN),
        opacity: 0.3 + Math.random() * 0.5,
      }))
    },
    [],
  )

  const spawnClickParticles = useCallback((x: number, y: number) => {
    const newParticles: ClickParticle[] = Array.from(
      { length: CLICK_PARTICLE_COUNT },
      () => {
        const angle = Math.PI * 2 * Math.random()
        const speed = 1.5 + Math.random() * 2.5
        return {
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 2 + Math.random() * 3,
          opacity: 0.9,
          createdAt: Date.now(),
        }
      },
    )
    clickParticlesRef.current.push(...newParticles)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let resizeTimeout: number | null = null
    const updateSize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
        const w = window.innerWidth
        const h = window.innerHeight
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width = w * dpr
        canvas.height = h * dpr
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
        const ctx = canvas.getContext('2d')
        if (ctx) ctx.scale(dpr, dpr)
        setDimensions({ w, h })
        atomsRef.current = initAtoms(w, h)
      }, 100)
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
      if (resizeTimeout) clearTimeout(resizeTimeout)
    }
  }, [initAtoms])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.w === 0) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const w = dimensions.w
    const h = dimensions.h

    const draw = (currentTime: number) => {
      // FPS throttling
      const elapsed = currentTime - lastFrameTimeRef.current
      if (elapsed < FRAME_DURATION) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }
      lastFrameTimeRef.current = currentTime - (elapsed % FRAME_DURATION)

      ctx.clearRect(0, 0, w, h)

      const now = Date.now()
      const { atomColor, clickColor } = colors

      // Update and draw atoms
      const atoms = atomsRef.current
      for (let i = 0; i < atoms.length; i++) {
        const atom = atoms[i]
        atom.x += atom.vx
        atom.y += atom.vy
        if (atom.x < -10) atom.x = w + 10
        else if (atom.x > w + 10) atom.x = -10
        if (atom.y < -10) atom.y = h + 10
        else if (atom.y > h + 10) atom.y = -10

        ctx.beginPath()
        ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${atomColor}${atom.opacity})`
        ctx.fill()
      }

      // Update and draw click particles (optimized filtering)
      const particles = clickParticlesRef.current
      let writeIndex = 0
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const age = now - p.createdAt
        if (age <= CLICK_PARTICLE_LIFESPAN) {
          p.x += p.vx
          p.y += p.vy
          p.vx *= 0.98
          p.vy *= 0.98
          const life = 1 - age / CLICK_PARTICLE_LIFESPAN
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = `${clickColor}${life * 0.7})`
          ctx.fill()
          particles[writeIndex++] = p
        }
      }
      particles.length = writeIndex

      animationRef.current = requestAnimationFrame(draw)
    }

    animationRef.current = requestAnimationFrame(draw)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions, colors])

  useEffect(() => {
    const onDocumentClick = (e: MouseEvent) => {
      spawnClickParticles(e.clientX, e.clientY)
    }
    document.addEventListener('click', onDocumentClick, { passive: true })
    return () => document.removeEventListener('click', onDocumentClick)
  }, [spawnClickParticles])

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: 'block', willChange: 'transform' }}
      />
    </div>
  )
}
