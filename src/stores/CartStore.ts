import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart',  () => {
    const cart = ref([])

    const addToCart = (product) => {
      const existingProduct = cart.value.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.value.push({ ...product, quantity: 1 });
      }
    };

    const removeFromCart = (product) => {
      const index = cart.value.indexOf(product)
      if (index > -1) {
        cart.value.splice(index, 1)
      }
    }
    return { cart, addToCart, removeFromCart }
  },
  {
    persist: true,
  },
)
