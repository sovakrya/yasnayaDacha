<template>
  <div class="room-item-container room-item-border">
    <img src="../components/icons/pic.jpg" class="pic-container" />

    <div class="room-name-details">
      <span class="room-name">{{ props.room.name }}</span>

      <button class="button-details" @click="bookingDialog = true">
        <img src="./icons/arrowDetails.svg" />
      </button>

      <BookingDialog v-model:show="bookingDialog" :room="props.room" />
    </div>
    <div class="room-item-content-container">
      <span>до {{ props.room.numberOfPlaces }} мест</span>

      <span>цена</span>
    </div>

    <div class="booking-button">
      <button type="button" class="button-pick" @click="emit('pushed')">выбрать</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BookingDialog from "./BookingDialog.vue";
import type { Room } from "@/services/booking";

const bookingDialog = ref(false);

const props = defineProps<{
  room: Room;
}>();

const emit = defineEmits<{
  pushed: [];
}>();
</script>

<style scoped>
.room-item-container {
  display: flex;
  gap: 1em;
  flex-direction: column;
}

.room-item-border {
  background-color: var(--color-bg-item);
  box-shadow: 0 0 8px 0 var(--color-box-shadow);
  border-radius: 5px;
}

.room-item-border:hover {
  box-shadow: 0 0 16px 0 var(--color-box-shadow-hover);
}

.room-item-content-container {
  display: flex;
  padding: 0 10px 0 10px;
  justify-content: space-between;
}

.room-name-details {
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  color: var(--color-text);
}

.room-name {
  font-size: large;
  font-weight: bold;
}

.booking-button {
  display: flex;
  justify-content: flex-end;
  padding: 0 10px 10px;
}

.pic-container {
  border-radius: 5px;
}

.button-pick {
  background-color: var(--color-primary);
  border: none;
  border-radius: 4px;
  height: 28px;
  color: var(--color-on-primary);
  cursor: pointer;
  height: 38px;
  width: 100px;
  font-weight: bold;
  font-size: medium;
}

.button-pick:hover {
  background-color: var(--color-hover-button);
}

.button-details {
  height: 34px;
  width: 34px;
  border: solid 1px var(--color-item-border);
  background-color: var(--color-bg-item);
  border-radius: 50px;
}

.button-details:hover {
  background-color: rgb(235, 240, 234);
}
</style>
