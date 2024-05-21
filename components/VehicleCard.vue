<script setup lang="ts">
interface PropsVehicleCard {
  owner?: string
  picture?: string
  text?: string
  title: string
}

const props = defineProps<PropsVehicleCard>()

const computedPicture = computed(() => props.picture ? props.picture : '/img/blank.png')
</script>

<template>
  <UCard class="w-full relative">
    <div class="min-h-24 flex items-center justify-center">
      <img :src="computedPicture" :alt="title" class="max-w-full h-16 w-auto" />
    </div>

    <template #footer>
      <div class="absolute right-0 mr-4">
        <slot />
      </div>

      <h5 class="text-md font-semibold text-gray-800 dark:text-gray-100">{{ title }}</h5>

      <span v-if="text" class="text-sm font-normal text-gray-600 dark:text-gray-300">{{ text }}</span>

      <div class="flex items-center gap-2 pt-4" v-if="owner">
        <UAvatar :alt="owner" size="xs" />

        <ULink to="/owners" class="text-sm">{{ owner }}</ULink>
      </div>
    </template>
  </UCard>
</template>