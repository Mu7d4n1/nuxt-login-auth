<script setup lang="ts">
interface AuthResponse {
  authenticated: boolean
  user: {
    username: string
    name: string
    role: 'admin' | 'employee'
  } | null
}

const { data, error } = await useFetch<AuthResponse>(
  '/api/auth/me'
)

const logout = async () => {
  await $fetch('/api/auth/logout', {
    method: 'POST'
  })

  await navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">

    <div class="max-w-4xl mx-auto">

      <UCard>

        <template #header>
          <div class="flex justify-between items-center">

            <div>
              <h1 class="text-2xl font-bold">
                Home
              </h1>

              <p class="text-gray-500">
                Welcome to the application
              </p>
            </div>

            <UButton
              color="error"
              variant="outline"
              @click="logout"
            >
              Logout
            </UButton>

          </div>
        </template>

        <div v-if="error">
          <p class="text-red-500">
            Failed to load user information.
          </p>
        </div>

        <div v-else-if="data?.user">

          <p>
            Welcome,
            <strong>
              {{ data.user.name }}
            </strong>
          </p>

          <p class="mt-2">
            Username:
            <strong>
              {{ data.user.username }}
            </strong>
          </p>

          <p class="mt-2">
            Role:
            <strong>
              {{ data.user.role }}
            </strong>
          </p>

          <div class="mt-6">

            <UButton
              v-if="data.user.role === 'admin'"
              to="/admin"
            >
              Admin Page
            </UButton>

          </div>

        </div>

      </UCard>

    </div>

  </div>
</template>