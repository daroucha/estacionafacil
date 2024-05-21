<script setup lang="ts">
import type { Owners } from '~/types';

definePageMeta({
  title: 'Proprietários',
  middleware: 'auth'
})

const modal = ref(false)

const search = ref('')

const columns = [{
  key: 'name',
  label: 'Nome',
  sortable: true
}, {
  key: 'cpf',
  label: 'CPF',
  sortable: true
}, {
  key: 'email',
  label: 'E-mail',
  sortable: true,
  direction: 'desc' as const
}, {
  key: 'phone',
  label: 'Celular'
}, {
  key: 'actions'
}]

const items = (row: Owners) => [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row._id)
  }]
]

const { data: owners, pending } = await useFetch('/api/owners')
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

    <UTable :loading="pending" :columns="columns" :rows="owners">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </PageWrapper>
</template>