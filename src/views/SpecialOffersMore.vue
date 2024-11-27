<template>
  <VContainer class="d-flex align-center ga-3">
    <VIcon size="24" @click="goBack">mdi-chevron-left</VIcon>
    <Input class="pa-0" :placeholder-text="'Поиск'" bg-color="white" />
  </VContainer>
  <VContainer class="pt-0">
    <p class="special-offer-title">Спецпредложения</p>
  </VContainer>
  <div class="d-flex justify-space-between align-center">
    <DialogSort />
    <VContainer>
      <RouterLink to="/filter">
        <VContainer class="d-flex align-center pa-0 ma-0">
          <VSpacer></VSpacer>
          <img src="/public/filter-icon.svg" alt="Filter" width="18" height="18">
          <p style="color: #000000;">Фильтры</p>
        </VContainer>
      </RouterLink>
    </VContainer>
  </div>
  <GetCatalog :catalog="catalog" />
  <Pagination v-if="catalog.length > 0" :current-page="currentPage" :total-page="totalPage" :has-prev="hasPrev" :has-next="hasNext" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Input from '@/components/Input.vue';
import { VContainer, VSpacer } from 'vuetify/components';
import { RouterLink } from 'vue-router';
import { useProductsStore } from '@/stores/ProductsStore';
import { type productsType } from '@/types/ProductsInterface';
import GetCatalog from '@/components/GetCatalog.vue';
import Pagination from '@/components/Pagination.vue';
import DialogSort from '@/components/dialogSort.vue';
import { useProductsFilterStore } from '@/stores/ProductsFilterStore';

const productsFilterStore = useProductsFilterStore();

const productsStore = useProductsStore();

const currentPage = ref(1);
const totalPage = ref(0);
const hasPrev = ref(false);
const hasNext = ref(false);

const goBack = () => {
  window.history.go(-1);
};

const catalog = ref<productsType[]>([]);

watch(() => productsStore.productsSorted, () => {
  catalog.value = productsStore.productsSorted;
})

watch(() => productsStore.searchQuery, async () => {
  await productsStore.getProductsSorted();
  catalog.value = productsStore.productsSorted;
})

onMounted(async () => {
  productsStore.updateSearchQuery('');
  await productsStore.getProductsSorted();
  catalog.value = productsStore.productsSorted
  currentPage.value = productsStore.currentPage
  totalPage.value = productsStore.totalPages
  hasPrev.value = productsStore.hasPrev
  hasNext.value = productsStore.hasNext
})

</script>

<style scoped>
.special-offer-title {
  font-size: 24px;
  line-height: 41px;
  font-weight: 600;
  letter-spacing: 0.37px;
}

.sort {
  height: 30px;
}
</style>
