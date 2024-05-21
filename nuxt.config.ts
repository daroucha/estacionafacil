// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  modules: [
    "@nuxt/ui",
    "nuxt-mongoose"
  ],
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'models',
    devtools: true,
  },
  runtimeConfig: {
    auth: {
      exclude: [
        '/api/auth/register',
        '/api/auth/login',
      ]
    }
  }
})