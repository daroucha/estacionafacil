<script setup lang="ts">
definePageMeta({
  title: 'Veículos'
})

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
</script>

<template>
  <PageWrapper>
    <PageTitle title="Veículos">
      <UButton size="sm" variant="ghost" icon="i-heroicons-plus">Adicionar veículo</UButton>

      <UInput v-model="search" placeholder="Buscar veículo" size="sm" icon="i-heroicons-magnifying-glass" />
    </PageTitle>

    <CardGrid>
      <VehicleCard v-for="vehicle in vehicles" :key="vehicle.plate" :title="vehicle.name" :text="vehicle.plate"
        :owner="vehicle.owner" />
    </CardGrid>
  </PageWrapper>
</template>