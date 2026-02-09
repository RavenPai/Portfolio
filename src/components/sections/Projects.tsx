import { useEffect, useState, memo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '../../types/data'
import { Badge } from '../ui/Badge'
import { Button } from '../common/Button'
import { TextAnimate } from '../ui/text-animate'
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
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack'

type ProjectsProps = {
  projects: Project[]
}

const ProjectsComponent = ({ projects }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project)
  }, [])

  const handleProjectClose = useCallback(() => {
    setSelectedProject(null)
  }, [])

  useEffect(() => {
    const body = document.body
    const html = document.documentElement
    const prevBodyOverflow = body.style.overflow
    const prevHtmlOverflow = html.style.overflow

    if (selectedProject) {
      body.style.overflow = 'hidden'
      html.style.overflow = 'hidden'
    }

    return () => {
      body.style.overflow = prevBodyOverflow
      html.style.overflow = prevHtmlOverflow
    }
  }, [selectedProject])

  return (
    <section id="projects" className="py-20 bg-transparent">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10 text-center">
            <TextAnimate
              as="p"
              animation="slideUp"
              by="word"
              className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400"
            >
              Projects
            </TextAnimate>
            <TextAnimate
              as="h2"
              animation="slideUp"
              by="word"
              className="mt-6 text-3xl font-semibold text-slate-900 dark:text-white"
            >
              Selected Case Studies
            </TextAnimate>
          </div>

          <div className="flex flex-col md:hidden">
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
                  <Carousel className="w-full" opts={{ loop: true }}>
                    <CarouselContent>
                      {project.images.map((image, imgIndex) => (
                        <CarouselItem key={`${project.title}-img-${imgIndex}`}>
                          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/20 dark:bg-slate-900/20 shadow-md backdrop-blur-sm">
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
                    <Button onClick={() => handleProjectSelect(project)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:block">
            <ScrollStack
              useWindowScroll
              itemDistance={200}
              itemScale={0.06}
              itemStackDistance={0}
              stackPosition="20%"
              scaleEndPosition="20%"
              baseScale={0.88}
              rotationAmount={0}
              blurAmount={3}
              isPaused={!!selectedProject}
            >
              {projects.map((project) => (
                <ScrollStackItem
                  key={`stack-${project.title}`}
                  itemClassName="mt-0 h-auto min-h-[26rem] bg-white/40 dark:bg-slate-900/40 ring-1 ring-slate-200 dark:ring-slate-800 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-2 gap-10">
                    <div>
                      <Carousel className="w-full" opts={{ loop: true }}>
                        <CarouselContent>
                          {project.images.map((image, imgIndex) => (
                            <CarouselItem key={`${project.title}-stack-img-${imgIndex}`}>
                              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/20 dark:bg-slate-900/20 shadow-md backdrop-blur-sm">
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
                    <div className="flex flex-col justify-center">
                      <h3 className="mb-4 text-3xl font-bold uppercase tracking-tight text-slate-900 dark:text-white lg:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mb-6 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                        {project.description}
                      </p>
                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={`${project.title}-stack-${tech}`} className="text-sm px-3 py-1">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <Button onClick={() => handleProjectSelect(project)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-900/60 p-4 backdrop-blur-sm"
            onClick={handleProjectClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[85vh] max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white/90 shadow-2xl backdrop-blur dark:bg-slate-900/20"
            >
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={handleProjectClose}
                  className="rounded-full bg-white/80 p-2 text-slate-500 backdrop-blur transition hover:text-slate-900 dark:bg-slate-950/80 dark:text-slate-400 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain" data-lenis-prevent>
                <div className="relative h-52 shrink-0 w-full sm:h-64">
                  <img
                    src={selectedProject.images[0]}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold sm:text-3xl">{selectedProject.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <span key={tech} className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="project-details-prose prose prose-slate dark:prose-invert max-w-none flex-1 prose-headings:mb-3 prose-headings:mt-6 first:prose-headings:mt-0 prose-headings:font-semibold prose-headings:tracking-tight prose-h3:text-2xl prose-h3:font-bold prose-h3:underline prose-h3:decoration-2 prose-h3:underline-offset-4 prose-p:mb-4 prose-ul:my-5 prose-ul:list-none prose-li:mb-8 prose-li:py-0 prose-li:last:mb-0 prose-li:leading-[1.7] prose-li:text-[15px] prose-strong:font-semibold prose-strong:text-slate-900 prose-strong:dark:text-slate-100">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        h3: ({ children, ...props }) => (
                          <h3 className="text-2xl font-bold underline decoration-2 underline-offset-4 mb-3 mt-6 first:mt-0 text-slate-900 dark:text-slate-100" {...props}>
                            {children}
                          </h3>
                        ),
                        li: ({ children, ...props }) => (
                          <li className="pl-0 mb-8 last:mb-0" {...props}>
                            <span className="block text-slate-700 dark:text-slate-300">
                              {children}
                            </span>
                          </li>
                        ),
                      }}
                    >
                      {selectedProject.details}
                    </ReactMarkdown>
                  </div>

                  {selectedProject.repoUrl && selectedProject.repoUrl !== '#' && (
                    <div className="mt-8 shrink-0 border-t border-slate-200 pt-8 dark:border-slate-800">
                      <a
                        href={selectedProject.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        View Source Code
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export const Projects = memo(ProjectsComponent)
