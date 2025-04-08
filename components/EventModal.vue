<template>
  <Modal :isVisible="isVisible">
    <ul class="modal-scroll">
      <li v-for="event in events">
        <img id="eventImg" v-if="event.iconUrl" :src="event.iconUrl"  alt=""/>
        <h2>{{ event.name }}</h2>
        <h3>{{ new Date(event.startDate).toDateString() + ' ' + event.startTime + ' - ' + event.endTime }}</h3>
        <p>{{ event.summary }}</p>
        <p v-html="event.description" />
      </li>
    </ul>
  </Modal>
</template>
<script setup lang="ts">
import type {CalendarDisplayEvent} from "~/types/contentful";

defineProps<{
  events: CalendarDisplayEvent[] | undefined,
  isVisible: boolean
}>();
</script>

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