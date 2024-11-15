import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Banners } from '../types/BannersInterface'
import api from '../stores/api'

export const useBannersStore = defineStore(
  'banners',
  () => {
    const banners = ref<Banners[]>([])

    const getBanners = async (): Promise<void> => {
      try {
        const response = await api.get<{ data: Banners[] }>('/1/promos/')
        banners.value = response.data.data
      } catch (error) {
        console.error(error)
      }
    }

    return { banners, getBanners }
  },
  {
    persist: true,
  }
)
