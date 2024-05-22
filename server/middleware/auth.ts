export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event).auth

  const { url } = event.node.req

  config.exclude.forEach((item: any) => {
    if (`/api/auth/${item}` === url) {
      throw createError({
        statusCode: 404,
        statusMessage: `Page not found: ${url}`
      })
    }
  })
})