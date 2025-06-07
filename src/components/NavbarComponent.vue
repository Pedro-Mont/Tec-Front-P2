<template>
  <nav class="bg-gray-700 text-white py-10 px-8 flex justify-center items-center">
    <ul class="flex gap-6">
      <li><router-link to="/" class="ml-10 text-white">Início</router-link></li>
      <li class="relative">
        <button @click="toggleCategorias" class="ml-10 text-white flex items-center"
          :aria-expanded="categoriasAberto.toString()">
          Categorias
        </button>
        <ul v-if="categoriasAberto" class="absolute left-0 mt-2 bg-white text-black rounded shadow-md w-48 max-h-60 overflow-auto z-30">
          <li v-for="categoria in categorias" :key="categoria" class="px-4 py-2 hover:bg-gray-200 cursor-pointer capitalize" @click="selecionarCategoria(categoria)">
            {{ categoria.name }}
          </li>
          <li v-if="loading" class="px-4 py-2 text-gray-500">Carregando...</li>
          <li v-if="error" class="px-4 py-2 text-red-500">Erro ao carregar categorias</li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const categorias = ref([])
const categoriasAberto = ref(false)
const loading = ref(false)
const error = ref(false)


const router = useRouter()

const toggleCategorias = async () => {
  categoriasAberto.value = !categoriasAberto.value

  if (categoriasAberto.value && categorias.value.length === 0) {
    loading.value = true
    error.value = false
    try {
      const res = await axios.get('https://dummyjson.com/products/categories')
      categorias.value = res.data
    } catch (e) {
      error.value = true
      console.error('Erro ao carregar categorias:', e)
    } finally {
      loading.value = false
    }
  }
}

const selecionarCategoria = (categoria) => {
  categoriasAberto.value = false
  router.push(`/produtos/categoria/${categoria.name}`)
}
</script>