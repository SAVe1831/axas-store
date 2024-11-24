<template>
  <VContainer class="d-flex align-center ga-3">
    <VIcon size="24" @click="goBack">mdi-chevron-left</VIcon>
    <Input class="pa-0" :placeholder-text="'Поиск'" bg-color="white" />
  </VContainer>
  <VContainer>
    <p class="special-offer-title">Спецпредложения</p>
    <VContainer class="d-flex justify-space-between align-center pa-0">
      <VContainer class="sort d-flex align-center w-50 ma-0 position-relative">
        <VImg src="/public/sort-icon.svg" alt="Sort" width="18" height="18" class="position-absolute left-0 top-2"></VImg>
        <v-dialog transition="dialog-bottom-transition" fullscreen height="65%" location="bottom" content-class="custom-dialog bottom-0 mt-auto rounded-t-lg" >
          <template v-slot:activator="{ props: activatorProps }">
            <p class="ml-1" v-bind="activatorProps">{{ selectedSort }}</p>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card class="absolute">
              <VContainer>
                <p class="dialog-header">Сортировать</p>
                <VImg src="/public/close-icon.svg" alt="Close" width="24" height="24" class="close-icon" @click="isActive.value = false"></VImg>
              </VContainer>
              <VContainer>
                <VRadioGroup v-model="selectedOption" class="radio-group">
                  <div class="radio-container d-flex justify-space-between align-center" for="option1">
                    <VRadio label="Популярное" id="option1" value="popularity"></VRadio>
                    <img v-if="selectedOption === 'popularity'" src="/public/radio-button-yes.svg" width="24" height="24" alt="" class="mr-1">
                    <img v-else src="/public/radio-button-no.svg" width="24" height="24" alt="" class="mr-1" @click="selectedOption = 'popularity'">
                  </div>
                  <div class="radio-container d-flex justify-space-between align-center" for="option2">
                    <VRadio label="Новинки" id="option2" value="default"></VRadio>
                    <img v-if="selectedOption === 'default'" src="/public/radio-button-yes.svg" width="24" height="24" alt="" class="mr-1">
                    <img v-else src="/public/radio-button-no.svg" width="24" height="24" alt="" class="mr-1" @click="selectedOption = 'default'">
                  </div>
                  <div class="radio-container d-flex justify-space-between align-center" for="option3">
                    <VRadio label="Подешевле" id="option3" value="price"></VRadio>
                    <img v-if="selectedOption === 'price'" src="/public/radio-button-yes.svg" width="24" height="24" alt="" class="mr-1">
                    <img v-else src="/public/radio-button-no.svg" width="24" height="24" alt="" class="mr-1" @click="selectedOption = 'price'">
                  </div>
                  <div class="radio-container d-flex justify-space-between align-center" for="option4">
                    <VRadio label="Подороже" id="option4" value="-price"></VRadio>
                    <img v-if="selectedOption === '-price'" src="/public/radio-button-yes.svg" width="24" height="24" alt="" class="mr-1">
                    <img v-else src="/public/radio-button-no.svg" width="24" height="24" alt="" class="mr-1" @click="selectedOption = '-price'">
                  </div>
                  <div class="radio-container d-flex justify-space-between align-center" for="option5">
                    <VRadio label="По рейтингу" id="option5" value="rating"></VRadio>
                    <img v-if="selectedOption === 'rating'" src="/public/radio-button-yes.svg" width="24" height="24" alt="" class="mr-1">
                    <img v-else src="/public/radio-button-no.svg" width="24" height="24" alt="" class="mr-1" @click="selectedOption = 'rating'">
                  </div>
                </VRadioGroup>
              </VContainer>
              <VContainer class="pt-0">
                <VBtn class="apply-button" variant="tonal" width="100%" @click="sorted(), isActive.value = false">Применить</VBtn>
              </VContainer>
            </v-card>
          </template>
        </v-dialog>
      </VContainer>
      <VSpacer></VSpacer>
      <RouterLink to="/filter">
        <VContainer class="d-flex align-center w-25 pa-0 ma-0">
          <VImg src="/public/filter-icon.svg" alt="Filter" width="18" height="18"></VImg>
          <p style="color: #000000;">Фильтры</p>
        </VContainer>
      </RouterLink>
    </VContainer>
  </VContainer>
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
import { useSortStore } from '@/stores/SortStore';
import Pagination from '@/components/Pagination.vue';

const productsStore = useProductsStore();

const sortStore = useSortStore();

const currentPage = ref(1);
const totalPage = ref(0);
const hasPrev = ref(false);
const hasNext = ref(false);

const goBack = () => {
  window.history.go(-1);
};



const selectedOption = ref('popularity');
const selectedSort = ref('Популярное');

const catalog = ref<productsType[]>([]);

const sorted = () => {
  if (selectedOption.value === 'popularity') {
    selectedSort.value = 'Популярное';
  } else if (selectedOption.value === 'default') {
    selectedSort.value = 'Новинки';
  } else if (selectedOption.value === 'price') {
    selectedSort.value = 'Подешевле';
  } else if (selectedOption.value === '-price') {
    selectedSort.value = 'Подороже';
  } else if (selectedOption.value === 'rating') {
    selectedSort.value = 'По рейтингу';
  }
  sortStore.setSelectedSort(selectedOption.value);
  productsStore.currentPage = 1;
  productsStore.getProductsSorted()
}

watch(() => productsStore.productsSorted, () => {
  catalog.value = productsStore.productsSorted;
})

onMounted(async () => {
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

.dialog-header {
  text-align: center !important;
  font-size: 20px !important;
  line-height: 34px !important;
  font-weight: 600 !important;
  letter-spacing: 0.37px;
}

.close-icon {
  position: absolute !important;
  top: 20px !important;
  right: 20px !important;
}

.radio-container {
  height: 13vw;
  border-bottom: 1px solid #E6E6E6;
}

.apply-button {
  background-color: #32AFC0;
  color: #FFFFFF;
  font-weight: 600;
}

</style>
