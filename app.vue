<template>
  <div>
    <HeroImg id="heroImg" color-primary="whitesmoke" />
    <GamesAndEvents id="gamesAndEvents" color-primary="lilac" color-secondary="whitesmoke" section-separator-svg="/img/section-curve-lilac.svg" section-separator-svg-bottom="/img/section-curve-lilac-bottom.svg" />
    <Menu :menus="menus" color-primary="whitesmoke" />
    <ImgCarousel id="imgCarousel" :images="images" colorPrimary="white" colorSecondary="whitesmoke" section-separator-svg="/img/section-curve-white.svg" />
    <ContactUs id="contactUs" colorPrimary="dragonfly" colorSecondary="white" section-separator-svg="/img/section-curve-dragonfly.svg" />
  </div>
</template>

<script setup lang="ts">
  const menus = ref([
    { id: 'cafe-menu', menuTitle: 'Cafe Menu', menuImage: '/img/cafe-menu.png' },
    { id: 'bakery-menu', menuTitle: 'Bakery Menu', menuImage: '/img/bakery-menu.png' }
  ])
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