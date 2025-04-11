<template>
  <section>
    <img v-if="sectionSeparatorSvg" class="section-separator" :class="sectionBackgroundSecondary" :src="sectionSeparatorSvg" alt="" />
    <div class="section-container-primary" :class="sectionBackgroundPrimary">
      <div class="section-container-secondary" :class="sectionSecondaryMaxWidth">
        <slot></slot>
      </div>
    </div>
    <img v-if="sectionSeparatorSvgBottom" class="section-separator"  :class="sectionBackgroundSecondary" :src="sectionSeparatorSvgBottom" alt="" />
  </section>
</template>

<script setup lang="ts">
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
    },
    maxWidthSize: {
      type: String,
      default: 'large'
    }
  });
  const sectionBackgroundPrimary = computed(() => `section-background-${props.colorPrimary}`)
  const sectionBackgroundSecondary = computed(() => `section-background-${props.colorSecondary}`)
  const sectionSecondaryMaxWidth = computed(() => props.maxWidthSize);
</script>

<style scoped>
  .section-container-primary {
    padding: 100px;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 480px) {
    .section-container-primary {
      padding: 50px 25px;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    .section-container-primary {
      padding: 50px;
    }
  }

  .section-container-secondary {
    width: 100%;
  }

  .small {
    max-width: 800px;
  }

  .medium {
    max-width: 1200px;
  }

  .large {
    max-width: 1600px;
  }

  .section-separator {
    width: 100%;
    display: block;
    height: 8vw;
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
  .section-background-dragonfly {
    background-color: #104241;
  }
  .section-background-cranberry {
    background-color: #a63d40;
  }
</style>