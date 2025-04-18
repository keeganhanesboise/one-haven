<script setup lang="ts">
defineProps<{
  image: string;
  isVisible: boolean;
}>();
</script>

<template>
  <Modal
    :is-visible="isVisible"
    modal-container-primary-class="modal-img-primary-container"
    modal-container-secondary-class="modal-img-secondary-container">
    <img class="modal-img" alt="" :src="image" />
  </Modal>
</template>

<style>
.modal-img-primary-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  height: 100%;
  width: 100%;
}

.modal-img-secondary-container {
  border-radius: 12px;
  max-width: 90vw;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: scale-in 0.3s ease;
  display: inline-block;
}

.modal-img {
  display: block;
  width: auto;
  height: auto;
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
}
</style>
