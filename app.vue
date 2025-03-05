<template>
  <div>
    <HeroImg />
    <GamesAndEvents />
    <Menu />
    <ImgCarousel :images="images"/>
  </div>
</template>

<script setup lang="ts">
  const images = ref<string[]>([
    '/img/coffee-example.png',
    '/img/coffee-example.png',
    '/img/coffee-example.png',
    '/img/coffee-example.png',
    '/img/coffee-example.png',
    '/img/coffee-example.png',
  ]);
</script>