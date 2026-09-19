<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const goHome = async () => {
  await clearError({
    redirect: '/home'
  })
}

const goLogin = async () => {
  await clearError({
    redirect: '/login'
  })
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 p-4"
  >
    <UCard class="w-full max-w-md text-center">

      <div class="py-8">

        <p
          class="text-6xl font-bold text-red-500"
        >
          {{ error.statusCode || 500 }}
        </p>

        <h1 class="text-2xl font-bold mt-4">
          {{
            error.statusCode === 403
              ? 'Access Forbidden'
              : error.statusCode === 401
                ? 'Unauthorized'
                : 'Something went wrong'
          }}
        </h1>

        <p class="text-gray-500 mt-2">
          {{
            error.statusCode === 403
              ? 'You do not have permission to access this page.'
              : error.statusCode === 401
                ? 'You need to login to access this page.'
                : error.statusMessage ||
                  error.message ||
                  'An unexpected error occurred.'
          }}
        </p>

        <div class="flex justify-center gap-3 mt-6">

          <UButton
            v-if="error.statusCode === 403"
            @click="goHome"
          >
            Back to Home
          </UButton>

          <UButton
            v-else-if="error.statusCode === 401"
            @click="goLogin"
          >
            Login
          </UButton>

          <UButton
            v-else
            @click="goHome"
          >
            Back to Home
          </UButton>

        </div>

      </div>

    </UCard>
  </div>
</template>