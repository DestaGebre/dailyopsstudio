export default defineNuxtRouteMiddleware(async (to) => {
  const { user, initialize } = useAuth()
  await initialize()
  if (!user.value) return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
})
