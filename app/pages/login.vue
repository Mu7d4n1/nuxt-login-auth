<script setup lang="ts">
import { object, string, ValidationError } from 'yup'

const username = ref('')
const password = ref('')

const errors = ref<{
  username?: string
  password?: string
}>({})

const loginError = ref('')

const isLoading = ref(false)

const schema = object({
  username: string()
    .required('Username is required')
    .min(4, 'Invalid username'),

  password: string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters')
})

const handleLogin = async () => {
  errors.value = {}
  loginError.value = ''

  try {
    // =========================
    // CLIENT VALIDATION - YUP
    // =========================

    await schema.validate(
      {
        username: username.value,
        password: password.value
      },
      {
        abortEarly: false
      }
    )

    // =========================
    // CALL SERVER API
    // =========================

    isLoading.value = true

    await $fetch('/api/auth/login', {
      method: 'POST',

      body: {
        username: username.value,
        password: password.value
      }
    })

    // =========================
    // LOGIN SUCCESS
    // =========================

    await navigateTo('/home')

  } catch (error) {

    // =========================
    // YUP ERROR
    // =========================

    if (error instanceof ValidationError) {
      for (const validationError of error.inner) {
        if (validationError.path) {
          errors.value[
            validationError.path as 'username' | 'password'
          ] = validationError.message
        }
      }

      return
    }

    // =========================
    // SERVER LOGIN ERROR
    // =========================

    const fetchError = error as {
      statusCode?: number
      statusMessage?: string
    }

    if (fetchError.statusCode === 401) {
      loginError.value =
        'Invalid username or password'

      return
    }

    loginError.value =
      'An error occurred. Please try again.'

  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">

    <UCard class="w-full max-w-md">

      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold">
            Login
          </h1>

          <p class="text-gray-500 mt-1">
            Sign in to your account
          </p>
        </div>
      </template>

      <div class="space-y-4">

        <!-- Username -->

        <UFormField
          label="Username"
          :error="errors.username"
        >
          <UInput
            v-model="username"
            placeholder="Enter username"
            class="w-full"
          />
        </UFormField>


        <!-- Password -->

        <UFormField
          label="Password"
          :error="errors.password"
        >
          <UInput
            v-model="password"
            type="password"
            placeholder="Enter password"
            class="w-full"
          />
        </UFormField>


        <!-- Server Error -->

        <p
          v-if="loginError"
          class="text-sm text-red-500"
        >
          {{ loginError }}
        </p>


        <!-- Login Button -->

        <UButton
          block
          :loading="isLoading"
          :disabled="isLoading"
          @click="handleLogin"
        >
          Login
        </UButton>

      </div>

    </UCard>

  </div>
</template>