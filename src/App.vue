<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth.store'

const authStore = useAuthStore()

onMounted(() => {
  authStore.loadUserFromLocalStorage()
})
</script>



