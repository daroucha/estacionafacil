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
  <AppLayout>
    <AppSidebar />

    <AppPage>
      <slot />
    </AppPage>
  </AppLayout>
</template>