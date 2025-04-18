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
  separatorTop: {
    type: Boolean,
    default: false
  },
  separatorBottom: {
    type: Boolean,
    default: false
  },
  separatorColor: {
    type: String,
    default: 'white'
  },
  maxWidthSize: {
    type: String,
    default: 'large'
  }
});
const sectionBackgroundPrimary = computed(
  () => `section-background-${props.colorPrimary}`
);
const sectionBackgroundSecondary = computed(
  () => `section-background-${props.colorSecondary}`
);
const sectionSecondaryMaxWidth = computed(() => props.maxWidthSize);
</script>

<template>
  <section>
    <svg
      v-if="separatorTop"
      id="sectionSeparator"
      class="section-separator"
      :class="sectionBackgroundSecondary"
      :fill="separatorColor"
      preserveAspectRatio="none"
      viewBox="0 0 900 50"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M709.04,40l-187.27-27.51c-46.63-8.07-97.51-8.61-144.84-1.53h0C252.74,29.55,118.61,25.58,0,0v60h900v-30c-59.05,19.06-132.53,18.06-190.96,10Z" />
    </svg>
    <div class="section-container-primary" :class="sectionBackgroundPrimary">
      <div
        class="section-container-secondary"
        :class="sectionSecondaryMaxWidth">
        <slot />
      </div>
    </div>
    <svg
      v-if="separatorBottom"
      id="sectionSeparatorBottom"
      class="section-separator"
      :class="sectionBackgroundSecondary"
      :fill="separatorColor"
      preserveAspectRatio="none"
      viewBox="0 0 900 50"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M900,0v-10H0V0c118.61,25.58,252.74,29.55,376.92,10.97h0c47.33-7.08,98.21-6.54,144.84,1.53l187.27,32.42c61.29,10.61,131.91,4.15,190.96-14.91V0Z" />
    </svg>
  </section>
</template>

<style scoped>
.section-container-primary {
  padding: 100px;
  display: flex;
  justify-content: center;
  margin: 0;
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
  display: block;
  width: 100%;
  height: 8vw;
  line-height: 0;
  padding: 0;
  overflow: initial;
  border: none;
  background: none;
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
