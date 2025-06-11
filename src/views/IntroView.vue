<template>
  <div class="intro">
    <h1>Joseph Lee Bain</h1>
    <p>Started on: June 9, 2025</p>
    <button @click="goToApp">Go to App</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goToApp = () => {
  router.push('/todo')
}
</script>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

button {
  padding: 15px 30px;
  font-size: 16px;
  background-color: #006ad4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
