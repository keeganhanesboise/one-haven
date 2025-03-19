<template>
  <SectionSlot :id="id" color-primary="whitesmoke">
    <div class="menu-container">
      <div class="menu-img-container">
        <div class="menu">
          <h1 class="sr-only">{{ menuTitle }}</h1>
          <img :id="`${id}menuImg`" class="menu-img" :src="menuImage" alt="" />
        </div>
      </div>
    </div>
  </SectionSlot>
</template>

<script setup lang="ts">
  defineProps<{
    menuImage: string,
    menuTitle: string,
    id: string
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