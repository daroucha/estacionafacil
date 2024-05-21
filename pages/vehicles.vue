<script setup lang="ts">
definePageMeta({
  title: 'Veículos'
})

const modal = ref(false)

const search = ref('')

interface Vehicles {
  brand: string
  model: string
  name: string
  plate: string
  owner: string
}

const vehicles: Vehicles[] = [
  {
    brand: 'Honda',
    model: 'City',
    name: 'Honda City',
    plate: 'RTJ4H67',
    owner: 'John Doe'
  },
  {
    brand: 'Volkswagen',
    model: 'Gol',
    name: 'VW Gol',
    plate: 'LCQ6749',
    owner: 'John Doe'
  },
  {
    brand: 'Ford',
    model: 'Fiesta',
    name: 'Ford Fiesta',
    plate: 'KTL9587',
    owner: 'John Doe'
  },
  {
    brand: 'Nissan',
    model: 'Sentra',
    name: 'Nissan Sentra',
    plate: 'TTL8462',
    owner: 'John Doe'
  },
  {
    brand: 'Hyundai',
    model: 'HB20',
    name: 'Hyundai HB20',
    plate: 'RKL4O97',
    owner: 'John Doe'
  }
]

const items = (row: Vehicles) => [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.plate)
  }], [{
    label: 'Excluir',
    icon: 'i-heroicons-trash-20-solid'
  }]
]
</script>

<template>
  <PageWrapper>
    <PageTitle title="Veículos">
      <UButton size="sm" variant="ghost" icon="i-heroicons-plus" @click="modal = true">Adicionar veículo</UButton>

      <UInput v-model="search" placeholder="Buscar veículo" size="sm" icon="i-heroicons-magnifying-glass" />
    </PageTitle>

    <UModal v-model="modal">
      <AddVehicleForm :on-cancel="() => modal = false" />
    </UModal>

    <CardGrid>
      <VehicleCard v-for="vehicle in vehicles" :key="vehicle.plate" :title="vehicle.name" :text="vehicle.plate"
        :owner="vehicle.owner">
        <UDropdown :items="items(vehicle)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </VehicleCard>
    </CardGrid>
  </PageWrapper>
</template>