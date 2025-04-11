<template>
  <SectionSlot>
    <div class="menu-container">
      <div class="menu-img-container">
        <div v-for="menu in menus" class="menu">
          <img class="menu-img" :src="menu" alt="" />
        </div>
      </div>
    </div>
  </SectionSlot>
</template>

<script setup lang="ts">
defineProps<{
  menus?: string[];
}>();
</script>

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
  max-height: 1000px;
  max-width: 800px;
  background-color: white;
}
</style>
