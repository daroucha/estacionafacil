<script setup lang="ts">
import type { Owners } from '~/types'

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
</script>

<template>
  <PageWrapper>
    <UBreadcrumb :links="links" />

    <PageTitle :title="`Veículos de ${owner?.name}`"></PageTitle>
  </PageWrapper>
</template>