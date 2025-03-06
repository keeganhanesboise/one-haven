<template>
  <div>
    <HeroImg />
    <GamesAndEvents />
    <Menu menu-image="/img/cafe-menu.png" />
    <Menu menu-image="/img/bakery-menu.png" color="white" />
    <ImgCarousel :images="images"/>
    <ContactUs />
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