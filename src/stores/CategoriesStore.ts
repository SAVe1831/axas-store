import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from './api'
import type { Categories } from '../types/CategoriesInterface'

export const useCategoriesStore = defineStore('category', () => {
  const categories = ref<Categories[]>([])

  const getCategories = async (): Promise<void> => {
    try {
      const response = await api.get<{ data: Categories[] }>('/1/categories/')
      categories.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  return { categories, getCategories }
  },
  {
    persist: true,
  }
)
