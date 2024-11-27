<template>
  <VContainer class="d-flex justify-space-between align-baseline ga-3">
    <VIcon size="24" @click="goBack">mdi-chevron-left</VIcon>
    <p class="filter-title">Фильтры</p>
    <p class="filter-clear" @click="clearFilters">Очистить</p>
  </VContainer>
  <VContainer class="d-flex justify-space-between">
    <VContainer class="d-flex align-center justify-start pa-0">
      <img src="/public/percent-icon.svg" width="24" height="24">
      <p class="filter-discount">Товары со скидкой</p>
      <VSpacer></VSpacer>
    </VContainer>
    <VImg v-show="isDiscount" src="/public/switch-on-icon.svg" width="40" height="24" @click="isDiscount = !isDiscount">
    </VImg>
    <VImg v-show="!isDiscount" src="/public/switch-off-icon.svg" width="40" height="24"
      @click="isDiscount = !isDiscount"></VImg>
  </VContainer>
  <VContainer class="pb-0">
    <p>Цена, ₽</p>
  </VContainer>
  <VContainer class="slider-container mt-10 pb-0">
    <VRangeSlider v-model="rangePrice" :max="800000" :min="0" :step="1" class="slider-range-price" color="#32AFC0"
      hide-details>
      <template v-slot:prepend>
        <VTextField v-model.number="rangePrice[0]" density="compact" class="text-field-start" type="number" variant="plain" hide-details single-line>от
          </VTextField>
      </template>
      <template v-slot:append>
        <VTextField v-model.number="rangePrice[1]" density="compact" class="text-field-end" type="number" variant="plain" hide-details single-line>до
           </VTextField>
      </template>
    </VRangeSlider>
  </VContainer>
  <VContainer class="d-flex justify-space-between pt-0">
    <VContainer class="pa-0">
      <p>Тип растения</p>
    </VContainer>
    <VContainer class="plants-type-all d-flex align-center pa-0 justify-end">
      <p @click="isActive = true">Все</p>
      <VIcon class="plants-type-all-icon" size="24">mdi-chevron-right</VIcon>
    </VContainer>
  </VContainer>
  <PlantsTypeDialog v-if="isActive" :modelValue="isActive" @update:modelValue="isActive = false"
    @update:selected="updateSelected" />
  <VContainer class="plants-type-container d-flex justify-start flex-wrap ga-1 pt-0">
    <div v-for="category in categories" :key="category.id">
      <VChip>{{ category.name }}</VChip>
    </div>
  </VContainer>
  <VContainer class="d-flex justify-space-between pt-0">
    <VContainer class="pa-0">
      <p>Сорт растения</p>
    </VContainer>
    <VContainer class="plants-variety-all d-flex align-center pa-0 justify-end">
      <p>Все</p>
      <VIcon class="plants-variety-all-icon" size="24">mdi-chevron-right</VIcon>
    </VContainer>
  </VContainer>
  <VContainer class="plants-variety-container d-flex justify-start flex-wrap ga-1 pt-0">
    <ul>
      <li v-for="category in categories" :key="category.id">
        <ul>
          <li v-for="child in category.children" :key="child.id">
            <VChip>{{ child.name }}</VChip>
          </li>
        </ul>
      </li>
    </ul>
  </VContainer>
  <VContainer class="pt-0">
    <p class="plant-height">Высота, см</p>
    <div class="d-flex justify-space-between pt-2">
      <VTextField class="text-field-height-start" density="compact" type="number" variant="plain" hide-details
        single-line v-model="rangeHeight[0]">от </VTextField>
      <VTextField class="text-field-height-end" density="compact" type="number" variant="plain" hide-details single-line
        v-model="rangeHeight[1]">до </VTextField>
    </div>
  </VContainer>
  <VContainer class="py-0">
    <p class="plant-diameter">Диаметр, см</p>
    <div class="d-flex justify-space-between pt-2">
      <VTextField class="text-field-diameter-start" density="compact" type="number" variant="plain" hide-details
        single-line v-model="rangeDiameter[0]">от </VTextField>
      <VTextField class="text-field-diameter-end" density="compact" type="number" variant="plain" hide-details
        single-line v-model="rangeDiameter[1]">до </VTextField>
    </div>
  </VContainer>
  <VContainer class="d-flex justify-space-between">
    <VContainer class="d-flex align-center justify-start pa-0">
      <p class="filter-markdown ml-0">Уценённые товары</p>
      <VSpacer></VSpacer>
    </VContainer>
    <VImg v-show="isMarkdown" src="/public/switch-on-icon.svg" width="40" height="24" @click="isMarkdown = !isMarkdown">
    </VImg>
    <VImg v-show="!isMarkdown" src="/public/switch-off-icon.svg" width="40" height="24"
      @click="isMarkdown = !isMarkdown">
    </VImg>
  </VContainer>
  <VContainer class="pt-0">
    <VBtn class="apply-button" variant="tonal" width="100%" @click="applyFilters">Применить</VBtn>
  </VContainer>
</template>

<script setup lang="ts">
import PlantsTypeDialog from '@/components/PlantsTypeDialog.vue';
import { onMounted, ref } from 'vue';
import { useCategoriesStore } from '@/stores/CategoriesStore';
import { useProductsFilterStore } from '@/stores/ProductsFilterStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const productsFilterStore = useProductsFilterStore();

const categoriesStore = useCategoriesStore();
const goBack = () => {
  window.history.go(-1);
};

const isActive = ref(false);

const isDiscount = ref(false);

const rangePrice = ref([0, 800000]);

const categories = ref([]);

const selectedCategories = ref([]);

const rangeHeight = ref([10, 150]);

const rangeDiameter = ref([10, 50]);

const isMarkdown = ref(false);

const updateSelected = (selected) => {
  selectedCategories.value = selected;
};

const clearFilters = () => {
  isDiscount.value = false;
  rangePrice.value = [0, 800000];
  rangeHeight.value = [10, 150];
  rangeDiameter.value = [10, 50];
  isMarkdown.value = false;
}

const applyFilters = () => {
  productsFilterStore.upDateIsDiscount(isDiscount.value);
  productsFilterStore.upDateRangeValueFrom(rangePrice.value[0]);
  productsFilterStore.upDateRangeValueTo(rangePrice.value[1]);
  productsFilterStore.upDateHeightMin(rangeHeight.value[0]);
  productsFilterStore.upDateHeightMax(rangeHeight.value[1]);
  productsFilterStore.upDateDiameterMin(rangeDiameter.value[0]);
  productsFilterStore.upDateDiameterMax(rangeDiameter.value[1]);
  productsFilterStore.upDateIsMarkdown(isMarkdown.value);
  isActive.value = false
  router.push('/special-offers-more');
}

onMounted(async () => {
  isDiscount.value = productsFilterStore.isDiscount;
  rangePrice.value = [productsFilterStore.range_value_from, productsFilterStore.range_value_to];
  rangeHeight.value = [productsFilterStore.heightMin, productsFilterStore.heightMax];
  rangeDiameter.value = [productsFilterStore.diameterMin, productsFilterStore.diameterMax];
  isMarkdown.value = productsFilterStore.isMarkdown;
  await categoriesStore.getCategories();
  categories.value = categoriesStore.categories;
})
</script>

<style scoped>
.filter-title {
  font-size: 20px;
  line-height: 34px;
  font-weight: 600;
  letter-spacing: 0.37px;
}

.filter-clear {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.2px;
  color: #0C663B66;
}

.filter-clear:active {
  color: #32AFC0;
}

.filter-discount, .filter-markdown {
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  letter-spacing: -0.2px;
  margin-left: 10px;
}

.slider-range-price {
  height: 15.53vw;
  position: relative;
  margin: 0;
}

.text-field-start {
  width: 44vw;
  height: 12.8vw;
  background-color: white;
  border-radius: 8px;
  padding: 8px 15px;
  position: absolute;
  top: -12vw;
  left: 0;
  color: #1C1C1E66;
}

.text-field-end {
  width: 44vw;
  height: 12.8vw;
  background-color: white;
  border-radius: 8px;
  padding: 8px 15px;
  position: absolute;
  top: -12vw;
  right: 0;
  color: #1C1C1E66;
}

.plants-type-all p,
.plants-type-all-icon,
.plants-variety-all p,
.plants-variety-all-icon {
  color: #32AFC0;
}

.close-icon {
  position: absolute !important;
  top: 20px !important;
  right: 20px !important;
}

.plants-type-container {
  height: 21vw;
}

.plants-variety-container ul li ul {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.text-field-height-start,
.text-field-height-end,
.text-field-diameter-start,
.text-field-diameter-end {
  max-width: 48%;
  height: 12.8vw;
  background-color: white;
  border-radius: 8px;
  padding: 8px 15px;
  color: #1C1C1E66;
}

.apply-button {
  background-color: #32AFC0;
  color: #FFFFFF;
  font-weight: 600;
}

</style>
