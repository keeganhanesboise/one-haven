<template>
  <SectionSlot id="imgCarousel" color="white">
    <div class="carousel-container">
      <img id="prev" src="/img/prev-icon.png" alt="previous image slide"/>
      <ul class="img-list">
        <li class="img-container" v-for="image in images" :key="image">
          <img class="img" :src="image"  alt=""/>
        </li>
      </ul>
      <img id="next" src="/img/next-icon.png" alt="next image slide"/>
    </div>
  </SectionSlot>
</template>

<script setup lang="ts">
  defineProps<{
    images?: string[];
  }>();
</script>

<style scoped>
  #prev, #next {
    width: 75px;
    height: 75px;
    padding: 10px;
  }
  .carousel-container {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
  }
  .img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    padding: 0;
    list-style: none;
  }
  .img-container {
    flex: 1 1 calc(33.3333% - 10px);
    min-width: 200px;
  }
  .img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    #prev, #next {
      width: 50px;
      height: 50px;
    }
  }
  @media (max-width: 482px) {
    #prev, #next {
      width: 25px;
      height: 25px;
    }
  }
</style>