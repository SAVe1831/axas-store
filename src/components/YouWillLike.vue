<template>
  <VContainer class="pb-0">
    <p class="title">Вам понравится</p>
  </VContainer>
  <VContainer class="d-flex flex-wrap justify-space-between ga-2">
    <div v-for="product in productsWillLike" :key="product.id">
      <VCard class="product-card ga-2 pa-2" width="44.27vw" height="70.4vw" color="#F3F5F9">
        <VImg width="41.07vw" height="43.73vw" cover :src="product?.thumbnail ? product?.thumbnail : ''"
          class="product-image" alt="Product Image">
          <img :src="favorites[product.id] ? '/public/favorites-icon-yes.svg' : '/public/favorites-icon-no.svg'"
            alt="Favorites" class="favorite-icon position-absolute right-0 top-0 mr-1 mt-1"
            @click="favorites[product.id] = !favorites[product.id]">
        </VImg>
        <div class="product-info mt-2">
          <div class="feedbacks w-100 h-auto d-flex justify-start align-center">
            <img src="/public/star-icon.svg" alt="Rating">
            <div class="ml-1">{{ product.rating || 0 }}</div>
            <img src="/public/dot-icon.svg" alt="">
            <div>{{ product.totalFeedbackCount }} {{ getAgeSuffix(product.totalFeedbackCount) }}</div>
          </div>
          <span :style="{ color: product.oldPrice ? '#D22121' : '#000000' }" class="product-price">{{ product.price }} ₽
          </span><span class="product-old-price"> {{ product.oldPrice ? `${product.oldPrice} ₽` : '' }}</span>
          <div class="product-description overflow-hidden">{{ product.description }}</div>
        </div>
      </VCard>
    </div>

  </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { productsType } from '@/types/ProductsInterface';


defineProps<{
  productsWillLike: productsType[]
}>();

const favorites = ref<Record<number, boolean>>({});

const getAgeSuffix = (feedback) => {
  if (feedback % 10 === 1 && feedback % 100 !== 11) {
    return 'отзыв';
  } else if ((feedback % 10 >= 2 && feedback % 10 <= 4) && (feedback % 100 < 10 || feedback % 100 >= 20)) {
    return 'отзыва';
  } else {
    return 'отзывов';
  }
};
</script>

<style scoped>
.title {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.product-card {
  border-radius: 12px;
}

.product-card>.product-image {
  border-radius: 6px;
  background-color: #E3E3E3;
}

.product-info {
  width: 100%;
}

.feedbacks {
  color: #A7A7A8;
}

.product-price {
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  letter-spacing: -0.2px;
}

.product-old-price {
  font-size: 12px;
  color: #1C1C1E66;
  text-decoration: line-through;
}

.product-description {
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.2px;
  height: 9.07vw;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
