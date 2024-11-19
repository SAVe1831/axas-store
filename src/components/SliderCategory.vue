<template>
  <VContainer>
    <VSheet class="mx-auto mt-n2">
      <VSlide-group center-active direction="horizontal">
        <VSlide-group-item v-for="category in categories" :key="category.id ?? 'default-key'">
          <VCard elevation="0" height="21.87vw" width="16vw" class="category-image-container ml-4 mr-2">
            <div class="d-flex flex-column justify-space-between ga-1 ">
              <div v-if="category.thumbnail?.includes('http')"
                class="image-container d-flex fill-height align-center justify-center">
                <img :src="category.thumbnail" alt="Category Image" class="category-image" />
              </div>
              <p class="category-name">{{ category.name }}</p>
            </div>
          </VCard>
        </VSlide-group-item>
      </VSlide-group>
    </VSheet>
  </VContainer>
</template>

<script setup lang="ts">
import type { Categories } from '@/types/CategoriesInterface';

defineProps<{
  categories: Categories[]
}>();
</script>

<style scoped>

.v-slide-group {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background-color: #F3F5F9;
}

.category-image-container {
  background-color: #F3F5F9;
}

.category-image {
  width: 16vw;
  height: 16vw;
  object-fit: cover;
  border-radius: 12px;
}

.category-name {
  font-size: 10px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: -0.2px;
  text-align: center;
  background-color: #F3F5F9;
  color: #1C1C1E;
}
</style>
