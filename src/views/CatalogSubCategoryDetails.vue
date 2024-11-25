<template>
  <VContainer class="d-flex align-center ga-3">
    <VIcon size="24" @click="goBack">mdi-chevron-left</VIcon>
    <Input class="pa-0" :placeholder-text="'Поиск'" bg-color="white" />
  </VContainer>
  <VContainer class="py-0">
    <p v-if="subcategoryDetails" class="subcategory-name">{{ subcategoryDetails.name }}</p>
  </VContainer>
  <div class="d-flex justify-space-between align-center">
    <DialogSort />
    <VContainer>
      <RouterLink to="/filter">
        <VContainer class="d-flex align-center w-10 pa-0 ma-0">
          <VSpacer></VSpacer>
          <img src="/public/filter-icon.svg" alt="Filter" width="18" height="18"></img>
          <p style="color: #000000;">Фильтры</p>
        </VContainer>
      </RouterLink>
    </VContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoriesStore } from '@/stores/CategoriesStore';
import Input from '@/components/Input.vue';
import DialogSort from '@/components/dialogSort.vue';

const categoriesStore = useCategoriesStore();

const route = useRoute();

const subcategoryDetails = ref(null);

defineProps(['subCategoryId']);

const goBack = () => {
  window.history.go(-1);
};

onMounted(async () => {
  const subCategoryId = Number(route.params.subCategoryId);
  await categoriesStore.getCategories();
  subcategoryDetails.value = categoriesStore.categories
    .flatMap(category => category.children)
    .find(subCategory => subCategory.id === subCategoryId);
});

</script>

<style scoped>
.subcategory-name {
  font-size: 24px;
  line-height: 41px;
  font-weight: 600;
}
</style>
