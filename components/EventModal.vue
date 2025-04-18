<script setup lang="ts">
import { DateTime } from 'luxon';

import type { CalendarDisplayEvent } from '~/types/contentful';

defineProps<{
  events: CalendarDisplayEvent[] | undefined;
  isVisible: boolean;
}>();
</script>

<template>
  <Modal
    :is-visible="isVisible"
    modal-container-primary-class="modal-events-primary-container"
    modal-container-secondary-class="modal-events-secondary-container">
    <ul class="modal-scroll">
      <li v-for="event in events" :key="event.id">
        <img v-if="event.iconUrl" id="eventImg" alt="" :src="event.iconUrl" />
        <h2>{{ event.name }}</h2>
        <h3>
          {{
            DateTime.fromISO(event.startDate)
              .setZone('America/Denver')
              .toLocaleString(DateTime.DATE_FULL) +
            ' ' +
            event.startTime +
            ' - ' +
            event.endTime
          }}
        </h3>
        <p>{{ event.summary }}</p>
        <p v-html="event.description" />
      </li>
    </ul>
  </Modal>
</template>

<style scoped>
#eventImg {
  padding-top: 2em;
  width: 100%;
}
.modal-scroll {
  overflow-y: auto;
  flex-grow: 1;
}

ul li:not(:last-child) {
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  display: block;
}
</style>

<style>
.modal-events-primary-container {
  display: flex;
  justify-content: center;
  padding: 25px;
  width: 100%;
}

.modal-events-secondary-container {
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: scale-in 0.3s ease;
}
</style>
