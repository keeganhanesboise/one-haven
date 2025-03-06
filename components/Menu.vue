<template>
  <SectionSlot id="menu" color="whitesmoke">
    <div class="menu-container">
      <div class="menu-img-container">
        <div class="menu">
          <img id="purpleMug" src="/img/purple-mug.svg" alt="" />
          <img id="menuImg" class="menu-img" :src="menuImage" alt="" />
          <img id="blueMug" src="/img/blue-mug.svg" alt="" />
        </div>
      </div>
    </div>
  </SectionSlot>
</template>

<script setup lang="ts">
  defineProps<{
    menuImage: string;
  }>();
</script>

<style scoped>
#menuImg {
  width: 100%;
}
#purpleMug {
  rotate: -5deg;
  max-width: 150px;
  position: absolute;
  top: -25px;
  left: -75px;
}
#blueMug {
  rotate: 5deg;
  max-width: 150px;
  position: absolute;
  bottom: -25px;
  right: -75px;
}
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
  max-width: 800px;
  background-color: white;
}
</style>