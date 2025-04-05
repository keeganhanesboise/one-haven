<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div class="backdrop" v-if="isVisible" @click.self="closeModal">
        <div class="event-container-primary" @click.self="closeModal">
          <div class="event-container-secondary">
            <div class="modal-content">
              <button class="close-button" @click="closeModal">×</button>
              <ul class="modal-scroll">
                <li v-for="event in events">
                  <img id="eventImg" v-if="event.iconUrl" :src="event.iconUrl"  alt=""/>
                  <h2>{{ event.name }}</h2>
                  <h3>{{ new Date(event.startDate).toDateString() + ' ' + event.startTime + ' - ' + event.endTime }}</h3>
                  <p>{{ event.summary }}</p>
                  <p v-html="event.description" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script setup lang="ts">

import type {CalendarDisplayEvent} from "~/types/contentful";

defineProps<{
  events: CalendarDisplayEvent[] | undefined,
  isVisible: boolean
}>();

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}

#eventImg {
  padding-top: 2em;
  width: 100%;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.event-container-primary {
  display: flex;
  justify-content: center;
  padding: 25px;
  width: 100%;
}

.event-container-secondary {
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

.modal-content {
  display: flex;
  flex-direction: column;
  height: 100%;
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

@keyframes scale-in {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
}
</style>