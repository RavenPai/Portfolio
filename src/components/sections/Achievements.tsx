import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Activity } from '../../types/data'
import { Card } from '../common/Card'
import { TextAnimate } from '../ui/text-animate'

type AchievementsProps = {
  achievements: Activity[]
}

export const Achievements = ({ achievements }: AchievementsProps) => {
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

          <div className="flex flex-col gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group flex w-full overflow-hidden p-0 bg-slate-950/95 text-slate-50 dark:bg-slate-900">
                  <button
                    type="button"
                    className="relative h-28 w-40 shrink-0 overflow-hidden bg-slate-900 sm:h-32 sm:w-48"
                    onClick={() => setSelectedImage(achievement.images[0])}
                    aria-label={`View ${achievement.title} image`}
                  >
                    <img
                      src={achievement.images[0]}
                      alt={achievement.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </button>

                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="truncate text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
                        {achievement.title}
                      </h3>
                      <span className="shrink-0 rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100">
                        {achievement.category}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      {achievement.role}
                    </p>

                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-800 dark:text-slate-300 text-justify">
                      {achievement.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
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
