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
  const items = Array.from(root.value?.querySelectorAll<HTMLElement>('[data-reveal]') ?? [])

  // Respect the motion preference: reveal everything at once instead of on scroll.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(el => el.classList.add('in'))
    return
  }

  // Each line is observed on its own, so the cascade is driven by where the reader
  // actually is rather than by the panel as a whole. The bottom margin holds the trigger
  // back until the line is properly on screen, but it has to stay small enough that the
  // last line of a panel still clears it: at -18% the call to action sat below the
  // trigger and never appeared for anyone who stopped scrolling on a panel.
  io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in')
        io?.unobserve(entry.target)
      }
    }
  }, { rootMargin: '0px 0px -8% 0px' })

  items.forEach(el => io!.observe(el))
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
           to /_ipx/w_2/, a 2x1 pixel 46-byte image stretched over the viewport. -->
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
        <p
          class="eyebrow"
          data-reveal
          style="--i: 0"
        >
          {{ project.dates }}
        </p>
        <h2
          data-reveal
          style="--i: 1"
        >
          {{ project.name }}
        </h2>
        <p
          v-if="project.role"
          class="role"
          data-reveal
          style="--i: 2"
        >
          {{ project.role }}
        </p>
        <dl class="sodr">
          <div
            v-if="project.situation"
            data-reveal
            style="--i: 3"
          >
            <dt>Situation</dt>
            <dd>{{ project.situation }}</dd>
          </div>
          <div
            v-if="project.obstacle"
            data-reveal
            style="--i: 4"
          >
            <dt>Obstacle</dt>
            <dd>{{ project.obstacle }}</dd>
          </div>
          <div
            v-if="project.decision"
            data-reveal
            style="--i: 5"
          >
            <dt>Decision</dt>
            <dd>{{ project.decision }}</dd>
          </div>
          <div
            v-if="project.result"
            data-reveal
            style="--i: 6"
          >
            <dt>Result</dt>
            <dd>{{ project.result }}</dd>
          </div>
        </dl>
        <NuxtLink
          v-if="project.link"
          :to="project.link"
          target="_blank"
          rel="noopener"
          class="more"
          data-reveal
          style="--i: 7"
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
   weighted there, so white on this passes AA comfortably. */
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
  max-width: 52rem;
  padding: 0 6vw 12vh;
}

/* Every line slides up on its own. The index gives the cascade: the eyebrow lands
   first, then the heading, then Situation, Obstacle, Decision, Result in order. */
[data-reveal] {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i, 0) * 80ms);
}

[data-reveal].in {
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

.role {
  font-size: clamp(1.05rem, 1.5vw, 1.35rem);
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1.5rem;
}

/* Four short labelled lines. The label column is fixed so the values align, and it
   collapses to stacked rows on narrow viewports where 5rem of label is too much. */
.sodr {
  display: grid;
  gap: 0.85rem;
  margin: 0 0 1.75rem;
}

.sodr > div {
  display: grid;
  grid-template-columns: 6rem 1fr;
  gap: 1.1rem;
  align-items: baseline;
}

.sodr dt {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 0.85vw, 12px);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(240, 160, 122, 0.9);
}

.sodr dd {
  margin: 0;
  font-size: clamp(0.95rem, 1.3vw, 1.25rem);
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.86);
}

@media (max-width: 640px) {
  .sodr > div {
    grid-template-columns: 1fr;
    gap: 0.15rem;
  }
}

.more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: clamp(0.95rem, 1vw, 1.1rem);
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
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* Without scripting the IntersectionObserver never runs, and every line would stay at
   opacity 0, leaving the entire portfolio invisible. Show it instead. */
@media (scripting: none) {
  [data-reveal] {
    opacity: 1;
    transform: none;
  }
}
</style>
