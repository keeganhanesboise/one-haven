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
        d="M709,40l-187.3-27.5c-46.6-8.1-97.5-8.6-144.8-1.5h0C252.7,29.5,118.6,25.6,0,0v50h900v-30c-59.1,19.1-132.5,28.1-191,20Z" />
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
        d="M376.9,11h0c47.3-7.1,98.2-6.5,144.8,1.5l187.3,32.4c61.3,10.6,131.9,4.1,191-14.9V0H0c118.6,25.6,252.7,29.5,376.9,11Z" />
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
  border: none;
  background: none;
  margin-bottom: -1px;
  margin-top: -1px;
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
