<template>
  <VContainer class="d-flex flex-wrap justify-space-between ga-2">
    <div v-for="product in catalog" :key="product.id">
      <VCard class="product-card ga-2 pa-2" width="44.27vw" height="81.6vw" color="#F3F5F9">
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
        <VBtn v-if="!isProductChoosen[product.id]" color="#32AFC0" block class="rounded-lg" @click="addToCart(product.id)">В корзину</VBtn>
        <div v-else class="button-alternate d-flex justify-space-between align-center">
          <img src="/public/minus-grey-icon.svg" alt="minus" @click="decrease(product.id)">
          <div class="button-alternate-counter">{{ counts[product.id] }}</div>
          <img src="/public/plus-green-icon.svg" alt="plus" @click="increase(product.id)">
        </div>
      </VCard>
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { productsType } from '@/types/ProductsInterface';

defineProps<{
  catalog: productsType[]
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

const counts = ref<Record<number, number>>({});
const isProductChoosen = ref<Record<number, boolean>>({});
const addToCart = (productId) => {
  isProductChoosen.value[productId] = true;
  counts.value[productId] = counts.value[productId] || 1; // Устанавливаем начальное значение количества
};

const increase = (productId) => {
  counts.value[productId]++;
};

const decrease = (productId) => {
  if (counts.value[productId] > 1) {
    counts.value[productId]--;
  } else {
    isProductChoosen.value[productId] = false; // Сбрасываем выбор, если количество меньше 1
    delete counts.value[productId]; // Удаляем количество из объекта
  }
};
</script>

<style scoped>
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

.button-alternate {
  width: 100%;
  height: 9.6vw;
  border-radius: 8px;
  background-color: #1C1C1E1A;
  padding: 6px 4px;
}
</style>
