<template>
  <Modal :isVisible="isVisible">
    <img :src="image" alt="" />
  </Modal>
</template>
<script setup lang="ts">
defineProps<{
  image: string,
  isVisible: boolean
}>();
</script>