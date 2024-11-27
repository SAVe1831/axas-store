<template>
  <VContainer>
    <p class="cart-title">Корзина</p>
  </VContainer>
  <VContainer>
    <div v-if="cart.length === 0">
      <h2>Корзина пуста</h2>
    </div>
    <div v-else>
      <VCard v-for="product in cart" :key="product.id" color="#F3F5F9" elevation="0" class="cart-card d-flex justify-start align-center ga-3">
        <img :src="product.thumbnail" alt="Product Image" class="cart-product-image"/>
        <div class="cart-product-info w-100">
          <div>{{ product.name }}</div>
          <div>Цена: {{ product.price }} ₽</div>
          <div>Количество: {{ product.quantity }}</div>
          <VBtn @click="removeFromCart(product)">Удалить</VBtn>
        </div>
      </VCard>
      <div class="cart-total">
        <strong>Итого: {{ totalPrice }} ₽</strong>
      </div>
    </div>
  </VContainer>
  <VContainer class="bg-white rounded-xl">
    <p class="cart-promocode-title">Введите промокод</p>
    <VContainer class="d-flex justify-space-between ga-1 px-0">
      <VTextField v-model="promoCode" class="text-field-promocode" bg-color="#F3F5F9" rounded="lg" variant="plain" hide-details placeholder="Промокод"></VTextField>
      <img v-if="!promoCode" src="/public/promocode-apply-disabled.svg" class="img-promocode">
      <img v-else src="/public/promocode-apply.svg" class="img-promocode">
    </VContainer>
  </VContainer>
  <VContainer class="bg-white rounded-t-xl mt-3">
    <p class="cart-order-summa-title">Сумма заказа</p>
    <VContainer class="px-0">
      <div class="d-flex justify-space-between align-center">
        <p>Товаров в заказе</p>
        <span class="count">4</span>
      </div>
      <div class="d-flex justify-space-between align-center">
        <p>Стоимость</p>
        <span class="price">1 000 ₽</span>
      </div>
      <div class="d-flex justify-space-between align-center" style="color: #D22121;">
        <p>Скидка</p>
        <span class="discount">-5 000 ₽</span>
      </div>
      <div class="d-flex justify-space-between align-center">
        <p>Итого</p>
        <span class="total">40 000 ₽</span>
      </div>
    </VContainer>
    <VContainer class="d-flex justify-space-between align-center px-0">
      <img v-show="isApplyRules" src="/public/checkbox-icon-yes.svg" @click="isApplyRules = !isApplyRules">
      <img v-show="!isApplyRules" src="/public/checkbox-icon-no.svg" @click="isApplyRules = !isApplyRules">
      <input type="checkbox" class="rules-checkbox ml-2" v-model="isApplyRules">
      <label class="ml-2" @click="isApplyRules = !isApplyRules">Согласен с <RouterLink to="/rules" class="rules-link">Правилами пользования торговой площадкой и правилами возврата</RouterLink></label>
    </VContainer>
    <VContainer class="d-flex justify-space-between align-start px-0">
      <div class="price d-flex flex-column">
        <span class="current-price">10 000 ₽</span>
        <span class="with-discount-price text-decoration-line-through">5 900 ₽</span>
      </div>
      <VBtn elevation="0" color="#32AFC0" rounded="lg" class="btn">Перейти к оформлению</VBtn>
    </VContainer>
  </VContainer>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/CartStore';

const cartStore = useCartStore();

const cart = cartStore.cart;

const removeFromCart = (product) => {
  cartStore.removeFromCart(product);
};

const totalPrice = computed(() => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
});

const promoCode = ref('');

const isApplyRules = ref(false);

</script>

<style scoped>
.cart-title {
  text-align: center;
  font-size: 20px;
  line-height: 34px;
  font-weight: 600;
  letter-spacing: 0.37px;
}

.cart-product-image {
  width: 28.27vw;
  height: 28.27vw;
}

.cart-promocode-title,
.cart-order-summa-title {
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  letter-spacing: -0.2px;
}

.img-promocode {
  width: 12.8vw;
  height: 12.8vw;
}

.count,
.price,
.discount {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.2px;
}

.total {
  font-size: 20px;
  line-height: 34px;
  font-weight: 600;
  letter-spacing: 0.37px;
  color: #1C1C1E;
}

.rules-checkbox {
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  letter-spacing: -0.2px;
  display: none;
}

.rules-link {
  color: #32AFC0;
}

.current-price {
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.2px;
}

.btn {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.2px;
  text-transform: none;
  padding: 8px 24px;
  gap: 8px;
}
</style>
