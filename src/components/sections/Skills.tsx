import { memo } from 'react'
import { motion } from 'framer-motion'
import type { Skill } from '../../types/data'
import { TextAnimate } from '../ui/text-animate'
import GlareHover from '../ui/GlareHover'

type SkillsProps = {
  skills: Skill[]
}

const SkillsComponent = ({ skills }: SkillsProps) => {
  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
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
              className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-600 dark:text-slate-400"
            >
              Expertise
            </TextAnimate>
            <TextAnimate
              as="h2"
              animation="slideUp"
              by="word"
              className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white"
            >
              Skills & Technologies
            </TextAnimate>
          </div>

          <div className="flex flex-col bg-white/40 rounded-xl shadow-sm ring-1 ring-slate-200 backdrop-blur-sm dark:bg-slate-900/40 dark:ring-slate-800">
            {skills.map((skill, index) => (
              <div key={skill.name}>
                <GlareHover
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareAngle={-10}
                  glareSize={300}
                  transitionDuration={400}
                  playOnce={false}
                  className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                >
                  <div className="flex items-center gap-6 p-6 md:p-8">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex flex-1 flex-col md:flex-row md:items-center gap-2 md:gap-8">
                      <TextAnimate
                        as="h3"
                        animation="slideUp"
                        by="word"
                        className="text-xl md:text-2xl font-normal uppercase tracking-wide text-slate-900 dark:text-white shrink-0"
                      >
                        {skill.name}
                      </TextAnimate>
                      <TextAnimate
                        as="p"
                        animation="slideUp"
                        by="word"
                        className="text-xs md:text-sm font-medium uppercase tracking-wider text-slate-700 dark:text-slate-500"
                      >
                        {skill.tech}
                      </TextAnimate>
                    </div>
                  </div>
                </GlareHover>

                {index !== skills.length - 1 && (
                  <div className="h-px w-full bg-slate-100 dark:bg-slate-800" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export const Skills = memo(SkillsComponent)
