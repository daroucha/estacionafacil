<template>
  <div id="AppLayout" class="estacionafacil">
    <slot />
  </div>
</template>

<style scoped>
.estacionafacil {
  display: grid;
  grid-template-columns: minmax(180px, 14vw) 1fr;
  height: 100%;
  width: 100%;
}
</style>