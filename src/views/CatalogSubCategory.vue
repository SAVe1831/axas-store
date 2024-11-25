<template>
  <VContainer class="d-flex align-center ga-3">
    <VIcon size="24" @click="goBack">mdi-chevron-left</VIcon>
    <Input class="pa-0" :placeholder-text="'Поиск'" bg-color="white" />
  </VContainer>
  <VContainer>
    <ul>
      <li @click="$router.push(`/catalog-subcategory-details/${subCategory.id}`)" v-for="subCategory in subCategories" :key="subCategory.id">
        <div class="subcategory-name-container d-flex align-center">
          <p class="subcategory-name-text">{{ subCategory.name }}</p>
        </div>
      </li>
    </ul>
  </VContainer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoriesStore } from '@/stores/CategoriesStore';
import Input from '@/components/Input.vue';

const route = useRoute();

const categoriesStore = useCategoriesStore();

const subCategories = ref([]);

defineProps(['id']);

const goBack = () => {
  window.history.go(-1);
};

onMounted(async () => {
  await categoriesStore.getCategories();
  const categoryId = Number(route.params.id);
  const selectedCategory = categoriesStore.categories.find(category => category.id === categoryId);
  if (selectedCategory && selectedCategory.children) {
    subCategories.value = selectedCategory.children;
  }
})
</script>

<style scoped>
.subcategory-name-container {
  width: 100%;
  height: 13.87vw;
  border-bottom: 1px solid #00000016;
}

.subcategory-name-text {
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.2px;
  color: #1C1C1E;
}
</style>
