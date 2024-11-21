<template>
  <div class="text-center">
    <VContainer>
      <VRow justify="center">
        <VCol cols="8">
          <VContainer class="max-width">
            <VPagination v-model="page" :length="totalPage" class="my-4"></VPagination>
          </VContainer>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSortStore } from '@/stores/SortStore';

const sortStore = useSortStore();

const props = defineProps<{
  currentPage: number,
  totalPage: number,
}>();

const page = ref(props.currentPage);
console.log(page.value)

</script>

<style scoped></style>
