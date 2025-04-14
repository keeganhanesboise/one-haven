<script setup lang="ts">
defineProps<{
  menus?: string[];
}>();
</script>

<template>
  <SectionSlot>
    <div class="menu-container">
      <div class="menu-img-container">
        <div v-for="menu in menus" :key="menu" class="menu">
          <img alt="" class="menu-img" :src="menu" />
        </div>
      </div>
    </div>
  </SectionSlot>
</template>

<style scoped>
.menu-container {
  display: flex;
  justify-content: center;
  height: 100%;
}
.menu-img-container {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 45px;
  flex-wrap: wrap;
}
.menu {
  position: relative;
}
.menu-img {
  width: 100%;
  max-width: 600px;
  background-color: white;
}
</style>
