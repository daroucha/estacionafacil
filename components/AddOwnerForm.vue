<script setup lang="ts">
interface PropsOwnerForm {
  onCancel: () => void
}

defineProps<PropsOwnerForm>()
</script>

<template>
  <div class="p-4 flex flex-col gap-4">
    <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Cadastrar proprietário</h4>

    <div class="flex flex-col gap-4">
      <UFormGroup label="Nome" required>
        <UInput placeholder="Nome" />
      </UFormGroup>

      <UFormGroup label="CPF" description="Apenas os números" required>
        <UInput placeholder="CPF" />
      </UFormGroup>

      <UFormGroup label="E-mail" required>
        <UInput placeholder="exemplo@host.com" icon="i-heroicons-envelope" />
      </UFormGroup>

      <UFormGroup label="Celular" required>
        <UInput placeholder="Celular" icon="i-heroicons-phone" />
      </UFormGroup>
    </div>

    <div
      class="w-full flex flex-row justify-end items-center gap-4 pt-4 pb-2 border-t border-gray-200 dark:border-gray-800">
      <UButton color="primary" variant="ghost" @click="onCancel">Cancelar</UButton>

      <UButton color="primary" variant="solid" icon="i-heroicons-plus">Cadastrar proprietário</UButton>
    </div>
  </div>
</template>