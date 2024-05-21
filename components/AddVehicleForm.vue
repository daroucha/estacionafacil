<script setup lang="ts">
import type { Avatar } from '#ui/types'

interface PropsVehicleForm {
  onCancel: () => void
}

defineProps<PropsVehicleForm>()

const owners = [
  {
    id: 'nobody',
    label: 'Escolha um proprietário',
    icon: 'i-heroicons-user-circle'
  },
  {
    id: 'benjamincanac',
    label: 'benjamincanac',
    href: 'https://github.com/benjamincanac',
    target: '_blank',
    avatar: { src: 'https://avatars.githubusercontent.com/u/739984?v=4' }
  },
  {
    id: 'Atinux',
    label: 'Atinux',
    href: 'https://github.com/Atinux',
    target: '_blank',
    avatar: { src: 'https://avatars.githubusercontent.com/u/904724?v=4' }
  },
  {
    id: 'smarroufin',
    label: 'smarroufin',
    href: 'https://github.com/smarroufin',
    target: '_blank',
    avatar: { src: 'https://avatars.githubusercontent.com/u/7547335?v=4' }
  }
]

const selected = ref(owners[0])
</script>

<template>
  <div class="p-4 flex flex-col gap-4">
    <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Adicionar veículo</h4>

    <div class="flex flex-col gap-4">
      <UFormGroup label="Marca do veículo" description="VW, Honda, Chevrolet, etc" required>
        <UInput placeholder="Marca" />
      </UFormGroup>

      <UFormGroup label="Modelo do veículo" description="Gol, HB20, Onix, etc" required>
        <UInput placeholder="Modelo" />
      </UFormGroup>

      <UFormGroup label="Placa do veículo" required>
        <UInput placeholder="Placa" icon="i-heroicons-hashtag" />
      </UFormGroup>

      <UFormGroup label="Proprietário" required>
        <UInputMenu v-model="selected" :options="owners">
          <template #leading>
            <UIcon v-if="selected.icon" :name="(selected.icon as string)" class="w-5 h-5" />
            <UAvatar v-else-if="selected.avatar" v-bind="(selected.avatar as Avatar)" size="2xs" />
          </template>
        </UInputMenu>
      </UFormGroup>
    </div>

    <div
      class="w-full flex flex-row justify-end items-center gap-4 pt-4 pb-2 border-t border-gray-200 dark:border-gray-800">
      <UButton color="primary" variant="ghost" @click="onCancel">Cancelar</UButton>

      <UButton color="primary" variant="solid" icon="i-heroicons-plus">Adicionar veículo</UButton>
    </div>
  </div>
</template>