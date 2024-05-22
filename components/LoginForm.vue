<script setup lang="ts">
const { me } = useAuth()

const loading = ref(false)

const isOpen = ref(false)
const alert = ref('')

const username = ref('')
const password = ref('')

const login = async () => {
  loading.value = true

  try {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    if (data.success) {
      me()
      await navigateTo('/owners')
    }
  } catch (error: any) {
    isOpen.value = true
    alert.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center w-full h-screen">
    <div class="flex items-center">
      <div class="pr-24">
        <Logo />
      </div>

      <div class="pl-24 border-l border-gray-100 dark:border-gray-800">
        <div class="flex flex-col gap-8">
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">Faça login em sua conta</h3>

          <UAlert v-if="isOpen" :title="alert" />

          <div class="flex flex-col gap-4 w-full">
            <UFormGroup label="Usuário">
              <UInput placeholder="Usuário" icon="i-heroicons-user-circle" v-model="username" />
            </UFormGroup>

            <UFormGroup label="Senha">
              <UInput placeholder="Senha" type="password" icon="i-heroicons-lock-closed" v-model="password" />
            </UFormGroup>
          </div>

          <UButton color="primary" variant="solid" size="md" class="text-center" @click="login" :loading="loading">
            Entrar</UButton>
        </div>
      </div>
    </div>
  </div>
</template>