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
    '/img/carousel/cafe-lounge.jpg',
    '/img/carousel/coffee-bar.jpg',
    '/img/carousel/espresso-machine.jpg',
    '/img/carousel/cafe-food.jpg',
    '/img/carousel/cafe-lounge-2.jpg',
    '/img/carousel/gaming-section.jpg',
    '/img/carousel/board-games.jpg',
    '/img/carousel/cafe-food-2.jpg',
    '/img/carousel/hold-fast-coffee.jpg',
    '/img/carousel/cafe-lounge-3.jpg',
    '/img/carousel/cafe-food-3.jpg',
  ]);
</script>