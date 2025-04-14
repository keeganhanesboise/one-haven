<script setup lang="ts">
import type { DayHoursEntry } from '~/types/contentful';

defineProps<{
  address: string;
  storeHours: DayHoursEntry[] | null;
}>();
</script>

<template>
  <SectionSlot>
    <div class="contact-container">
      <div class="header-container">
        <h2>Contact Us</h2>
      </div>
      <div class="contact-content-container">
        <div class="map-container">
          <iframe
            allow="fullscreen"
            height="450"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin allow-popups"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.0396103642324!2d-104.7196247226171!3d38.91432037172041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87134931a0d1dbad%3A0xcd57e855790dcef5!2sOne%20Haven!5e0!3m2!1sen!2sus!4v1743550471671!5m2!1sen!2sus"
            style="border: 0"
            title="map"
            width="100%" />
        </div>
        <div class="info-container">
          <div class="address-container">
            <address v-html="address" />
          </div>
          <div v-if="storeHours" class="hours-container">
            <ul
              v-for="hours in storeHours"
              :key="hours.sys.id"
              class="hours-list">
              <li>
                {{ hours.fields.day }}
                <span v-if="hours.fields.closed">Closed</span>
                <span v-else>
                  {{ hours.fields.openTime + ' - ' + hours.fields.closeTime }}
                </span>
              </li>
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
  font-family: 'Baskerville Old Face', serif;
}
h2 {
  color: white;
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
.map-container,
.info-container {
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
  .map-container,
  .info-container {
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
