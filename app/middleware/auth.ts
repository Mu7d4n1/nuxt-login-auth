interface AuthResponse {
  authenticated: boolean

  user: {
    username: string
    name: string
    role: 'admin' | 'employee'
  } | null
}

export default defineNuxtRouteMiddleware(async (to) => {
  if (
    to.path !== '/home' &&
    to.path !== '/admin'
  ) {
    return
  }

  const { data } = await useFetch<AuthResponse>(
    '/api/auth/me'
  )

  if (!data.value?.authenticated) {
    return navigateTo('/login')
  }
})