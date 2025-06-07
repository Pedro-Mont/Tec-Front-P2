import { createRouter, createWebHistory } from 'vue-router'
import ProdutosView from '../view/ProdutosView.vue'
import ProdutoInfoView from '../view/ProdutoInfoView.vue'
import ProdutosPorCategoria from '../view/ProdutosPorCategoria.vue'


const routes = [
  {
    path: '/',
    redirect: '/produtos'
  },
  {
    path: '/produtos',
    name: 'Produtos',
    component: ProdutosView
  },
  {
    path: '/produtos/:id',
    name: 'ProdutoInfo',
    component: ProdutoInfoView
  },
  {
    path: '/produtos/categoria/:categoria',
    name: 'ProdutosPorCategoria',
    component: ProdutosPorCategoria
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router