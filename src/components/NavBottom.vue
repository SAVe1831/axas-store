<template>
  <VContainer>
      <VBottomNavigation grow class="nav-bottom">
        <VBtn to="/" color="#32AFC0">
          <VIcon><VImg src="/nav-bottom-icon-home.svg" alt="Home"></VImg></VIcon>
        </VBtn>

        <VBtn to="/catalog-category" color="#32AFC0">
          <VIcon><VImg src="/nav-bottom-icon-catalog.svg" alt="Catalog"></VImg></VIcon>
        </VBtn>

        <VBtn to="/cart" color="#32AFC0">
          <VIcon><VImg src="/nav-bottom-icon-cart.svg" alt="Cart"></VImg></VIcon>
        </VBtn>

        <VBtn color="#32AFC0">
          <VIcon><VImg src="/nav-bottom-icon-user.svg" alt="User"></VImg></VIcon>
        </VBtn>
      </VBottomNavigation>
    </VContainer>
</template>

<script setup lang="ts">
import { VIcon } from 'vuetify/components';


</script>

<style scoped>
.nav-bottom {
  height: 48px !important;
}

img {
  width: 7.47vw;
  height: 7.47vw;
}
</style>
