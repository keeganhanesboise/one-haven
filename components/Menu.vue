<template>
  <SectionSlot id="menu" color="whitesmoke">
    <div class="menu-container">
      <div class="menu-img-container">
        <div class="menu">
          <img id="purpleMug" src="/public/img/purple-mug.svg" alt="" />
          <h2 class="menu-heading">Menu</h2>
          <img id="blueMug" src="/public/img/blue-mug.svg" alt="" />
        </div>
      </div>
    </div>
  </SectionSlot>
</template>

<style scoped>
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
  width: 100%;
  max-width: 800px;
  height: 1000px;
  background-color: white;
  position: relative;
}
.menu-heading {
  width: 100%;
  text-align: center;
}
</style>
<script setup lang="ts">
</script>