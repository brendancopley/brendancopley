export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/scripts',
  ],

  imports: {
    presets: [
      {
        from: 'vue-sonner',
        imports: ['toast'],
      },
    ],
  },

  devtools: {
    enabled: true,
  },

  css: ['~/assets/style/main.css'],

  site: {
    url: 'https://brendancopley.com',
    defaultLocale: 'en',
    indexable: true,
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  content: {
    renderer: {
      anchorLinks: false,
    },
    preview: {
      api: 'https://api.nuxt.studio',
      dev: true,
    },
  },

  mdc: {
    highlight: {
      theme: {
        dark: 'github-dark',
        default: 'github-dark',
        light: 'github-light',
      },
    },
  },

  runtimeConfig: {
    private: {
      // Supplied at runtime as a Worker secret: NUXT_PRIVATE_RESEND_API_KEY.
      resendApiKey: '',
    },
    public: {
      // The endpoint ships with every deploy now, so the form is always live.
      // A missing key surfaces as a 503 from the handler, not as a dead form.
      resend: true,
    },
  },

  // NOTE: the template disabled prerendering of '/' for Nuxt Studio live preview.
  // That left the whole site as an SPA shell with no server-rendered HTML, the exact
  // reason the old site was invisible to search engines. Every route is prerendered now.

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    viewTransition: true,
  },

  compatibilityDate: '2025-01-05',

  nitro: {
    // Cloudflare Workers with static assets. Nitro emits the worker entry at
    // .output/server/index.mjs and the prerendered site at .output/public.
    preset: 'cloudflare_module',
    cloudflare: {
      // Emits .output/server/wrangler.json with `main` and the ASSETS binding
      // already pointed at .output/public, merged over ./wrangler.jsonc.
      deployConfig: true,
      nodeCompat: true,
    },
    experimental: {
      websocket: true,
    },
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: ['/'],
    },
  },

  hooks: {
    'nitro:config': (config) => {
      // Registered unconditionally. This used to depend on the build machine
      // holding the API key, which on a static host meant never.
      config.handlers?.push({
        method: 'post',
        route: '/api/emails/send',
        handler: '~~/server/emails/send.ts',
      })
    },
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    // prefix_except_default so canonical URLs are /works, not /en/works.
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
  },

  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons',
      },
    ],
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
    provider: 'iconify',
  },

  ogImage: {
    zeroRuntime: true,
  },

  // The default sitemap picked up two things that must not be indexed: the /en/* aliases
  // (duplicates of the canonical unprefixed routes, and they 404) and @nuxt/content's
  // internal sql_dump endpoints.
  sitemap: {
    exclude: ['/en', '/en/**', '/__nuxt_content/**'],
  },

  robots: {
    disallow: ['/__nuxt_content/'],
  },
})
