<template>
  <VContainer class="d-flex justify-space-between align-baseline ga-3">
    <VIcon size="24" @click="goBack">mdi-chevron-left</VIcon>
    <p class="filter-title">Фильтры</p>
    <p class="filter-clear">Очистить</p>
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
    <VRangeSlider v-model="range" :max="800" :min="0" :step="1" class="slider-range" color="#32AFC0" hide-details>
      <template v-slot:prepend>
        <v-text-field density="compact" class="text-field-start" type="number" variant="plain" hide-details
          single-line>от {{ range[0] }}</v-text-field>
      </template>
      <template v-slot:append>
        <v-text-field density="compact" class="text-field-end" type="number" variant="plain" hide-details single-line>до
          {{ range[1] }} </v-text-field>
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
</template>

<script setup lang="ts">
import PlantsTypeDialog from '@/components/PlantsTypeDialog.vue';
import { onMounted, ref } from 'vue';
import { useCategoriesStore } from '@/stores/CategoriesStore';

const categoriesStore = useCategoriesStore();
const goBack = () => {
  window.history.go(-1);
};

const isDiscount = ref(true);

const isActive = ref(false);

const range = ref([200, 800]);

const categories = ref([]);

const selectedCategories = ref([]);

const updateSelected = (selected) => {
  selectedCategories.value = selected;
};

onMounted(async () => {
  await categoriesStore.getCategories();
  categories.value = categoriesStore.categories;
  console.log(categories.value);
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

.filter-discount {
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  letter-spacing: -0.2px;
  margin-left: 10px;
}

.slider-range {
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
  top: -45px;
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
  top: -45px;
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
</style>
