<script setup lang="ts">
interface AuthResponse {
  authenticated: boolean

  user: {
    username: string
    name: string
    role: 'admin' | 'employee'
  } | null
}

const { data } = await useFetch<AuthResponse>(
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
                Admin Page
              </h1>

              <p class="text-gray-500">
                This page is only accessible by admin
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

        <div v-if="data?.user">
          <p>
            Welcome,
            <strong>{{ data.user.name }}</strong>
          </p>

          <p class="mt-2">
            Username:
            <strong>{{ data.user.username }}</strong>
          </p>

          <p class="mt-2">
            Role:
            <strong>{{ data.user.role }}</strong>
          </p>
        </div>

      </UCard>

    </div>
  </div>
</template>