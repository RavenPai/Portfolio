import { RiGithubLine, RiLinkedinLine, RiMailLine, RiTelegramLine } from 'react-icons/ri'
import type { SocialLink } from '../types/data'

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/RavenPai', icon: RiGithubLine },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/pai-min-thway-47b735382/', icon: RiLinkedinLine },
  { platform: 'Email', url: 'mailto:paiminthway13@gmail.com', icon: RiMailLine },
  { platform: 'Telegram', url: 'https://t.me/paiminthway', icon: RiTelegramLine },
]
