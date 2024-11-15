<template>
  <VSheet class="mx-auto mt-8" center-active>
    <VSlide-group center-active direction="horizontal">
      <VSlide-group-item v-for="banner in banners" :key="banner.id ?? 'default-key'" >
        <VCard class="mx-1 rounded-lg" height="146px" max-width="92vw">
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
