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

const user = computed(() => data.value?.user)

</script>