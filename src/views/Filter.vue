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
    <VImg v-show="isDiscount" src="/public/switch-on-icon.svg" width="40" height="24" @click="isDiscount = !isDiscount"></VImg>
    <VImg v-show="!isDiscount" src="/public/switch-off-icon.svg" width="40" height="24" @click="isDiscount = !isDiscount"></VImg>
  </VContainer>
  <VContainer class="pb-0">
    <p>Цена, ₽</p>
  </VContainer>
  <VContainer class="slider-container mt-10 pb-0">
    <v-range-slider v-model="range" :max="800" :min="0" :step="1" class="slider-range" color="#32AFC0" hide-details>
      <template v-slot:prepend>
        <v-text-field density="compact" class="text-field-start" type="number" variant="plain"
          hide-details single-line>от {{ range[0] }}</v-text-field>
      </template>
      <template v-slot:append>
        <v-text-field density="compact" class="text-field-end" type="number" variant="plain"
          hide-details single-line>до {{ range[1] }} </v-text-field>
      </template>
    </v-range-slider>
  </VContainer>
  <VContainer class="d-flex justify-space-between pt-0">
    <VContainer class="pa-0">
      <p>Тип растения</p>
    </VContainer>
    <RouterLink to="/plant-type">
      <VContainer class="plants-type-all d-flex align-center pa-0 justify-end">
        <p class="d-flex">Все</p>
        <VIcon class="plants-type-all-icon" size="24">mdi-chevron-right</VIcon>
      </VContainer>
    </RouterLink>
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const goBack = () => {
  window.history.go(-1);
};

const isDiscount = ref(true);

const range = ref([200, 800]);
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

.slider-container {
  height: ;
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

.plants-type-all p, .plants-type-all-icon {
  color: #32AFC0;
}

</style>
