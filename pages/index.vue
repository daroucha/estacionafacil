<script setup lang="ts">
definePageMeta({
  layout: 'unauth',
  title: 'estacionafacil',
  middleware: 'unauth'
})
</script>

<template>
  <LoginForm />
</template>