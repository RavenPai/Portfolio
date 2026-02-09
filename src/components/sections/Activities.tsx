import { memo, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code,
  Cpu,
  Users,
  Calendar,
  Projector,
  X,
  ChevronLeft,
  ChevronRight,
  Trophy,
} from "lucide-react"
import { BentoCard, BentoGrid } from '../ui/BentoGrid'
import type { Activity } from '../../types/data'
import { TextAnimate } from '../ui/text-animate'


type ActivitiesProps = {
  activities: Activity[]
}

const getIcon = (title: string) => {
  if (title.includes('CodeMutant')) return Code
  if (title.includes('Science')) return Cpu
  if (title.includes('STEM')) return Users
  if (title.includes('Anniversary')) return Calendar
  if (title.includes('Project')) return Projector
  return Trophy
}

const getClass = (index: number) => {
  switch (index) {
    case 0:
      return "col-span-1 lg:row-span-2" // Left Top (Tall)
    case 1:
      return "col-span-1 lg:row-span-1" // Left Bottom (Short)
    case 2:
      return "col-span-1 lg:row-span-3" // Middle (Full)
    case 3:
      return "col-span-1 lg:row-span-1" // Right Top (Short)
    case 4:
      return "col-span-2 lg:row-span-1" // Right Bottom (Tall)
    default:
      return "col-span-1"
  }
}

const ActivitiesComponent = ({ activities }: ActivitiesProps) => {
  // Filter only Event category
  const eventActivities = useMemo(() => activities.filter(a => a.category === 'Event'), [activities])
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleOpen = (activity: Activity) => {
    setSelectedActivity(activity)
    setCurrentImageIndex(0)
  }

  const handleClose = () => {
    setSelectedActivity(null)
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedActivity) return
    setCurrentImageIndex((prev) =>
      prev === selectedActivity.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedActivity) return
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedActivity.images.length - 1 : prev - 1
    )
  }

  return (
    <section id="activities" className="py-20 bg-transparent">
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
              Showcase
            </TextAnimate>
            <TextAnimate
              as="h2"
              animation="slideUp"
              by="word"
              className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white"
            >
              Recent Activities
            </TextAnimate>
          </div>

          <BentoGrid className="lg:grid-rows-[repeat(3,minmax(10rem,1fr))] lg:grid-cols-3 auto-rows-[minmax(10rem,auto)]">
            {eventActivities.map((activity, index) => (
              <BentoCard
                key={activity.title}
                name={activity.title}
                className={getClass(index)}
                background={
                  <div className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-80">
                    <img
                      src={activity.images[0]}
                      alt={activity.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                }
                Icon={getIcon(activity.title)}
                description=""
                href="#"
                cta="View Gallery"
                onClick={() => handleOpen(activity)}
              />
            ))}
          </BentoGrid>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800">
                <img
                  src={selectedActivity.images[currentImageIndex]}
                  alt={`${selectedActivity.title} - ${currentImageIndex + 1}`}
                  className="h-full w-full object-contain"
                />

                {selectedActivity.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                      {selectedActivity.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 w-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedActivity.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-blue-500">{selectedActivity.role}</span>
                  <span>•</span>
                  <span>{selectedActivity.date}</span>
                </div>
                <p className="mt-4 text-slate-600 dark:text-slate-300 text-justify">
                  {selectedActivity.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export const Activities = memo(ActivitiesComponent)
