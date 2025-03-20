<template>
  <SectionSlot>
    <div class="contact-container">
      <div class="header-container">
        <h2>Contact Us</h2>
      </div>
      <div class="contact-content-container">
        <div class="map-container">
          <img id="googleMaps" src="/img/map-example.png" alt="" />
        </div>
        <div class="info-container">
          <div class="info-padding">
            <h3>Hours:</h3>
            <h3>Phone Number:</h3>
            <h3>Address:</h3>
          </div>
        </div>
      </div>
    </div>
  </SectionSlot>
</template>

<style scoped>
  h2 {
    color: white;
  }
  #googleMaps {
    width: 100%;
  }
  .contact-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
  }
  .contact-content-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    padding: 0;
  }
  .map-container, .info-container {
    width: calc(50% - 10px);
    max-width: 600px;
    height: auto;
    object-fit: cover;
  }
  .info-container {
    background-color: whitesmoke;
  }
  .info-padding {
    padding: 25px;
  }
  @media (max-width: 768px) {
    .contact-content-container {
      flex-direction: column;
    }
    .map-container, .info-container {
      width: auto;
    }
  }
</style>
<script setup lang="ts">
</script>