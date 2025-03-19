<template>
  <section class="section-container-primary" :class="sectionBackgroundColor">
    <div class="section-container-secondary">
      <slot></slot>
    </div>
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
  .section-container-primary {
    padding: 50px;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 480px) {
    .section-container-primary {
      padding: 50px 25px;
    }
  }

  .section-container-secondary {
    max-width: 1600px;
    width: 100%;
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