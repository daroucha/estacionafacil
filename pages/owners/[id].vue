<script setup lang="ts">
import type { Owners, Vehicles } from '~/types'

const route = useRoute()

const { data: responseOwner, pending } = await useFetch<Owners>(`/api/owners/${route.params.id}`, {
  method: 'GET'
})

const owner = ref(responseOwner)

const links = computed(() => [
  {
    label: 'Proprietários',
    to: '/owners'
  },
  {
    label: owner.value?.name,
  }
])

const modal = ref(false)

const search = ref('')

const resetVehicle = {
  brand: '',
  model: '',
  plate: '',
  owner: owner.value
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
    icon: 'i-heroicons-trash-20-solid',
    click: () => onDelete(row)
  }]
]

const vehicles = ref(owner.value?.vehicles)

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

const onDelete = async (data: Vehicles) => {
  try {
    await $fetch(`/api/vehicles/${data._id}`, {
      method: 'DELETE'
    })

    const index = vehicles.value!.findIndex(vehicle => vehicle._id === data._id)
    vehicles.value = vehicles.value!.filter(vehicle => vehicle !== vehicles.value![index])
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <PageWrapper>
    <UBreadcrumb :links="links" />

    <PageTitle :title="`Veículos de ${owner?.name}`">
      <UButton size="sm" variant="ghost" icon="i-heroicons-plus" @click="modal = true">Adicionar veículo</UButton>

      <UInput v-model="search" placeholder="Buscar veículo" size="sm" icon="i-heroicons-magnifying-glass" />
    </PageTitle>

    <UModal v-model="modal">
      <AddVehicleForm @cancel="onCancel" @created="onCreated" @updated="onUpdated" :value="edit" />
    </UModal>

    <CardGrid>
      <VehicleCard v-for="vehicle in computedVehicles" :key="vehicle.plate" :title="vehicle.name" :text="vehicle.plate"
        :owner="owner!.name" :owner-id="owner!._id">
        <UDropdown :items="items(vehicle)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </VehicleCard>
    </CardGrid>
  </PageWrapper>
</template>