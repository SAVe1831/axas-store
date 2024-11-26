import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/special-offers-more',
    name: 'special-offers-more',
    component: () => import('../views/SpecialOffersMore.vue')
  },
  {
    path: '/filter',
    name: 'filter',
    component: () => import('../views/Filter.vue')
  },
  {
    path: '/catalog-category',
    name: 'catalog-category',
    component: () => import('../views/CatalogCategory.vue')
  },
  {
    path: '/catalog-category/:id',
    name: 'catalog-subcategory',
    component: () => import('../views/CatalogSubCategory.vue'),
    props: true
  },
  {
    path: '/catalog-subcategory-details/:subCategoryId',
    name: 'catalog-subcategory-details',
    component: () => import('../views/CatalogSubCategoryDetails.vue'),
    props: true
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/rules',
    name: 'rules',
    component: () => import('./../views/Rules.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
