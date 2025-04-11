<template>
  <Modal
    :isVisible="isVisible"
    modal-container-secondary-class="modal-img-container">
    <img :src="image" alt="" />
  </Modal>
</template>
<script setup lang="ts">
defineProps<{
  image: string;
  isVisible: boolean;
}>();
</script>
<style>
.modal-img-container {
  background-color: #fff;
  border-radius: 12px;
  width: 65%;
  max-width: 1000px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: scale-in 0.3s ease;
}
</style>
