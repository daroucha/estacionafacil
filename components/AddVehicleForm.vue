<script setup lang="ts">
import type { Owners, Vehicles } from '~/types';

interface PropsVehicleForm {
  value?: Vehicles
}

const props = defineProps<PropsVehicleForm>()

const emit = defineEmits(['cancel', 'created', 'updated'])

const onCancel = () => emit('cancel')

const search = async (name: string) => {
  loading.value = true

  const owners = await $fetch<Owners[]>('/api/owners', {
    params: { name }
  })

  loading.value = false

  return owners
}

const selected = ref(props.value?.owner)

const vehicle = ref({
  brand: props.value?.brand,
  model: props.value?.model,
  name: props.value?.name,
  plate: props.value?.plate,
  owner: selected.value
})

const alert = ref({
  status: false,
  message: ''
})

const loading = ref(false)

const createVehicle = async () => {
  loading.value = true

  const url = props.value?._id ? `/api/vehicles/${props.value._id}` : '/api/vehicles'

  const method = props.value?._id ? 'PUT' : 'POST'

  const body = {
    brand: vehicle.value.brand,
    model: vehicle.value.model,
    name: vehicle.value.name,
    plate: vehicle.value.plate,
    owner: vehicle.value.owner?._id
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
    <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Veículo</h4>

    <UAlert v-if="alert.status" :title="alert.message" variant="solid" color="red"
      icon="i-heroicons-exclamation-triangle" />

    <div class="flex flex-col gap-4">
      <UFormGroup label="Marca do veículo" description="VW, Honda, Chevrolet, etc" required>
        <UInput placeholder="Marca" v-model="vehicle.brand" />
      </UFormGroup>

      <UFormGroup label="Modelo do veículo" description="Gol, HB20, Onix, etc" required>
        <UInput placeholder="Modelo" v-model="vehicle.model" />
      </UFormGroup>

      <UFormGroup label="Placa do veículo" required>
        <UInput placeholder="Placa" icon="i-heroicons-hashtag" v-model="vehicle.plate" />
      </UFormGroup>

      <UFormGroup label="Proprietário" required>
        <UInputMenu v-model="vehicle.owner" :search="search" option-attribute="name" by="_id"
          placeholder="Escolha um proprietário">
          <template #leading>
            <UAvatar :alt="vehicle.owner?.name" size="2xs" />
          </template>
        </UInputMenu>
      </UFormGroup>
    </div>

    <div
      class="w-full flex flex-row justify-end items-center gap-4 pt-4 pb-2 border-t border-gray-200 dark:border-gray-800">
      <UButton color="primary" variant="ghost" @click="onCancel">Cancelar</UButton>

      <UButton color="primary" variant="solid" icon="i-heroicons-check" @click="createVehicle" :loading="loading">Salvar
      </UButton>
    </div>
  </div>
</template>