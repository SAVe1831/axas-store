<template>
  <VBottom-navigation grow class="nav-bottom">
    <VBtn value="Home" base-color="white">
      <VIcon><img src="/nav-bottom-icon-home.svg" alt="Home"></VIcon>
    </VBtn>

    <VBtn value="Catalog" base-color="white">
      <VIcon><img src="/nav-bottom-icon-catalog.svg" alt="Catalog"></VIcon>
    </VBtn>

    <VBtn value="Cart" base-color="white">
      <VIcon><img src="/nav-bottom-icon-cart.svg" alt="Cart"></VIcon>
    </VBtn>

    <VBtn value="User" base-color="white">
      <VIcon><img src="/nav-bottom-icon-user.svg" alt="User"></VIcon>
    </VBtn>
  </VBottom-navigation>
</template>

<script setup lang="ts">

</script>

<style scoped>
.nav-bottom {
  height: 12.8vw !important;
}
img {
  width: 7.47vw;
  height: 7.47vw;
}
</style>
