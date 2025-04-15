<script setup lang="ts">
defineProps<{
  aboutUsInfo: string;
  aboutUsImage: string;
}>();
</script>

<template>
  <SectionSlot>
    <div class="about-us-container">
      <div class="about-us-info-container">
        <div class="about-us-info-text">
          <h2>About Us</h2>
          <p v-html="aboutUsInfo" />
        </div>
        <div class="about-us-info-img">
          <img id="aboutUs" alt="" :src="aboutUsImage" />
        </div>
      </div>
    </div>
  </SectionSlot>
</template>

<style scoped>
#aboutUs {
  width: 100%;
  border-radius: 12px;
}
h2 {
  color: white;
  margin-top: 0;
}
p {
  color: white;
}
.about-us-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 50px;
}
.about-us-info-container {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 0;
  gap: 20px;
}
.about-us-info-img {
  width: 40%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.about-us-info-text {
  width: 60%;
}

@media (max-width: 768px) {
  .about-us-info-container {
    flex-direction: column;
    align-items: center;
  }
  .about-us-info-img,
  .about-us-info-text {
    width: 100%;
  }
  .about-us-info-img {
    max-width: 500px;
  }
}
</style>
