<script setup lang="ts">
interface PropsEmptyState {
  title: string
}

defineProps<PropsEmptyState>()
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full">
    <UIcon name="i-heroicons-circle-stack-20-solid" class="w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4" />

    <h6 class="text-sm text-center text-gray-900 dark:text-white">
      {{ title }}
    </h6>
  </div>
</template>