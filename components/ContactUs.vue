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
              <li>Monday: <span>8AM - 10PM</span></li>
              <li>Tuesday: <span>8AM - 3PM</span></li>
              <li>Wednesday: <span>8AM - 10PM</span></li>
              <li>Thursday: <span>8AM - 10PM</span></li>
              <li>Friday: <span>8AM - 10PM</span></li>
              <li>Saturday: <span>8AM - 10PM</span></li>
              <li>Sunday: <span>Closed</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </SectionSlot>
</template>

<style scoped>
  address {
    font-style: normal;
    font-family: "Baskerville Old Face", serif;
  }
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
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    font-size: 18px;
  }
  .address-container {
    padding: 10px;
    color: white;
  }
  .hours-container {
    padding: 10px;
    color: white;
    width: 250px;
  }
  .hours-list {
    list-style: none;
    margin: 0;
  }
  .hours-list > li {
    display: flex;
    justify-content: space-between;
  }
  @media (max-width: 768px) {
    .contact-content-container {
      flex-direction: column;
    }
    .map-container, .info-container {
      width: auto;
    }
  }
  @media (max-width: 480px) {
    .address-container {
      width: 100%;
    }
    .hours-container {
      width: 100%;
    }
    .info-container {
      font-size: 14px;
    }
  }
</style>
<script setup lang="ts">
</script>