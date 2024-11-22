<template>
  <v-container>
    <v-dialog v-model="isActiveLocal" transition="dialog-bottom-transition" fullscreen height="90%" location="bottom"
      content-class="custom-dialog bottom-0 mt-auto rounded-t-lg">
      <v-card>
        <VContainer class="d-flex justify-start align-baseline">
          <p class="plants-type-clear">Очистить</p>
          <p class="plants-type-title">Тип растения</p>
          <VImg src="/public/close-icon.svg" alt="Close" width="24" height="24" class="close-icon" @click="closeDialog">
          </VImg>
        </VContainer>
        <Input class="py-0" :placeholder-text="'Поиск по списку'" bg-color="#F3F5F9" />
        <VContainer>
          <div v-for="category in categories" :key="category.id" class="checkbox-container d-flex justify-space-between align-center">
            <v-checkbox v-model="selected" :label="category.name" :value="category.id" class="plants-type-checkbox d-flex align-center"></v-checkbox>
            <img v-if="selected.includes(category.id)" src="/public/checkbox-icon-yes.svg" alt="" @click="selected.splice(selected.indexOf(category.id), 1)">
            <img v-else src="/public/checkbox-icon-no.svg" alt="" @click="selected.push(category.id)">
          </div>
        </VContainer>
        <VContainer class="pt-0">
          <VBtn class="apply-button" variant="tonal" width="100%" @click="apply">Применить</VBtn>
        </VContainer>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { computed } from 'vue';
import Input from './Input.vue';
import { useCategoriesStore } from '@/stores/CategoriesStore';
import type { Categories } from '@/types/CategoriesInterface';

const categoriesStore = useCategoriesStore();
const categories = ref<Categories[]>([]);

const selected = ref([]);

const props = defineProps<{ modelValue: boolean }>();

const emit = defineEmits(['update:modelValue', 'close' ,'update:selected']);



const isActiveLocal = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const closeDialog = () => {
  emit('close');
  isActiveLocal.value = false
}

const apply = () => {
  emit('update:selected', selected.value);
  isActiveLocal.value = false;
};

onMounted(async () => {
  await categoriesStore.getCategories();
  categories.value = categoriesStore.categories;
});
</script>

<style scoped>
.plants-type-title {
  font-size: 20px;
  line-height: 34px;
  font-weight: 600;
  letter-spacing: 0.37px;
}

.plants-type-clear {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.2px;
  color: #0C663B66;
}

.plants-type-title {
  margin-left: 10vw;
}

.close-icon {
  position: absolute !important;
  top: 20px !important;
  right: 20px !important;
}

.checkbox-container {
  border-bottom: 1px solid #E6E6E6;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  letter-spacing: -0.2px;
  color: #1C1C1E;
}

.apply-button {
  background-color: #32AFC0;
  color: #FFFFFF;
  font-weight: 600;
}


</style>
