import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import type { SocialLink } from '../../types/data'
import { Button } from '../common/Button'
import Dock from '../ui/Dock'
import { TextAnimate } from '../ui/text-animate'

type ContactProps = {
  socialLinks: SocialLink[]
}

type ContactFormValues = {
  name: string
  email: string
  message: string
}

export const Contact = ({ socialLinks }: ContactProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>()
  const [isSuccess, setIsSuccess] = useState(false)

  const orbitDuration = useMemo(() => 18, [])

  const dockItems = useMemo(
    () =>
      socialLinks.map((link) => {
        const Icon = link.icon
        return {
          icon: <Icon size={24} className="text-white" />,
          label: link.platform,
          onClick: () => window.open(link.url, '_blank'),
        }
      }),
    [socialLinks]
  )

  const onSubmit = async (values: ContactFormValues) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // Check if keys are placeholders
    if (serviceId === 'your_service_id_here' ||
      templateId === 'your_template_id_here' ||
      publicKey === 'your_public_key_here') {
      alert('Please update the .env file with your actual EmailJS keys.')
      return
    }

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(serviceId, templateId, {
          ...values,
          to_email: 'paiminthway13@gmail.com',
        }, publicKey)

        setIsSuccess(true)
        reset()
        // Clear success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000)
      } catch (error) {
        console.error('EmailJS Error:', error)
        alert('Failed to send message. Please try again later.')
      }
    } else {
      console.warn('EmailJS environment variables are missing.')
      alert('Email service is not configured. Please check your .env file.')
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-10 lg:grid-cols-[1.2fr_1fr]"
        >
          <div>
            <TextAnimate
              as="p"
              animation="slideUp"
              by="word"
              className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400"
            >
              Contact
            </TextAnimate>
            <TextAnimate
              as="h2"
              animation="slideUp"
              by="word"
              className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white"
            >
              Let’s build something together
            </TextAnimate>
            <TextAnimate
              as="p"
              animation="slideUp"
              by="word"
              className="mt-4 text-sm text-slate-600 dark:text-slate-300"
            >
              Share a project idea, collaboration, or just say hello. The form connects through EmailJS for quick
              delivery.
            </TextAnimate>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Name
                </label>
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-aurora dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200"
                  {...register('name', { required: true })}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-rose-500">Please enter your name.</p>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Email
                </label>
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-aurora dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200"
                  type="email"
                  {...register('email', {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-rose-500">Enter a valid email address.</p>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Message
                </label>
                <textarea
                  className="mt-2 min-h-[140px] w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-aurora dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200"
                  {...register('message', { required: true, minLength: 10 })}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-rose-500">Share at least 10 characters.</p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                {isSuccess && (
                  <span className="text-xs font-semibold text-emerald-500">Message sent!</span>
                )}
              </div>
            </form>
          </div>
          <div className="relative flex min-h-[360px] items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border border-slate-200/60 dark:border-slate-800/60"
              animate={{ rotate: 360 }}
              transition={{ duration: orbitDuration, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-10 rounded-full border border-slate-200/60 dark:border-slate-800/60"
              animate={{ rotate: -360 }}
              transition={{ duration: orbitDuration - 4, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute bottom-24 flex w-full flex-col items-center gap-2">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Connect</p>
              <a href="tel:+959778332553" className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                +95 9 778 332 553
              </a>
            </div>
            <Dock
              items={dockItems}
              panelHeight={68}
              baseItemSize={50}
              magnification={70}
              position="center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
