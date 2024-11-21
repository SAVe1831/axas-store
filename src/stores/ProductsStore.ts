import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type productsType, type filter, type meta } from '../types/ProductsInterface'
import api from './api'
import { useSortStore } from './SortStore'



export const useProductsStore = defineStore(
  'products',
  () => {
    const productsSpecial = ref<productsType[]>([])

    const productsWillLike = ref<productsType[]>([])

    const productsSorted = ref<productsType[]>([])

    const currentPage = ref(1)
    const totalPages = ref(0)
    const hasPrev = ref(false)
    const hasNext = ref(false)

    const sortStore = useSortStore()

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
        const responseSpecial = await api.post<{ data: productsType[] }>('/1/products/?is_special=true', { params })
        productsSpecial.value = responseSpecial.data.data

        const responseWillLike = await api.post<{ data: productsType[] }>('/1/products/?only_promotional=true', { params })
        productsWillLike.value = responseWillLike.data.data
      } catch (error) {
        console.error(error)
      }
    }
    const getProductsSorted = async (filters?: filter): Promise<void> => {
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
      const responseSorted = await api.post<{ data: productsType[] }>(`/1/products/?page=${currentPage.value}&ordered=true&order=${sortStore.selectedSort}`, { params })
      productsSorted.value = responseSorted.data.data
      totalPages.value = responseSorted.data.meta.paginator.total
      hasPrev.value = responseSorted.data.meta.paginator.hasPrev
      hasNext.value = responseSorted.data.meta.paginator.hasNext
      currentPage.value = responseSorted.data.meta.paginator.page

      } catch (error) {
        console.error(error)
      }
    }
    return { productsSpecial, productsWillLike, productsSorted, hasPrev, hasNext, currentPage, totalPages, getProducts, getProductsSorted }
  },
  // {
  //   persist: true,
  // }
)
