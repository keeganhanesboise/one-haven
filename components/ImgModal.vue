<template>
  <teleport to="body">
    <div v-if="isVisible" class="backdrop" @click="closeModal">
      <img :src="image" alt="" />
    </div>
  </teleport>
</template>

<script setup lang="ts">
  defineProps<{
    image: string,
    isVisible: boolean
  }>();

  const emit = defineEmits(['close']);

  function closeModal() {
    emit('close');
  }
</script>

<style scoped>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
</style>