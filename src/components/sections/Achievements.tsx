import { motion } from 'framer-motion'
import { useState, memo } from 'react'
import type { Activity } from '../../types/data'
import { TextAnimate } from '../ui/text-animate'
import { MotionCarousel } from '@/components/animate-ui/components/community/motion-carousel'
import type { EmblaOptionsType } from 'embla-carousel'

type AchievementsProps = {
  achievements: Activity[]
}

const AchievementsComponent = ({ achievements }: AchievementsProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="achievements" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-12"
        >
          <div className="text-center">
            <TextAnimate
              as="p"
              animation="slideUp"
              by="word"
              className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400"
            >
              Honors
            </TextAnimate>
            <TextAnimate
              as="h2"
              animation="slideUp"
              by="word"
              className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white"
            >
              Achievements
            </TextAnimate>
          </div>

          {(() => {
            const options: EmblaOptionsType = { loop: true, align: 'center' }
            const slides = achievements.map((item, i) => (
              <div
                key={`${item.title}-${i}`}
                className="relative size-full overflow-hidden rounded-lg bg-white/20 shadow-md backdrop-blur-sm dark:bg-slate-900/20"
                onClick={() => setSelectedImage(item.images[0])}
                role="button"
                aria-label={`${item.title} preview`}
              >
                <img
                  src={item.images[0]}
                  alt={`${item.title} image`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between rounded-lg bg-white/30 dark:bg-slate-900/40 backdrop-blur-md shadow-lg ring-1 ring-white/50 dark:ring-slate-800 px-4 py-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{item.title}</p>
                    <p className="text-xs text-slate-800 dark:text-slate-200">{item.date}</p>
                  </div>
                  <span className="text-xs font-bold text-blue-400 dark:text-blue-300 whitespace-nowrap">
                    {item.role}
                  </span>
                </div>
              </div>
            ))
            return <MotionCarousel slides={slides} options={options} />
          })()}
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={selectedImage}
            alt="Full view"
            className="max-h-[90vh] max-w-full rounded-lg shadow-2xl"
          />
        </div>
      )}
    </section>
  )
}

export const Achievements = memo(AchievementsComponent)
