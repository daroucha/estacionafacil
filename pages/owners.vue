<script setup lang="ts">
definePageMeta({
  title: 'Proprietários'
})

const modal = ref(false)

const search = ref('')

const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'name',
  label: 'Name',
  sortable: true
}, {
  key: 'title',
  label: 'Title',
  sortable: true
}, {
  key: 'email',
  label: 'Email',
  sortable: true,
  direction: 'desc' as const
}, {
  key: 'role',
  label: 'Role'
}, {
  key: 'actions'
}]

interface Owners {
  id: number
  name: string
  title: string
  email: string
  role: string
}

const owners: Owners[] = [{
  id: 1,
  name: 'Lindsay Walton',
  title: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin'
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member'
}, {
  id: 4,
  name: 'Whitney Francis',
  title: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin'
}, {
  id: 5,
  name: 'Leonard Krasner',
  title: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner'
}, {
  id: 6,
  name: 'Floyd Miles',
  title: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member'
}]

const items = (row: Owners) => [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }]
]
</script>

<template>
  <PageWrapper>
    <PageTitle title="Proprietários">
      <UButton size="sm" variant="ghost" icon="i-heroicons-plus" @click="modal = true">Cadastrar proprietário</UButton>

      <UInput v-model="search" placeholder="Buscar proprietário" size="sm" icon="i-heroicons-magnifying-glass" />
    </PageTitle>

    <UModal v-model="modal">
      <AddOwnerForm :on-cancel="() => modal = false" />
    </UModal>

    <UTable :columns="columns" :rows="owners">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </PageWrapper>
</template>