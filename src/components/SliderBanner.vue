<template>
  <VSheet class="mt-8">
    <VSlide-group disabled direction="horizontal">
      <VSlide-group-item v-for="banner in banners" :key="banner.id ?? 'default-key'">
        <VCard class="ml-4 mr-n3 rounded-lg" height="38.93vw" max-width="92vw">
          <div v-if="banner.cover?.includes('http')"  class="d-flex fill-height align-center justify-center">
            <img :src="banner.cover" alt="Banner Image" class="banner-image " />
          </div>
        </VCard>
      </VSlide-group-item>
    </VSlide-group>
  </VSheet>
</template>

<script setup lang="ts">
import type { Banners } from '@/types/BannersInterface';

defineProps<{
  banners: Banners[]
}>();

</script>

<style scoped>
.banner-image {
  max-height: 100%;
  object-fit: cover;
}

.v-slide-group {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background-color: #F3F5F9;
}

</style>
