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
          <div class="address-container">
            <address>
              One Haven<br>
              5956 Stetson Hills Blvd,<br>
              Colorado Springs, CO 80923
            </address>
          </div>
          <div class="hours-container">
            <ul class="hours-list">
              <li>Monday: <span>8AM-10PM</span></li>
              <li>Tuesday: <span>8AM-3PM</span></li>
              <li>Wednesday: <span>8AM-10PM</span></li>
              <li>Thursday: <span>8AM-10PM</span></li>
              <li>Friday: <span>8AM-10PM</span></li>
              <li>Saturday: <span>8AM-10PM</span></li>
              <li>Sunday: <span>Closed</span></li>
            </ul>
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
    display: flex;
    background-color: whitesmoke;
    justify-content: space-between;
  }
  .address-container {
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
  .hours-list {
    list-style: none;
    padding: 25px;
    margin: 0;
  }
  .hours-list > li {
    display: flex;
    justify-content: space-between;
  }
</style>
<script setup lang="ts">
</script>