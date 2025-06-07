<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 capitalize">{{ categoria }}</h1>

    <div v-if="loading" class="text-center">Carregando...</div>
    <div v-else-if="error" class="text-center text-red-500">Erro ao carregar produtos.</div>
    <div v-else>
      <div v-if="produtos.length === 0" class="text-center">Nenhum produto encontrado.</div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <router-link
          v-for="produto in produtos" :key="produto.id" :to="`/produtos/${produto.id}`"
          class="bg-white shadow text-black rounded-lg overflow-hidden"
        >
          <img :src="produto.thumbnail" alt="" class="w-full h-48 object-contain" />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ produto.title }}</h2>
            <p class="text-gray-600 mb-1">Categoria: {{ produto.category }}</p>
            <p class="text-gray-800 font-bold mb-1">Preço: ${{ produto.price }}</p>
            <p class="text-gray-500">Em estoque: {{ produto.stock }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const categoria = ref(route.params.categoria)

const produtos = ref([])
const loading = ref(false)
const error = ref(false)

const carregarProdutosPorCategoria = async () => {
  loading.value = true
  error.value = false
  try {
    const res = await axios.get(`https://dummyjson.com/products/category/${categoria.value}`)
    produtos.value = res.data.products
  } catch (e) {
    error.value = true
    console.error('Erro ao carregar produtos:', e)
  } finally {
    loading.value = false
  }
}

onMounted(carregarProdutosPorCategoria)

watch(() => route.params.categoria, (novaCategoria) => {
  categoria.value = novaCategoria
  carregarProdutosPorCategoria()
})
</script>
