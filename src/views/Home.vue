<template>
  <div>
    <Input />
    <SliderBanner :banners="banners" />
    <SliderCategory :categories="categories" />
    <SpecialOffers :products="products" />
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
import SpecialOffers from '@/components/SpecialOffers.vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { type products } from '@/types/ProductsInterface';

const bannersStore = useBannersStore();
const banners = ref<Banners[]>([]);

const categoriesStore = useCategoriesStore();
const categories = ref<Categories[]>([]);

const productsStore = useProductsStore();
const products = ref<products[]>([]);

onMounted(async () => {
  await bannersStore.getBanners();
  banners.value = bannersStore.banners;
  await categoriesStore.getCategories();
  categories.value = categoriesStore.categories;
  await productsStore.getProducts();
  products.value = productsStore.products;
  console.log(products.value);
});
</script>

<style scoped></style>
