<template>
  <div id="AppPage" class="page">
    <slot />
  </div>
</template>

<style scoped>
.page {
  box-sizing: border-box;
  display: block;
  height: 100%;
  max-height: 100vh;
  overflow-y: auto;
  padding-block: 80px;
  padding-inline: 64px;
  width: 100%;
}
</style>