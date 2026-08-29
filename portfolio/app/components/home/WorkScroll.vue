<script setup lang="ts">
import type { Collections } from '@nuxt/content'

/**
 * The home page IS the portfolio: one full-viewport panel per project, image behind,
 * copy over the top. There is no separate /works page.
 *
 * The reveal is an IntersectionObserver adding a class rather than a scroll handler, so
 * no work happens on the scroll thread. The copy starts hidden, so `@media (scripting:
 * none)` below un-hides it for anyone the observer will never run for.
 */

const { data: projects } = await useAsyncData('work-scroll', async () => {
  const all = await queryCollection('projects_en').all() as Collections['projects_en'][]
  return [...all].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
})

const root = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null

onMounted(() => {
  const panels = Array.from(root.value?.querySelectorAll<HTMLElement>('.panel') ?? [])

  // Respect the motion preference: reveal everything at once instead of on scroll.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    panels.forEach(el => el.classList.add('in'))
    return
  }

  io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in')
        io?.unobserve(entry.target)
      }
    }
  }, { rootMargin: '-12% 0px -12% 0px' })

  panels.forEach(el => io!.observe(el))
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section
    ref="root"
    class="work"
    aria-label="Selected work"
  >
    <article
      v-for="(project, i) in projects"
      :key="project.name"
      class="panel"
    >
      <!-- Plain <img>, not NuxtImg. These webps are already the right size (1536w, ~50KB)
           and a full-bleed background needs no srcset. NuxtImg with sizes="100vw" resolved
           to /_ipx/w_2/ — a 2x1 pixel, 46-byte image stretched over the viewport. -->
      <img
        :src="project.image"
        :alt="`Illustrative image for ${project.name}`"
        class="bg"
        width="1536"
        height="869"
        :loading="i === 0 ? 'eager' : 'lazy'"
        :fetchpriority="i === 0 ? 'high' : 'auto'"
        decoding="async"
      >
      <div
        class="scrim"
        aria-hidden="true"
      />
      <div class="copy">
        <p class="eyebrow">
          {{ project.eyebrow ?? project.release }}
        </p>
        <h2>{{ project.name }}</h2>
        <p
          v-if="project.summary"
          class="summary"
        >
          {{ project.summary }}
        </p>
        <p
          v-if="project.detail"
          class="detail"
        >
          {{ project.detail }}
        </p>
        <NuxtLink
          v-if="project.link"
          :to="project.link"
          target="_blank"
          rel="noopener"
          class="more"
        >
          {{ project.link.includes('linkedin.com') ? 'More on LinkedIn' : 'Visit' }}
          <UIcon
            name="heroicons:arrow-right"
            class="size-4"
          />
        </NuxtLink>
      </div>
    </article>
  </section>
</template>

<style scoped>
.panel {
  position: relative;
  /* svh so mobile browser chrome does not crop the last line of copy. */
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Carries the text contrast. The copy sits in the bottom third, so the gradient is
   weighted there — white on this passes AA comfortably. */
.scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(9, 9, 11, 0.94) 0%,
    rgba(9, 9, 11, 0.82) 28%,
    rgba(9, 9, 11, 0.45) 55%,
    rgba(9, 9, 11, 0.35) 100%
  );
}

.copy {
  position: relative;
  width: 100%;
  max-width: 46rem;
  padding: 0 6vw 12vh;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.panel.in .copy {
  opacity: 1;
  transform: none;
}

.eyebrow {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #f0a07a;
  margin-bottom: 0.75rem;
}

.copy h2 {
  font-size: clamp(2rem, 5.5vw, 4rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0 0 1rem;
}

.summary {
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.92);
  margin: 0 0 0.75rem;
}

.detail {
  font-size: 0.95rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.72);
  margin: 0 0 1.5rem;
}

.more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  padding-bottom: 2px;
  transition: border-color 0.2s ease;
}

.more:hover {
  border-color: #fff;
}

.more:focus-visible {
  outline: 2px solid #f0a07a;
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .copy {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* Without scripting the IntersectionObserver never runs, and .copy would stay at
   opacity 0 — the entire portfolio invisible. Show it instead. */
@media (scripting: none) {
  .copy {
    opacity: 1;
    transform: none;
  }
}
</style>
