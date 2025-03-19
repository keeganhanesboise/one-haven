<template>
  <SectionSlot id="imgCarousel" color-primary="whitesmoke" v-if="images && images.length > 0">
    <h1 class="sr-only">One Haven Cafe & Game Shop Images</h1>
    <div class="carousel-container">
      <button @click="prevSlide">
        <img id="prev" src="/img/prev-icon.png" alt="previous image slide"/>
      </button>
      <ul class="img-list">
        <li class="img-container" v-for="image in currentImages" :key="image">
          <img @click="openImg(image)" v-if="image" class="img" :src="image"  alt=""/>
          <div v-else></div>
        </li>
      </ul>
      <button @click="nextSlide">
        <img id="next" src="/img/next-icon.png" alt="next image slide"/>
      </button>
    </div>
    <ImgModal :isVisible="showModal" @close="closeImg" :image="openedImg"/>
  </SectionSlot>
</template>

<script setup lang="ts">
  const props = defineProps<{
    images?: string[];
  }>();

  const slideSize = 6;

  const startIndex = ref(0);
  const showModal = ref(false);
  const openedImg = ref('');

  const currentImages = computed(() => {
    if (props.images && props.images.length > 0) {
      const endIndex = startIndex.value + slideSize;
      const safeEndIndex = Math.min(endIndex, props.images?.length);
      const images = props.images.slice(startIndex.value, safeEndIndex);

      const placeholdersNeeded = 6 - images.length;
      const placeholders = Array(placeholdersNeeded).fill(null);
      return [...images, ...placeholders];
    }
    return [];
  })

  function nextSlide(): void {
    if (props.images && props.images.length > 6) {
      const newIndex = startIndex.value + slideSize;
      if (newIndex >= props.images.length) {
        startIndex.value = 0;
      } else {
        startIndex.value = newIndex;
      }
    }
  }

  function prevSlide(): void {
    if (props.images && props.images.length > 6) {
      const newIndex = startIndex.value - slideSize;
      if (newIndex < 0) {
        startIndex.value = Math.floor(props.images.length / slideSize) * slideSize;
      } else {
        startIndex.value = newIndex;
      }
    }
  }

  function openImg(url: string): void {
    openedImg.value = url;
    showModal.value = true;
  }

  function closeImg(): void {
    showModal.value = false;
  }
</script>

<style scoped>
  button {
    all: unset;
    cursor: pointer;
  }
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
    aspect-ratio: 4 / 3;
    overflow: hidden;
    min-width: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }
  .img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .3s ease;
  }
  .img:hover {
    transform: translate(-50%, -50%) scale(1.05);
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