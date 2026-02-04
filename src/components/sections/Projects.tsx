import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '../../types/data'
import { Badge } from '../ui/Badge'
import { Button } from '../common/Button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { X } from 'lucide-react'

type ProjectsProps = {
  projects: Project[]
}

export const Projects = ({ projects }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Projects
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
              Selected Case Studies
            </h2>
          </div>

          <div className="flex flex-col">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col gap-8 border-b border-slate-200 py-16 last:border-0 dark:border-slate-800 md:flex-row md:gap-16 lg:gap-24"
              >
                {/* Image Section - Carousel */}
                <div className="w-full md:w-1/2">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {project.images.map((image, imgIndex) => (
                        <CarouselItem key={`${project.title}-img-${imgIndex}`}>
                          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900 shadow-md">
                            <img
                              src={image}
                              alt={`${project.title} screenshot ${imgIndex + 1}`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>

                {/* Content Section */}
                <div className="flex w-full flex-col justify-center md:w-1/2">
                  <h3 className="mb-6 text-3xl font-bold uppercase tracking-tight text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
                    {project.title}
                  </h3>

                  <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-300 text-justify">
                    {project.description}
                  </p>

                  <div className="mb-8 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={`${project.title}-${tech}`} className="text-sm px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button onClick={() => setSelectedProject(project)}>
                      View Details
                    </Button>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
            >
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full bg-white/80 p-2 text-slate-500 backdrop-blur transition hover:text-slate-900 dark:bg-slate-950/80 dark:text-slate-400 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="h-full overflow-y-auto">
                <div className="relative h-64 w-full sm:h-80">
                  <img
                    src={selectedProject.images[0]}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-3xl font-bold">{selectedProject.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <span key={tech} className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {selectedProject.details}
                    </ReactMarkdown>
                  </div>

                  <div className="mt-8 flex gap-4 border-t border-slate-200 pt-8 dark:border-slate-800">
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                    >
                      View Live Demo
                    </a>
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      View Source Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
