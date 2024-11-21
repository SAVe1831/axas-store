import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSortStore = defineStore('sort', () => {
  const selectedSort = ref<string>('popularity')

  const setSelectedSort = (sort: string) => {
    selectedSort.value = sort
  }
  return { selectedSort, setSelectedSort }
})
