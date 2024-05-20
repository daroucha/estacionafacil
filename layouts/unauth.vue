<script setup lang="ts">
const route = useRoute()

useHead({
  title: route.meta.title,
  meta: [
    { property: 'og:title', content: route.meta.title }
  ]
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>