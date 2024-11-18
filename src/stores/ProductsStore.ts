import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type products, type filter } from '../types/ProductsInterface'
import api from './api'

export const useProductsStore = defineStore(
  'products',
  () => {
    const products = ref<products[]>([])
    const getProducts = async (filters?: filter): Promise<void> => {
      try {
        const params: Record<string, any> = {};
        if (filters) {
          if (filters.filter_id !== null) {
            params.filter_id = filters.filter_id;
          }
          if (filters.single_value !== null) {
            params.single_value = filters.single_value;
          }
          if (filters.range_value_from !== null) {
            params.range_value_from = filters.range_value_from;
          }
          if (filters.range_value_to !== null) {
            params.range_value_to = filters.range_value_to;
          }
          if (filters.flag_value !== null) {
            params.flag_value = filters.flag_value;
          }
        }
        const response = await api.post<{ data: products[] }>('/1/products/', { params })
        products.value = response.data.data
        console.log(products.value)
      } catch (error) {
        console.error(error)
      }
    }
    return { products, getProducts }
  },
  {
    persist: true,
  }
)
