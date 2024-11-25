<template>
    <div>
        <Input placeholder-text="Поиск" bg-color="white" />
        <VContainer class="pt-0">
            <div v-for="category in categories" :key="category.id ?? 'default-key'">
                <VCard @click="$router.push(`/catalog-category/${category.id}`)" elevation="0" width="100%" height="19.2vw" class="category-image-container d-flex justify-start align-center ga-4">
                    <div v-if="category.thumbnail?.includes('http')" class="image-container d-flex fill-height align-center justify-center">
                        <img :src="category.thumbnail" alt="Category Image" class="category-image" />
                    </div>
                    <div class="category-name-container d-flex align-center">
                        <p class="category-name">{{ category.name }}</p>
                    </div>
                </VCard>
            </div>
        </VContainer>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCategoriesStore } from '@/stores/CategoriesStore';
import Input from '../components/Input.vue';

const categoriesStore = useCategoriesStore();

const categories = ref([]);

onMounted(async () => {
    await categoriesStore.getCategories();
    categories.value = categoriesStore.categories;
});

</script>

<style scoped>
.category-image-container {
    background-color: #F3F5F9;
}

.category-image {
    width: 15vw;
    height: 15vw;
}

.category-name-container {
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #00000016;
}

.category-name {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.2px;
}
</style>
