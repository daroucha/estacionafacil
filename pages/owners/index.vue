<script setup lang="ts">
import type { Owners } from '~/types';

definePageMeta({
  title: 'Proprietários',
  middleware: 'auth'
})

const modal = ref(false)

const search = ref('')

const columns = [
  {
    key: 'name',
    label: 'Nome',
    sortable: true
  },
  {
    key: 'cpf',
    label: 'CPF',
    sortable: true
  },
  {
    key: 'email',
    label: 'E-mail',
    sortable: true,
    direction: 'desc' as const
  },
  {
    key: 'phone',
    label: 'Celular'
  },
  {
    key: 'vehicles'
  },
  {
    key: 'actions'
  },
]

const resetOwner = {
  name: '',
  cpf: '',
  email: '',
  phone: ''
}

const edit = ref<Owners>(resetOwner)

const items = (row: Owners) => [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      edit.value = row
      modal.value = true
    }
  }]
]

const { data: responseOwners, pending } = await useFetch<Owners[]>('/api/owners')

const owners = ref(responseOwners)

const onCancel = () => {
  modal.value = false
  edit.value = resetOwner
}

const onCreated = (data: Owners) => {
  owners.value!.push(data)
  modal.value = false
  edit.value = resetOwner
}

const onUpdated = (data: Owners) => {
  const index = owners.value!.findIndex(owner => owner._id === data._id)
  owners.value![index] = data
  modal.value = false
  edit.value = resetOwner
}

const computedOwners = computed(() => {
  return owners.value!.filter(owner => owner.name.toLowerCase().includes(search.value.toLowerCase()))
})
</script>

<template>
  <PageWrapper>
    <PageTitle title="Proprietários">
      <UButton size="sm" variant="ghost" icon="i-heroicons-plus" @click="modal = true">Cadastrar proprietário</UButton>

      <UInput v-model="search" placeholder="Buscar proprietário" size="sm" icon="i-heroicons-magnifying-glass" />
    </PageTitle>

    <UModal v-model="modal">
      <AddOwnerForm @cancel="onCancel" @created="onCreated" @updated="onUpdated" :value="edit" />
    </UModal>

    <UTable :loading="pending" :columns="columns" :rows="computedOwners">
      <template #vehicles-data="{ row }">
        <ULink :to="`/owners/${row._id}`"
          inactive-class="text-primary dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Veículos
        </ULink>
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </PageWrapper>
</template>