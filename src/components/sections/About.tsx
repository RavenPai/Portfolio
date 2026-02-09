import { motion } from 'framer-motion'
import { memo } from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/Badge'
import { TextAnimate } from '../ui/text-animate'
import { useTheme } from '../../contexts/ThemeContext'
import {
  Layout,
  Gauge,
  Users,
  Puzzle,
  GraduationCap,
  Award,
} from 'lucide-react'
import { FaReact, FaNodeJs, FaPython, FaLaravel } from 'react-icons/fa'
import { SiRobotframework } from 'react-icons/si'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const gpaData = [
  { short: 'Y1 I', full: 'Year 1 - Sem I', gpa: 3.9 },
  { short: 'Y1 II', full: 'Year 1 - Sem II', gpa: 3.75 },
  { short: 'Y2 I', full: 'Year 2 - Sem I', gpa: 3.84 },
  { short: 'Y2 II', full: 'Year 2 - Sem II', gpa: 3.79 },
  { short: 'Y3 I', full: 'Year 3 - Sem I', gpa: 3.72 },
  { short: 'Y3 II', full: 'Year 3 - Sem II', gpa: 3.58 },
]

const overallCgpa =
  gpaData.reduce((sum, item) => sum + item.gpa, 0) / gpaData.length

const AboutMeComponent = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const axisColor = isDark ? '#94a3b8' : '#334155'

  return (
    <section
      id="about"
      className="py-20 bg-transparent text-slate-900 dark:text-white transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-12"
        >
          {/* Profile Photo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="h-40 w-40">
              <img
                src="/aboutMe.svg"
                alt="About Me"
                className="h-full w-full object-contain"
              />
            </div>
            {/* Decorative glow behind */}
            <div className="absolute -inset-4 -z-10 rounded-full bg-blue-500/20 blur-2xl dark:bg-blue-500/10" />
          </motion.div>

          <div className="w-full space-y-12">
            {/* Heading */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-1.5 rounded-full bg-blue-500" />
              <TextAnimate
                as="h2"
                animation="slideUp"
                by="word"
                className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
              >
                About Me
              </TextAnimate>
            </div>

            {/* Grid 1: Bio & Focus Areas */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Bio */}
              <Card className="border-none bg-white/80 shadow-sm dark:bg-slate-900/80">
                <CardContent className="p-6 md:p-8">
                  <TextAnimate
                    as="p"
                    animation="slideUp"
                    by="line"
                    className="text-lg leading-8 text-slate-800 dark:text-slate-300 text-justify"
                  >
                    I am a Junior Software Developer and CSE Undergraduate at MIIT with over two years of experience in Full-Stack Web Development and AI Integration. I love building software that makes life easier and more connected. With experience ranging from large-scale web platforms to research-funded innovations, I enjoy the challenge of turning complex ideas into simple, user-friendly tools. I'm an enthusiastic learner and a creative problem-solver, always focused on writing clean code that makes a real difference in people's lives.
                  </TextAnimate>
                </CardContent>
              </Card>

              {/* Focus Areas */}
              <div className="flex flex-col justify-center space-y-6">
                <TextAnimate
                  as="h3"
                  animation="slideUp"
                  by="word"
                  className="text-2xl font-semibold text-slate-900 dark:text-white"
                >
                  Focus Areas
                </TextAnimate>
                <ul className="space-y-4">
                  {[
                    {
                      icon: Layout,
                      text: 'Full-Stack Web Development ',
                    },
                    {
                      icon: Gauge,
                      text: 'AI Integration & Data-Driven Solutions',
                    },
                    {
                      icon: Puzzle,
                      text: 'Scalable Software Architecture & System Design',
                    },
                    {
                      icon: Users,
                      text: 'Technical Management & Collaborative Teamwork',
                    },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 text-slate-800 dark:text-slate-300"
                    >
                      <item.icon className="mt-1 h-5 w-5 shrink-0 text-blue-500" />
                      <span>{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Currently Focusing On */}
            <div className="space-y-6">
              <TextAnimate
                as="h3"
                animation="slideUp"
                by="word"
                className="text-2xl font-semibold text-slate-900 dark:text-white"
              >
                Currently Focusing On
              </TextAnimate>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: 'React', icon: FaReact, color: 'text-cyan-400' },
                  { name: 'Laravel', icon: FaLaravel, color: 'text-black dark:text-white' },
                  { name: 'Python', icon: FaPython, color: 'text-blue-500' },
                  { name: 'Node.js', icon: FaNodeJs, color: 'text-green-500' },
                  { name: 'AI', icon: SiRobotframework, color: 'text-blue-600' },
                ].map((tech) => (
                  <Badge
                    key={tech.name}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-slate-800 transition hover:scale-105 dark:bg-slate-800 dark:text-white"
                  >
                    <tech.icon className={`text-lg ${tech.color}`} />
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Grid 2: Education & Chart */}
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                {/* Education */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-2xl font-semibold text-slate-900 dark:text-white">
                    <GraduationCap className="h-6 w-6 text-blue-500" />
                    <TextAnimate as="h3" animation="slideUp" by="word">Education</TextAnimate>
                  </div>
                  <Card className="border-none bg-white/80 shadow-sm dark:bg-slate-900/80">
                    <CardContent className="p-6">
                      <TextAnimate
                        as="h4"
                        animation="slideUp"
                        by="word"
                        className="text-lg font-bold text-slate-900 dark:text-white"
                      >
                        Bachelor of Engineering (Hons)
                      </TextAnimate>
                      <TextAnimate
                        as="p"
                        animation="slideUp"
                        by="word"
                        className="text-blue-700 dark:text-blue-400"
                      >
                        Computer Science and Engineering (CSE)
                      </TextAnimate>
                      <TextAnimate
                        as="p"
                        animation="slideUp"
                        by="word"
                        className="mt-2 text-slate-700 dark:text-slate-400 text-justify"
                      >
                        Myanmar Institute of Information Technology
                      </TextAnimate>
                      <TextAnimate
                        as="p"
                        animation="slideUp"
                        by="word"
                        className="text-sm text-slate-600 dark:text-slate-500 text-justify"
                      >
                        (Currently attending)
                      </TextAnimate>
                    </CardContent>
                  </Card>
                </div>

                {/* Matriculation */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-2xl font-semibold text-slate-900 dark:text-white">
                    <Award className="h-6 w-6 text-blue-500" />
                    <TextAnimate as="h3" animation="slideUp" by="word">Matriculation Exam</TextAnimate>
                  </div>
                  <Card className="border-none bg-white/80 shadow-sm dark:bg-slate-900/80">
                    <CardContent className="p-6">
                      <TextAnimate
                        as="p"
                        animation="slideUp"
                        by="word"
                        className="text-lg font-medium text-slate-900 dark:text-white"
                      >
                        Passed with 5 Distinctions
                      </TextAnimate>
                      <TextAnimate
                        as="p"
                        animation="slideUp"
                        by="word"
                        className="text-slate-700 dark:text-slate-400 text-justify"
                      >
                        Total Mark: 506
                      </TextAnimate>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Academic Performance Chart */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  Academic Performance
                </h3>
                <Card className="border-none bg-white/80 shadow-sm dark:bg-slate-900/80">
                  <CardContent className="p-6">
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={gpaData}
                          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                          <defs>
                            <linearGradient
                              id="colorGpa"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#3B82F6"
                                stopOpacity={1}
                              />
                              <stop
                                offset="100%"
                                stopColor="#8B5CF6"
                                stopOpacity={1}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="short"
                            stroke={axisColor}
                            tick={{ fill: axisColor, fontSize: 12 }}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke={axisColor}
                            tick={{ fill: axisColor, fontSize: 12 }}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 4]}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              border: 'none',
                              borderRadius: '8px',
                              color: '#fff',
                            }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            labelFormatter={(_, payload: any) =>
                              payload && payload[0] && payload[0].payload?.full
                                ? payload[0].payload.full
                                : _
                            }
                            formatter={(value: number) => [`GPA: ${value.toFixed(2)}`, '']}
                          />
                          <Bar
                            dataKey="gpa"
                            fill="url(#colorGpa)"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1500}
                          >
                            {gpaData.map((_, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill="url(#colorGpa)"
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="mt-4 text-center text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Overall CGPA: {overallCgpa.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const AboutMe = memo(AboutMeComponent)
export default AboutMe
