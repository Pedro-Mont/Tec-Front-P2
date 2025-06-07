<script setup>
import Navbar from './components/NavbarComponent.vue'
import FooterComponent from './components/FooterComponent.vue';
import { RouterView } from 'vue-router'

</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar/>
    <div class="flex-grow container mx-auto p-4">
      <RouterView />
    </div>
    <FooterComponent />
  </div>

</template>
