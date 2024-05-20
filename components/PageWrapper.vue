<template>
  <div id="PageWrapper" class="page-wrapper">
    <slot />
  </div>
</template>

<style scoped>
.page-wrapper {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  gap: 72px;
  width: 100%;
}
</style>