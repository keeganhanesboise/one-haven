<script setup lang="ts">
const props = defineProps<{
  images?: string[];
}>();

const slideSize = 6;

const startIndex = ref(0);
const showModal = ref(false);
const openedImg = ref('');
const touchStartX = ref(0);
const touchEndX = ref(0);

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
});

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
      startIndex.value =
        Math.floor(props.images.length / slideSize) * slideSize;
    } else {
      startIndex.value = newIndex;
    }
  }
}

function startTouch(e: TouchEvent): void {
  touchStartX.value = e.changedTouches[0].screenX;
}

function touchEnd(e: TouchEvent): void {
  touchEndX.value = e.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe(): void {
  const diff = touchStartX.value - touchEndX.value;
  if (diff > 50) {
    nextSlide();
  } else if (diff < -50) {
    prevSlide();
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

<template>
  <SectionSlot v-if="images && images.length > 0">
    <h1 class="sr-only">One Haven Cafe & Game Shop Images</h1>
    <div
      class="carousel-container"
      @touchend="touchEnd"
      @touchstart="startTouch">
      <button @click="prevSlide">
        <img
          alt="previous image slide"
          class="navigation-button"
          src="/img/prev-icon.svg" />
      </button>
      <ul class="img-list">
        <li v-for="image in currentImages" :key="image" class="img-container">
          <img
            v-if="image"
            alt=""
            class="img"
            role="button"
            :src="image"
            tabindex="0"
            @click="openImg(image)"
            @keydown.enter="openImg(image)" />
          <div v-else />
        </li>
      </ul>
      <button @click="nextSlide">
        <img
          alt="next image slide"
          class="navigation-button"
          src="/img/next-icon.svg" />
      </button>
    </div>
    <ImgModal :image="openedImg" :is-visible="showModal" @close="closeImg" />
  </SectionSlot>
</template>

<style scoped>
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
  transition: transform 0.3s ease;
  cursor: pointer;
}
.img:hover {
  transform: translate(-50%, -50%) scale(1.05);
}
@media (max-width: 767px) {
  .img-container {
    min-width: 130px;
  }
}
@media (max-width: 767px) {
  .navigation-button {
    display: none;
  }
}
</style>
