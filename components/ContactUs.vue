<script setup lang="ts">
import { DateTime } from 'luxon';

import type { DayHoursEntry } from '~/types/contentful';

defineProps<{
  storeHours: DayHoursEntry[] | null;
}>();

const currentDate = ref<number | undefined>();
const discordIcon = ref<string>('/img/social-icons/Discord-Symbol-White.svg');
const instagramIcon = ref<string>(
  '/img/social-icons/Instagram_Glyph_White.svg'
);

const setDiscordIcon = (src: string) => {
  discordIcon.value = src;
};

const setInstagramIcon = (src: string) => {
  instagramIcon.value = src;
};

onMounted(async () => {
  const today = DateTime.local();
  currentDate.value = today.year;
});
</script>

<template>
  <SectionSlot>
    <div class="contact-container">
      <div class="header-container">
        <h2>Come Visit!</h2>
      </div>
      <div class="contact-content-container">
        <div class="map-container">
          <iframe
            id="googleMaps"
            allow="fullscreen"
            height="450"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.0396103642324!2d-104.7196247226171!3d38.91432037172041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87134931a0d1dbad%3A0xcd57e855790dcef5!2sOne%20Haven!5e0!3m2!1sen!2sus!4v1743550471671!5m2!1sen!2sus"
            title="map" />
          <ContactFooter
            :current-date="currentDate"
            custom-class="is-displayed-desktop-flex-l margin-top-10px"
            :discord-icon="discordIcon"
            :instagram-icon="instagramIcon"
            :set-discord-icon="setDiscordIcon"
            :set-instagram-icon="setInstagramIcon" />
        </div>
        <div class="info-container">
          <div class="address-container">
            <a
              href="https://www.google.com/maps/dir//One+Haven+5956+Stetson+Hills+Blvd+Colorado+Springs,+CO+80923/@38.9143204,-104.7170498,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x87134931a0d1dbad:0xcd57e855790dcef5!2m2!1d-104.7170498!2d38.9143204?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank">
              <address>
                One Haven 5956
                <br />
                Stetson Hills Blvd,
                <br />
                Colorado Springs, CO 80923
              </address>
            </a>
          </div>
          <div v-if="storeHours" class="hours-container">
            <ul
              v-for="hours in storeHours"
              :key="hours.sys.id"
              class="hours-list">
              <li>
                {{ hours.fields.day }}
                <span v-if="hours.fields.closed">Closed</span>
                <span v-else class="hours">
                  {{ hours.fields.openTime + ' - ' + hours.fields.closeTime }}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <ContactFooter
          :current-date="currentDate"
          custom-class="is-displayed-mobile-flex-l"
          :discord-icon="discordIcon"
          :instagram-icon="instagramIcon"
          :set-discord-icon="setDiscordIcon"
          :set-instagram-icon="setInstagramIcon" />
      </div>
    </div>
  </SectionSlot>
</template>

<style scoped>
#googleMaps {
  border: 0;
  width: 100%;
}
address {
  font-style: normal;
  font-family: 'lato', serif;
  color: #b388ff;
}
h2,
p,
a {
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
  justify-content: space-between;
  gap: 10px;
  padding: 0;
}
.map-container,
.info-container {
  width: calc(50% - 10px);
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
.hours-container {
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
    gap: 15px;
  }
  .map-container,
  .info-container {
    width: 100%;
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
