export default defineEventHandler((event) => {
  console.log(`⚙︎ estacionafacilAPI [${event.method}] ${getRequestURL(event)}`)
})