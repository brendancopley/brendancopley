<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
const { profile, seo, socials } = useAppConfig()

useSchemaOrg([
  definePerson({
    name: profile.name,
    jobTitle: profile.job,
    description: seo.description,
    image: profile.picture,
    url: seo.url,
    sameAs: [socials.github, socials.linkedin],
    knowsAbout: [
      'LangGraph',
      'LangChain',
      'LangSmith',
      'Multi-agent systems',
      'Model Context Protocol',
      'LLM evaluation',
      'MLX fine-tuning',
      'Retrieval-augmented generation',
      'Kubernetes',
      'Distributed systems',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'RADFAB',
      description: 'Independent AI engineering consultancy.',
      url: seo.url,
    },
  }),
  defineWebSite({ name: seo.title, url: seo.url, inLanguage: 'en-US' }),
  defineWebPage(),
])
</script>

<template>
  <Html
    :lang="locale"
    class="font-geist text-[var(--ui-text)] transition-colors duration-300 selection:bg-white/60 selection:text-zinc-800"
  >
    <Body>
      <LayoutScrollToTop />
      <NuxtLayout>
        <UApp :locale="locales[locale]">
          <NuxtPage />
        </UApp>
      </NuxtLayout>
      <Toaster close-button />
      <DotPattern class="absolute inset-0 -z-10 size-full fill-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
    </Body>
  </Html>
</template>
