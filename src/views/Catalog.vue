<template>
  <VContainer class="d-flex align-center ga-3">
    <VIcon size="24" @click="goBack">mdi-chevron-left</VIcon>
    <Input class="pa-0" />
  </VContainer>
  <VContainer>
    <p class="special-offer-title">Спецпредложения</p>
    <div class="sort d-flex justify-space-between align-center w-50">
      <img src="/public/sort-icon.svg" alt="">
      <v-select v-model="select" :items="items" item-title="state" variant="plain" density="compact" class="my-select" hide-details menu-icon></v-select>
      <div class="filters"></div>
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Input from '@/components/Input.vue';


const goBack = () => {
  window.history.go(-1);
};

const select = ref('По умолчанию');
const items = [
  { state: 'По умолчанию' },
  { state: 'Популярное' },
  { state: 'Рейтинг' },
  { state: 'Цена' },
]

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
