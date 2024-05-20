<script setup lang="ts">
const route = useRoute()

useHead({
  title: `${route.meta.title} - estacionafacil`,
  meta: [
    { property: 'og:title', content: `${route.meta.title} - estacionafacil` }
  ]
})
</script>

<template>
  <div>
    <AppSidebar />
    <slot />
  </div>
</template>