<template>
  <div class="main-container">
    <img src="../components/icons/pic.jpg" class="room-img" />

    <div class="room-data-container">
      <div class="room-data-wrapper">
        <h3 class="room-name">{{ room.name }}</h3>
      </div>

      <span class="count-people-container">
        <img src="./icons/countPeople.svg" />

        до {{ room.numberOfPlaces }} мест
      </span>

      <div class="description">{{ room.description }}</div>

      <button class="button-select service-button" @click="emit('selected')">Выбрать</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Room } from "@/services/booking";

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
  gap: 14px;
  background-color: var(--color-bg-item);
  border-radius: 8px;
  box-shadow: 0 0 8px 0 var(--color-box-shadow);
}

.room-data-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  padding: 8px;
}

.count-people-container {
  display: flex;
  gap: 10px;
}

.room-img {
  border-radius: 4px;
  width: 609px;
  height: 609px;
}

.room-name {
  font-weight: bold;
}

.room-data-wrapper {
  display: flex;
  width: 100%;
  font-size: large;
  justify-content: center;
}

.button-select {
  width: 100px;
  height: 30px;
  background-color: var(--color-primary);
  border: none;
  color: var(--color-on-primary);
  cursor: pointer;
  height: 38px;
  width: 100px;
  font-weight: bold;
  font-size: medium;
  border-radius: 4px;
  align-self: flex-end;
}

.description {
  flex: 1 0;
}

.button-select:hover {
  background-color: var(--color-hover-button);
}
</style>
