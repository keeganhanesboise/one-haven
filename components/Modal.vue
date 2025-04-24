<script setup lang="ts">
defineProps<{
  isVisible: boolean;
  modalContainerPrimaryClass?: string;
  modalContainerSecondaryClass?: string;
}>();

const emit = defineEmits(['close']);

function closeModal(): void {
  emit('close');
}
</script>

<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="isVisible"
        class="backdrop"
        role="button"
        tabindex="0"
        @click.self="closeModal"
        @keydown.enter="closeModal">
        <div
          :class="modalContainerPrimaryClass"
          role="button"
          tabindex="0"
          @click.self="closeModal"
          @keydown.enter="closeModal">
          <div :class="modalContainerSecondaryClass">
            <div class="modal-content">
              <button class="close-button" @click="closeModal">×</button>
              <slot />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

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

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
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
  width: 32px;
  height: 32px;
  color: black;
  background: white;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

@media (max-width: 768px) {
  .close-button {
    width: 24px;
    height: 24px;
  }
}
</style>
