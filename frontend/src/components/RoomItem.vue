<template>
  <div class="room-item-container room-item-border">
    <img src="../components/icons/pic.jpg" class="pic-container" />

    <div class="room-description">{{ props.room.description }}</div>

    <div class="booking-button">
      <button type="button" @click="bookingDialog = true" class="button-pick">выбрать</button>

      <BookingDialog v-model:show="bookingDialog" :room="props.room" />
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
</script>

<style scoped>
.room-item-container {
  display: flex;
  gap: 1em;
  flex-direction: column;
}

.room-item-border {
  background-color: var(--color-bg-item);
  border: solid 1px rgb(207, 207, 207);
  border-radius: 5px;
  transition:
    transform ease 0.5s,
    box-shadow ease 0.5s;
}

.room-item-border:hover {
  box-shadow: 0 0 26px 0 rgb(153, 153, 153);
  transform: translateY(-5px);
}

.room-description {
  padding: 1em;
}

.booking-button {
  display: flex;
  justify-content: flex-end;
  padding: 1em;
}

.pic-container {
  border-radius: 5px;
}

.button-pick {
  background-color: var(--color-button);
  border: none;
  border-radius: 4px;
  height: 28px;
  color: var(--color-button-text);
  cursor: pointer;
  height: 38px;
  width: 100px;
  font-weight: bold;
  font-size: medium;
}

.button-pick:hover {
  background-color: var(--color-hover-button);
}
</style>
