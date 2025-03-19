<template>
  <img v-if="sectionSeparatorSvg" class="section-separator" :class="sectionBackgroundSecondary" :src="sectionSeparatorSvg" alt="" />
  <section class="section-container-primary" :class="sectionBackgroundPrimary">
    <div class="section-container-secondary">
      <slot></slot>
    </div>
  </section>
  <img v-if="sectionSeparatorSvgBottom" class="section-separator"  :class="sectionBackgroundSecondary" :src="sectionSeparatorSvgBottom" alt="" />
</template>

<script setup>
  const props = defineProps({
    colorPrimary: {
      type: String,
      default: 'white'
    },
    colorSecondary: {
      type: String,
      default: 'white'
    },
    sectionSeparatorSvg: {
      type: String,
      default: ''
    },
    sectionSeparatorSvgBottom: {
      type: String,
      default: ''
    }
  });
  const sectionBackgroundPrimary = computed(() => `section-background-${props.colorPrimary}`)
  const sectionBackgroundSecondary = computed(() => `section-background-${props.colorSecondary}`)
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