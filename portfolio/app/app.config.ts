export default defineAppConfig({
  global: {
    meetingLink: 'https://cal.com/radfab',
    available: true,
  },
  profile: {
    name: 'Brendan Copley',
    job: 'Principal AI Engineer, production agentic systems',
    email: 'brendancopley@protonmail.com',
    // Deliberately no phone number: the contact surface is email and cal.com/radfab.
    location: 'Irvine, California',
    picture: 'https://avatars.githubusercontent.com/u/15661730?v=4',
  },
  // Social.vue throws on any link its regex map does not recognise, so only add
  // keys whose domain is listed there (github, twitter, linkedin, instagram, spotify).
  socials: {
    github: 'https://github.com/brendancopley',
    linkedin: 'https://www.linkedin.com/in/brendancopley',
  },
  seo: {
    title: 'Brendan Copley, Principal AI Engineer',
    description: 'I build agentic AI systems that survive production. 12+ years shipping for Amazon Prime Video, Bethesda, Lionsgate, Cisco and Renaissance Learning. LangGraph, LangSmith, MLX fine-tuning and evaluation pipelines.',
    url: 'https://brendancopley.com',
  },
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'neutral',
    },
    notifications: {
      position: 'top-0 bottom-auto',
    },
    notification: {
      progress: {
        base: 'absolute bottom-0 end-0 start-0 h-0',
        background: 'bg-transparent dark:bg-transparent',
      },
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
      defaultVariants: {
        color: 'neutral',
      },
    },
    input: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    textarea: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    icons: {
      loading: 'lucide:loader',
    },
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
})