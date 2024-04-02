<template>
  <div class="main-container">
    <img src="../components/icons/pic.jpg" class="room-img" />

    <div class="room-data-container">
      <div class="room-data-wrapper">
        <h3>{{ room.name }}</h3>

        <button @click="bookingDialog = true" class="service-button">Подробнее</button>
        <BookingDialog v-model:show="bookingDialog" :room="room" />
      </div>

      <div class="description">{{ room.description }}</div>

      <button class="button-select service-button" @click="emit('selected')">Выбрать</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BookingDialog from "./BookingDialog.vue";
import type { Room } from "@/services/booking";
import { ref } from "vue";

const bookingDialog = ref(false);

const room = defineModel<Room>("room", {
  required: true,
});

const emit = defineEmits<{
  selected: [];
}>();
</script>

<style scoped>
.main-container {
  display: flex;
  gap: 8px;
  background-color: var(--color-bg-item);
  border-radius: 8px;

  box-shadow: 0 0 8px 0 var(--color-box-shadow);
}

.room-data-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  padding: 8px;
}

.room-img {
  border-radius: 4px;
  width: 609px;
  height: 609px;
}

.room-data-wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.button-select {
  align-self: flex-end;
}

.description {
  flex: 1 0;
}

.service-button {
  width: 100px;
  height: 30px;
  background-color: var(--color-button);
  border: none;
  color: var(--color-text);
  border-radius: 4px;
}

.service-button:hover {
  background-color: var(--color-hover-button);
}
</style>
