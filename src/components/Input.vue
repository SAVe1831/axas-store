<template>
  <VContainer>
    <v-text-field @keyup.enter="search" v-model="searchQuery" :placeholder="placeholderText" variant="plain" :bg-color="bgColor" hide-details="auto" rounded="lg" density="compact" class="p-0"><img class="ml-3 mr-2" src="/search-icon.svg" alt="Search"></v-text-field>
  </VContainer>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { useCategoriesStore } from '@/stores/CategoriesStore';

const categoriesStore = useCategoriesStore();

const productsStore = useProductsStore();

defineProps<{
  placeholderText: string,
  bgColor: string
}>();

const searchQuery = ref('');

const search = () => {
  productsStore.updateSearchQuery(searchQuery.value);
  categoriesStore.updateSearchQuery(searchQuery.value)
}

watch(() => productsStore.searchQuery, () => {
  searchQuery.value = productsStore.searchQuery
})

watch(() => categoriesStore.searchQuery, () => {
  searchQuery.value = categoriesStore.searchQuery
})

</script>

<style lang="scss" scoped>

</style>
