<script setup lang="ts">
const { profile } = useAppConfig()

defineProps({
  isText: {
    type: Boolean,
    default: false,
  },
})

// Derived from app.config rather than hardcoded, so the mark follows the
// profile name. This replaced the Nuxt template's `custom:maison-hochard`
// icon, which was the template author's own studio monogram.
const initials = computed(() =>
  String(profile.name)
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase(),
)
</script>

<template>
  <NuxtLinkLocale
    to="/"
    class="flex shrink-0 items-center"
    :aria-label="`${profile.name} — go back to home page`"
  >
    <span class="font-newsreader text-white-shadow text-2xl italic leading-none">
      {{ initials }}
    </span>
    <span
      v-if="isText"
      class="ml-2 text-xs font-semibold"
    >
      {{ profile.name }}
    </span>
  </NuxtLinkLocale>
</template>
