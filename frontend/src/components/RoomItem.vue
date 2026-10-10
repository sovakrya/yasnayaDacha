<template>
  <div class="room-item-container room-item-border">
    <div class="room-image-wrapper">
      <img src="../components/icons/pic.jpg" class="pic-container" />
    </div>

    <div class="room-name-details">
      <span class="room-name">{{ props.room.name }}</span>

      <button class="button-details" @click="bookingDialog = true">
        <img src="./icons/arrowDetails.svg" />
      </button>
    </div>

    <div class="room-item-content-container">
      <div class="room-item-specs-wrapper">
        <span class="room-item-specs-container">
          <img src="./icons/countPeople.svg" class="places-icon" />
          x {{ props.room.numberOfPlaces }}
        </span>

        <span class="room-item-specs-container">
          <img src="./icons/SquareMeasument.svg" class="square-measument-icon" />
          м²
        </span>
      </div>

      <span class="price-box">
        <span class="price-box__from">от</span>
        <span class="price-box__current-price">цена</span>
        <span class="price-box__per-night">за ночь</span>
      </span>
    </div>

    <div class="booking-button">
      <button type="button" class="button-pick" @click="emit('pushed')">выбрать</button>
    </div>

    <BookingDialog v-model:show="bookingDialog" :room="props.room" />
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
  gap: 12px;
  flex-direction: column;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.room-item-border {
  background-color: var(--color-bg-item);
  box-shadow: 0 0 8px 0 var(--color-box-shadow);
  border: 1px solid var(--color-item-border);
  border-radius: 12px;
}

.room-item-border:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px -8px rgba(43, 38, 32, 0.22);
}

.room-image-wrapper {
  overflow: hidden;
}

.pic-container {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.room-item-container:hover .pic-container {
  transform: scale(1.05);
}

.room-name-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 16px;
  color: var(--color-text);
}

.room-name {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
}

.room-item-content-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 16px;
}

.room-item-specs-wrapper {
  display: flex;
  gap: 14px;
}

.room-item-specs-container {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgb(233 231 231);
  padding: 4px;
  border-radius: 4px;
}

.places-icon {
  width: 22px;
  height: 22px;
}

.square-measument-icon {
  width: 22px;
  height: 22px;
}

.price-box {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--on-surface-variant);
  font-weight: 700;
}

.price-box__from {
  font-size: 12px;
  line-height: 150%;
  font-weight: 400;
  padding: 0px 2px 1px 0px;
}

.price-box__current-price {
  font-size: 22px;
  line-height: 132%;
  font-weight: 800;
}

.price-box__per-night {
  font-size: 12px;
  line-height: 150%;
  font-weight: 400;
  color: rgb(128, 128, 128);
  padding-bottom: 1px;
}

.booking-button {
  display: flex;
  padding: 0 16px 16px;
}

.button-pick {
  background-color: var(--color-primary);
  border: none;
  border-radius: 8px;
  color: var(--color-on-primary);
  cursor: pointer;
  height: 38px;
  width: 100%;
  font-weight: bold;
  font-size: medium;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.button-pick:hover {
  background-color: var(--color-hover-button);
}

.button-pick:active {
  transform: translateY(1px);
  filter: brightness(0.95);
}

.button-pick:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.button-details {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  width: 34px;
  border: solid 1px var(--color-item-border);
  background-color: var(--color-bg-item);
  border-radius: 50px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.button-details:hover {
  background-color: var(--color-primary-container);
  border-color: var(--color-light-primary);
}
</style>
