type Where = 'home' | 'app'

export type Navigation = {
  name: string
  to: string
  icon: string
  /** External destinations open in a new tab and are never passed through localePath. */
  external?: boolean
  /** Marks the primary call to action so the navbar can accent it. */
  primary?: boolean
}

export function getNavigation(where: Where): Record<string, Navigation> | [] {
  switch (where) {
    case 'home':
      return {
        home: {
          name: 'Home',
          to: '/',
          icon: 'lucide:home',
        },
        writing: {
          name: 'Writing',
          to: '/writing',
          icon: 'lucide:library',
        },
        about: {
          name: 'About',
          to: '/about',
          icon: 'lucide:user',
        },
        contact: {
          name: 'Contact',
          to: '/contact',
          icon: 'lucide:mail',
        },
        github: {
          name: 'GitHub',
          to: 'https://github.com/brendancopley',
          icon: 'custom:github',
          external: true,
        },
        linkedin: {
          name: 'LinkedIn',
          to: 'https://www.linkedin.com/in/brendancopley',
          icon: 'custom:linkedin',
          external: true,
        },
        meeting: {
          name: 'Schedule a meeting',
          to: 'https://cal.com/radfab',
          icon: 'lucide:calendar-days',
          external: true,
          primary: true,
        },
      }
    default:
      return []
  }
}
