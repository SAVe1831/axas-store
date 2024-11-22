<template>
  <VContainer>
    <v-text-field :placeholder="placeholderText" variant="plain" :bg-color="bgColor" hide-details="auto" rounded="lg" density="compact" class="p-0"><img class="ml-3 mr-2" src="/search-icon.svg" alt="Search"></v-text-field>
  </VContainer>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  placeholderText: string,
  bgColor: string
}>();

</script>

<style lang="scss" scoped>

</style>
