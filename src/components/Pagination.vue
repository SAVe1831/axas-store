<template>
  <div class="text-center">
    <VPagination v-model="page" :length="totalPage" class="my-4" rounded="circle" :total-visible="4"
      next-icon="mdi-chevron-right" prev-icon="mdi-chevron-left" color="#32AFC0" @update:model-value="newPage">
    </VPagination>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSortStore } from '@/stores/SortStore';
import { useProductsStore } from '@/stores/ProductsStore';

const productsStore = useProductsStore();

const sortStore = useSortStore();

const props = defineProps<{
  currentPage: number,
  totalPage: number,
  hasPrev: boolean,
  hasNext: boolean
}>();

const page = ref(1);

const newPage = () => {
  productsStore.currentPage = page.value
  productsStore.getProductsSorted();
  window.scrollTo(0, 0);
}

watch(() => props.currentPage, (newPage) => {
  page.value = newPage
})

</script>

<style scoped></style>
