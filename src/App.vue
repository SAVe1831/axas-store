<template>
  <VApp>
    <VMain>
      <RouterView />
      <NavBottom />
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import NavBottom from './components/NavBottom.vue';

const router = useRouter();

</script>

<style lang="scss" scoped></style>
