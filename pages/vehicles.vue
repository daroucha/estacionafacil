<script setup lang="ts">
import type { Vehicles } from '~/types'

definePageMeta({
  title: 'Veículos',
  middleware: 'auth'
})

const modal = ref(false)

const search = ref('')

const resetVehicle = {
  brand: '',
  model: '',
  plate: ''
}

const edit = ref<Vehicles>(resetVehicle)

const items = (row: Vehicles) => [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      edit.value = row
      modal.value = true
    }
  }], [{
    label: 'Excluir',
    icon: 'i-heroicons-trash-20-solid'
  }]
]

const { data: responseVehicles, pending } = await useFetch<Vehicles[]>('/api/vehicles')

const vehicles = ref(responseVehicles)

const onCancel = () => {
  modal.value = false
  edit.value = resetVehicle
}

const onCreated = (data: Vehicles) => {
  vehicles.value!.push(data)
  modal.value = false
  edit.value = resetVehicle
}

const onUpdated = (data: Vehicles) => {
  const index = vehicles.value!.findIndex(vehicle => vehicle._id === data._id)
  vehicles.value![index] = data
  modal.value = false
  edit.value = resetVehicle
}

const computedVehicles = computed(() => {
  const rawVehicles = vehicles.value!.map(vehicle => {
    return { ...vehicle, name: `${vehicle.brand} ${vehicle.model}` }
  })
  return rawVehicles.filter(vehicle => vehicle.name.toLowerCase().includes(search.value.toLowerCase()))
})
</script>

<template>
  <PageWrapper>
    <PageTitle title="Veículos">
      <UButton size="sm" variant="ghost" icon="i-heroicons-plus" @click="modal = true">Adicionar veículo</UButton>

      <UInput v-model="search" placeholder="Buscar veículo" size="sm" icon="i-heroicons-magnifying-glass" />
    </PageTitle>

    <UModal v-model="modal">
      <AddVehicleForm @cancel="onCancel" @created="onCreated" @updated="onUpdated" :value="edit" />
    </UModal>

    <CardGrid>
      <VehicleCard v-for="vehicle in computedVehicles" :key="vehicle.plate" :title="vehicle.name" :text="vehicle.plate"
        :owner="vehicle.owner!.name" :owner-id="vehicle.owner!._id">
        <UDropdown :items="items(vehicle)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </VehicleCard>
    </CardGrid>
  </PageWrapper>
</template>