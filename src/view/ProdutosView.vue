<template>
    <div class="p-4">
        <input v-model="query" type="text" placeholder="Buscar produto..." class="w-full mb-6 px-4 py-2 rounded" />

        <h1 class="text-3xl font-bold mb-6">Produtos</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <router-link v-for="produto in produtos" :key="produto.id" :to="`/produtos/${produto.id}`"
                class="bg-white shadow text-black rounded-lg overflow-hidden">
                <img :src="produto.thumbnail" alt="" class="w-full h-48 object-contain ">
                <div class="p-4">
                    <h2 class="text-xl font-semibold mb-2">{{ produto.title }}</h2>
                    <p class="text-gray-600 mb-1">Categoria: {{ produto.category }}</p>
                    <p class="text-gray-800 font-bold mb-1">Preço: ${{ produto.price }}</p>
                    <p class="text-gray-500">Em estoque: {{ produto.stock }}</p>
                </div>

            </router-link>
        </div>

        <div class="flex justify-center items-center gap-4 mt-8">
            <button @click="paginaAnterior" :disabled="paginaAtual === 1"
                class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                Anterior
            </button>

            <span class="text-lg font-medium">{{ paginaAtual }} / {{ totalPaginas }}</span>

            <button @click="proximaPagina" :disabled="paginaAtual === totalPaginas"
                class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                Próxima
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

const produtos = ref([])
const paginaAtual = ref(1)
const limite = 8
const totalProdutos = ref(0)
const totalPaginas = ref(1)
const query = ref('')
const loading = ref(false)
const error = ref(false)

const carregarProdutos = async () => {
    try {
        const skip = (paginaAtual.value - 1) * limite
        const response = await axios.get('https://dummyjson.com/products', {
            params: { limit: limite, skip: skip }
        })
        produtos.value = response.data.products
        totalProdutos.value = response.data.total
        totalPaginas.value = Math.ceil(totalProdutos.value / limite)
    } catch (error) {
        console.error('Erro ao carregar produtos:', error)
    }
}

const buscarProdutos = async () => {
    if (!query.value) {
        await carregarProdutos()
        return
    }

    loading.value = true
    error.value = false
    try {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${query.value}`)
        produtos.value = response.data.products
    } catch (e) {
        error.value = true
        console.error('Erro ao buscar produtos:', e)
    } finally {
        loading.value = false
    }
}

const proximaPagina = () => {
    if (paginaAtual.value < totalPaginas.value) {
        paginaAtual.value++
    }
}

const paginaAnterior = () => {
    if (paginaAtual.value > 1) {
        paginaAtual.value--
    }
}

onMounted(carregarProdutos)

watch(paginaAtual, () => {
    if (!query.value) carregarProdutos()
})

let debounceTimeout = null
watch(query, (novoValor) => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
        buscarProdutos()
    }, 400)
})
</script>