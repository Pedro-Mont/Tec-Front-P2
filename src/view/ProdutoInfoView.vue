<template>
  <div class="container mx-auto p-4 flex justify-center items-center">
    <div v-if="produto" class="bg-white shadow rounded-lg p-6 w-1/3">
      <img :src="produto.thumbnail" alt="" class="w-full h-64 object-contain mb-4">
      <h1 class="text-3xl font-bold mb-2">{{ produto.title }}</h1>
      <p class="text-gray-600 mb-2">Categoria: {{ produto.category }}</p>
      <p class="text-gray-800 font-semibold mb-2">Preço: ${{ produto.price }}</p>
      <p class="text-gray-500 mb-4">Em estoque: {{ produto.stock }}</p>
      <p class="text-gray-700">{{ produto.description }}</p>
    </div>

    <div v-else class="text-center text-gray-500">Caregando...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const produto = ref(null)

const carregarProduto = async () => {
  try {
    const { id } = route.params
    const response = await axios.get(`https://dummyjson.com/products/${id}`)
    produto.value = response.data
  } catch (error) {
    console.error('Erro ao carregar produto:', error)
  }
}

onMounted(carregarProduto)
</script>