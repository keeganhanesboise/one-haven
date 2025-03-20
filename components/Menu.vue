<template>
  <SectionSlot>
    <div class="menu-container">
      <div class="menu-img-container">
        <div v-for="menu in menus" class="menu">
          <h1 class="sr-only">{{ menu.menuTitle }}</h1>
          <img :id="`${menu.id}menuImg`" class="menu-img" :src="menu.menuImage" alt="" />
        </div>
      </div>
    </div>
  </SectionSlot>
</template>

<script setup lang="ts">
  type Menu = {
    menuImage: string,
    menuTitle: string,
    id: string
  };

  defineProps<{
    menus?: Menu[];
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