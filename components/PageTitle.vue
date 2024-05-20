<script setup lang="ts">
interface PropsPageTitle {
  title: string
}

defineProps<PropsPageTitle>()
</script>

<template>
  <div id="PageTitle" class="page-title">
    <h1 class="
      dark:text-neutral-50
      font-bold
      text-3xl
      text-neutral-900
    ">
      {{ title }}
    </h1>

    <div class="tools">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-title {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.page-title>.tools {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 24px;
  justify-content: flex-end;
  width: auto;
}
</style>