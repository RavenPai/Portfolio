import type { Project } from '../types/data'

export const projects: Project[] = [
  {
    title: 'Lotus Shrine',
    description: 'The Digital Shrine Room. An innovative web-based application designed to bridge the gap for individuals unable to visit physical pagodas.',
    tech: ['React', 'AI Integration', 'Web'],
    demoUrl: '#',
    repoUrl: 'https://github.com/KhantNyrrThwin/Lotus_Shrine',
    images: [
      '/projects/lotusShrine/1.PNG',
      '/projects/lotusShrine/2.PNG',
      '/projects/lotusShrine/3.PNG',
      '/projects/lotusShrine/4.PNG',
      '/projects/lotusShrine/5.PNG',
      '/projects/lotusShrine/6.PNG',
      '/projects/lotusShrine/7.PNG',
      '/projects/lotusShrine/8.PNG',
      '/projects/lotusShrine/9.PNG',
      '/projects/lotusShrine/10.PNG',
      '/projects/lotusShrine/11.PNG',
      '/projects/lotusShrine/12.PNG',
      '/projects/lotusShrine/13.PNG',
    ],
    details: `
### Features

- **Immersive Virtual Experiences**: Provides guided meditation, virtual pagoda visits with birthday-specific "corner" views, and access to traditional chants.
- **AI Integration**: Utilizes AI-powered posture detection to offer real-time feedback during meditation.
- **Spiritual Tracking**: Includes a personalized "Koe Na Win Dashboard" to manage 81-day spiritual vows, track progress, and send daily reminders.
`,
  },
  {
    title: 'Alpha Rover',
    description: 'A versatile robotic platform equipped with a manipulator arm designed for high-precision tasks.',
    tech: ['Robotics', 'Mechanical Engineering', 'Programming'],
    demoUrl: '#',
    repoUrl: '#',
    images: [
      '/projects/alphaRover/1.jpg',
      '/projects/alphaRover/2.jpg',
      '/projects/alphaRover/3.jpg',
    ],
    details: `
### Features

- **Multi-Disciplinary Design**: Combines advanced mechanical engineering and programming to handle complex object manipulation.
- **Safety and Efficiency**: Aimed at improving operations in challenging environments, including space exploration, disaster management, and industrial automation.
`,
  },
  {
    title: 'Interactive Mobile Delivery EV Robot',
    description: 'An autonomous and remotely controllable delivery system designed for efficient campus logistics.',
    tech: ['Raspberry Pi', 'ESP32', 'Python', 'Flask', '3D Printing'],
    demoUrl: '#',
    repoUrl: '#',
    images: [
      '/projects/evDelivery/Mem2.jpg',
      '/projects/evDelivery/EVCar.jpg',
      '/projects/evDelivery/3DModel1.jpg',
      '/projects/evDelivery/3DModel2.jpg',
      '/projects/evDelivery/PrintedParts.jpg',
      '/projects/evDelivery/Mem1.jpg',
    ],
    details: `
### Features

- **Dual-Processing Architecture**: Utilizes a Raspberry Pi 5 for central operations and high-level tasks, paired with an ESP32 for low-latency motor control via Bluetooth.
- **Navigation & Sensing**: Features a 360° LiDAR sensor (12m range) for environment mapping and obstacle detection, alongside a 1080P webcam for real-time video streaming.
- **Smart Driving Modes**: Supports both a Manual Mode via Bluetooth and a Delivery Mode that uses YOLO-based sign detection for semi-autonomous navigation.
- **Secure Delivery System**: Includes a Flask-based web interface for remote monitoring (<500 ms latency) and a delivery management system featuring user authentication and encrypted passcodes sent via email.
- **Integrated Safety**: Implemented an automatic halt function triggered by obstacle detection within a 3-foot range to ensure safe operation.
`,
  },
  {
    title: 'OpGo!! Microprocessor Simulator',
    description: 'A web-based educational simulator designed to simplify the complexities of microprocessor architecture for beginners.',
    tech: ['React', 'TypeScript', 'Vite'],
    demoUrl: '#',
    repoUrl: 'https://github.com/KhantNyrrThwin/OpGO-',
    images: [
      '/projects/opGo!!/1.png',
      '/projects/opGo!!/2.png',
      '/projects/opGo!!/3.png',
      '/projects/opGo!!/4.jpg',
    ],
    details: `
### Features

- **Interactive Learning Environment**: Offers an intuitive interface for writing, debugging, and executing assembly programs with real-time feedback.
- **Custom Instruction Set**: Supports essential operations, including Data Transfer, Arithmetic, Logical, and Program Control, to teach core concepts without overwhelming the user.
- **Real-Time System Monitoring**: Features a live display of registers and flags that updates instantly during execution to enhance visual understanding.
- **Stepwise Execution Controls**: Includes "Step Into" and "Run" functionalities, allowing users to meticulously observe the effect of each individual instruction.
- **Rapid Development**: Designed and implemented over an intensive 11-day period using an agile approach, transitioning from Figma wireframes to a fully functional execution engine.
`,
  },
  {
    title: 'EduPathMM',
    description: 'A comprehensive educational ecosystem developed to bridge the gap between students, institutions, and career experts in Myanmar.',
    tech: ['React', 'TypeScript', 'PHP', 'MySQL', 'Tailwind CSS'],
    demoUrl: '#',
    repoUrl: 'https://github.com/KhantNyrrThwin/EduPath-MM',
    images: [
      '/projects/eduPathMM/1.PNG',
      '/projects/eduPathMM/2.PNG',
      '/projects/eduPathMM/3.PNG',
      '/projects/eduPathMM/4.PNG',
      '/projects/eduPathMM/5.PNG',
      '/projects/eduPathMM/6.PNG',
      '/projects/eduPathMM/Team.PNG',
    ],
    details: `
### Features

- **Career & Institution Discovery**: Features interactive quizzes for career path identification and a searchable directory of educational institutions and courses.
- **Professional Consultant Network**: Facilitates personalized guidance through a consultant booking system, allowing students to schedule appointments with industry experts.
- **Opportunity Tracking**: Keeps users updated on scholarships, seminars, and workshops while providing a community-driven review system for institutions and mentors.
- **Administrative Ecosystem**: Includes dedicated dashboards for administrators to manage content, oversee user accounts, and track engagement metrics through analytics.
- **Modern Tech Stack**: Utilizes Tailwind CSS and Framer Motion for a responsive, animated user interface, supported by a structured RESTful API architecture.
`,
  },
]
