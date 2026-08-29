<script lang="ts" setup>
defineProps({
  isText: {
    type: Boolean,
    default: false,
  },
})

const navigation = getNavigation('home') as Record<string, Navigation>

const route = useRoute()
const localePath = useLocalePath()
</script>

<template>
  <div class="mx-auto my-2 flex w-full items-center justify-center">
    <header class="rounded-full">
      <SpotlightButton
        rounded
        transparent
        :animate="false"
        class="border border-white/10"
      >
        <nav class="z-10 flex h-[50px] justify-around gap-0.5 p-1 transition-all duration-300 ease-in-out sm:h-[45px] sm:gap-2 sm:hover:gap-4">
          <NuxtLink
            v-for="item in navigation"
            :id="item.name.toLowerCase().replace(/\s+/g, '-')"
            :key="item.name"
            :aria-label="item.external ? item.name + ' (opens in a new tab)' : item.name + ' navigation link'"
            :class="[
              item.primary
                ? 'text-[#F0A07A] hover:text-[#f7bfa3]'
                : !item.external && localePath(item.to) === route.path
                  ? 'border border-white/5 bg-zinc-900/10 text-white/75 shadow-2xl shadow-white/50 backdrop-blur-3xl text-shadow-sm'
                  : 'text-muted',
            ]"
            :to="item.external ? item.to : localePath(item.to)"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener' : undefined"
            class="flex items-center rounded-full border border-transparent px-2.5 py-1 transition-all duration-300 ease-in-out hover:border-white/5 hover:bg-zinc-900/50 hover:backdrop-blur-3xl sm:px-4"
          >
            <UIcon
              :name="item.icon"
              class="size-7 font-light sm:size-6"
            />
          </NuxtLink>
        </nav>
      </SpotlightButton>
    </header>
  </div>
</template>
