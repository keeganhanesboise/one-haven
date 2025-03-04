<template>
  <section class="section-container" :class="sectionBackgroundColor">
    <slot></slot>
  </section>
</template>

<script setup>
  const props = defineProps({
    color: {
      type: String,
      default: 'white'
    }
  });
  const sectionBackgroundColor = computed(() => `section-background-${props.color}`)
</script>

<style scoped>
  .section-container {
    height: clamp(600px, 100vh, 1200px);
    padding: 50px;
  }

  @media (max-width: 480px) {
    .section-container {
      padding: 50px 25px;
    }
  }

  .section-background-white {
    background-color: white;
  }
  .section-background-whitesmoke {
    background-color: whitesmoke;
  }
</style>