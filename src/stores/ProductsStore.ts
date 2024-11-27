import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type productsType, type filter } from '../types/ProductsInterface'
import api from './api'
import { useSortStore } from './SortStore'
import { useProductsFilterStore } from './ProductsFilterStore'



export const useProductsStore = defineStore(
  'products',
  () => {
    const sortStore = useSortStore()
    const productsFilterStore = useProductsFilterStore()

    const productsSpecial = ref<productsType[]>([])

    const productsWillLike = ref<productsType[]>([])

    const productsSorted = ref<productsType[]>([])

    const currentPage = ref(1)
    const totalPages = ref(0)
    const hasPrev = ref(false)
    const hasNext = ref(false)

    const searchQuery = ref<string>('');

    const updateSearchQuery = async (query: string) => {
      searchQuery.value = query;
    };

    const getProducts = async (): Promise<void> => {
      try {
        const responseSpecial = await api.post<{ data: productsType[] }>('/1/products/?is_special=true')
        productsSpecial.value = responseSpecial.data.data
        const responseWillLike = await api.post<{ data: productsType[] }>(`/1/products/?only_promotional=true&name=${searchQuery.value}&price_from=${productsFilterStore.range_value_from}&price_to=${productsFilterStore.range_value_to}`);
        productsWillLike.value = responseWillLike.data.data
      } catch (error) {
        console.error(error)
      }
    }
    const getProductsSorted = async (): Promise<void> => {
      try {
        const responseSorted = await api.post<{ data: productsType[] }>(`/1/products/?page=${currentPage.value}&ordered=true&order=${sortStore.selectedSort}&name=${searchQuery.value}&price_from=${productsFilterStore.range_value_from}&price_to=${productsFilterStore.range_value_to}`)
        productsSorted.value = responseSorted.data.data
        totalPages.value = responseSorted.data.meta.paginator.total
        hasPrev.value = responseSorted.data.meta.paginator.hasPrev
        hasNext.value = responseSorted.data.meta.paginator.hasNext
        currentPage.value = responseSorted.data.meta.paginator.page
      } catch (error) {
        console.error(error)
      }
    }
    return { productsSpecial, productsWillLike, productsSorted, hasPrev, hasNext, currentPage, totalPages, getProducts, getProductsSorted, searchQuery, updateSearchQuery }
  },
  {
    persist: true,
  }
)
