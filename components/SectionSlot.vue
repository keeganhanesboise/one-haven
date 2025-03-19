<template>
  <section class="section-container" :class="sectionBackgroundColor">
    <slot></slot>
  </section>
  <img v-if="sectionSeparatorSvg" class="section-separator"  :class="sectionBackgroundColor" :src="sectionSeparatorSvg" alt="" />
</template>

<script setup>
  const props = defineProps({
    color: {
      type: String,
      default: 'white'
    },
    sectionSeparatorSvg: {
      type: String,
      default: ''
    }
  });
  const sectionBackgroundColor = computed(() => `section-background-${props.color}`)
</script>

<style scoped>
  .section-container {
    padding: 50px;
  }

  @media (max-width: 480px) {
    .section-container {
      padding: 50px 25px;
    }
  }

  .section-separator {
    display: block;
  }

  .section-background-white {
    background-color: white;
  }
  .section-background-whitesmoke {
    background-color: whitesmoke;
  }
  .section-background-lilac {
    background-color: #6b667a;
  }
</style>