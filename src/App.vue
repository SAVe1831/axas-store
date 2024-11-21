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
import { ref } from 'vue';

const router = useRouter();

const drawer = ref(false);

</script>

<style lang="scss" scoped></style>
