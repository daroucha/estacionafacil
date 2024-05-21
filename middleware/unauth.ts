export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useAuth()

  watch(loggedIn, () => {
    if (loggedIn.value) {
      return navigateTo('/owners')
    }
  })

  if (loggedIn.value) {
    return navigateTo('/owners')
  }
})