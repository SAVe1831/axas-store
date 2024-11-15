<template>
  <div>
    <Input />
    <SliderBanner :banners="banners" />
    <SliderCategory :categories="categories" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Input from '../components/Input.vue';
import SliderBanner from '../components/SliderBanner.vue';
import { useBannersStore } from '@/stores/BannersStore';
import type { Banners } from '@/types/BannersInterface';
import SliderCategory from '../components/SliderCategory.vue';
import { useCategoriesStore } from '@/stores/CategoriesStore';
import type { Categories } from '@/types/CategoriesInterface';

const bannersStore = useBannersStore();
const banners = ref<Banners[]>([]);

const categoriesStore = useCategoriesStore();
const categories = ref<Categories[]>([]);

onMounted(async () => {
  await bannersStore.getBanners();
  banners.value = bannersStore.banners;
  await categoriesStore.getCategories();
  categories.value = categoriesStore.categories;
});
</script>

<style scoped></style>
