<script setup lang="ts">
import type { Owners } from '~/types';

interface PropsOwnerForm {
  value?: Owners
}

const props = defineProps<PropsOwnerForm>()

const emit = defineEmits(['created', 'cancel', 'updated'])

const onCancel = () => emit('cancel')

const owner = ref({
  name: props.value?.name,
  cpf: props.value?.cpf,
  email: props.value?.email,
  phone: props.value?.phone
})

const alert = ref({
  status: false,
  message: ''
})

const loading = ref(false)

const createOwner = async () => {
  loading.value = true

  const url = props.value?._id ? `/api/owners/${props.value._id}` : '/api/owners'

  const method = props.value?._id ? 'PUT' : 'POST'

  const body = {
    name: owner.value.name,
    cpf: owner.value.cpf,
    email: owner.value.email,
    phone: owner.value.phone,
  }

  try {
    const data = await $fetch(url, {
      method,
      body,
    })

    const event = method === 'PUT' ? 'updated' : 'created'

    emit(event, data)
  } catch (error: any) {
    alert.value.status = true
    alert.value.message = error.statusMessage
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-4 flex flex-col gap-4">
    <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Proprietário</h4>

    <UAlert v-if="alert.status" :title="alert.message" variant="solid" color="red"
      icon="i-heroicons-exclamation-triangle" />

    <div class="flex flex-col gap-4">
      <UFormGroup label="Nome" required>
        <UInput placeholder="Nome" v-model="owner.name" />
      </UFormGroup>

      <UFormGroup label="CPF" description="Apenas os números" required>
        <UInput placeholder="CPF" v-model="owner.cpf" />
      </UFormGroup>

      <UFormGroup label="E-mail" required>
        <UInput placeholder="exemplo@host.com" icon="i-heroicons-envelope" v-model="owner.email" />
      </UFormGroup>

      <UFormGroup label="Celular" required>
        <UInput placeholder="Celular" icon="i-heroicons-phone" v-model="owner.phone" />
      </UFormGroup>
    </div>

    <div
      class="w-full flex flex-row justify-end items-center gap-4 pt-4 pb-2 border-t border-gray-200 dark:border-gray-800">
      <UButton color="primary" variant="ghost" @click="onCancel">Cancelar</UButton>

      <UButton color="primary" variant="solid" icon="i-heroicons-check" @click="createOwner" :loading="loading">Salvar
      </UButton>
    </div>
  </div>
</template>