import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useProductsFilterStore = defineStore(
  'filters',
  () => {
    const isDiscount = ref(false);

    const range_value_from = ref(0);
    const range_value_to = ref(800000);

    const heightMin = ref(0);
    const heightMax = ref(0);

    const diameterMin = ref(0);
    const diameterMax = ref(0);

    const isMarkdown = ref(false);

    const upDateIsDiscount = (value: boolean) => {
      isDiscount.value = value
    }

    const upDateRangeValueFrom = (value: number) => {
      range_value_from.value = value
    }

    const upDateRangeValueTo = (value: number) => {
      range_value_to.value = value
    }

    const upDateHeightMin = (value: number) => {
      heightMin.value = value
    }

    const upDateHeightMax = (value: number) => {
      heightMax.value = value
    }

    const upDateDiameterMin = (value: number) => {
      diameterMin.value = value
    }

    const upDateDiameterMax = (value: number) => {
      diameterMax.value = value
    }

    const upDateIsMarkdown = (value: boolean) => {
      isMarkdown.value = value
    }

    const clearFilters = () => {
      isDiscount.value = false;
      range_value_from.value = 0;
      range_value_to.value = 800000;
      heightMin.value = 0;
      heightMax.value = 150;
      diameterMin.value = 0;
      diameterMax.value = 50;
      isMarkdown.value = false;
    }

    return {
      isDiscount,
      range_value_from,
      range_value_to,
      heightMin,
      heightMax,
      diameterMin,
      diameterMax,
      isMarkdown,
      upDateIsDiscount,
      upDateRangeValueFrom,
      upDateRangeValueTo,
      upDateHeightMin,
      upDateHeightMax,
      upDateDiameterMin,
      upDateDiameterMax,
      upDateIsMarkdown,
      clearFilters
    }
  },
  {
    persist: true,
  }
)


