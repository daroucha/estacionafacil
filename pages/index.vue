<script setup lang="ts">
definePageMeta({
  layout: 'unauth',
  middleware: 'unauth'
})

useHead({
  title: 'estacionafacil'
})
</script>

<template>
  <LoginForm />
</template>