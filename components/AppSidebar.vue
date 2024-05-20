<script setup lang="ts">
import { computed } from 'vue';

const links = [
  {
    label: 'Veículos',
    icon: 'i-heroicons-truck',
    to: '/vehicles'
  },
  {
    label: 'Proprietários',
    icon: 'i-heroicons-user-circle',
    to: '/owners'
  }
]

const computedYear = computed(() => {
  const now = new Date()
  return now.getFullYear()
})
</script>

<template>
  <div id="AppSidebar" class="sidebar bg-gray-50 dark:bg-gray-900">
    <div class="header text-gray-700 dark:text-white">
      <Logo />
    </div>

    <UVerticalNavigation :links="links" />

    <div class="footer border-t border-gray-200 dark:border-gray-600">
      <span class="text-xs leading-3 text-gray-400">{{ computedYear }}, estacionafacil. Desenvolvido por Daniel
        Aroucha.
        <ULink to="https://github.com/daroucha/estacionafacil" target="_blank" active-class="text-primary"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">GitHub ▶︎
        </ULink>
      </span>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  min-height: 100vh;
  min-width: 180px;
  padding-block: 32px;
  padding-inline: 16px;
  width: 14vw;
}

.sidebar>.header {
  display: block;
  width: 100%;
}

.sidebar>.header>svg {
  -webkit-user-drag: none;
  display: block;
  height: 14px;
  width: auto;
}

.sidebar>.footer {
  box-sizing: border-box;
  padding-top: 24px;
  width: 100%;
  display: block;
}
</style>