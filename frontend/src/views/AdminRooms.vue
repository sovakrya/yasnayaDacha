<template>
  <div class="admin-room-container">
    <div>
      <input v-model="roomInput" />
      <button>поиск</button>
    </div>
    <div :room="room" v-for="room of rooms" :key="room.id" class="room-border room-item">
      <img src="../components/icons/pic.jpg" height="400px" width="400px" />

      <div class="room-item-content">
        <div>Имя: {{ room.name }}</div>

        <div>Количество мест: {{ room.numberOfPlaces }}</div>

        <div>Описание: {{ room.description }}</div>

        <div class="booking-button-container">
          <button class="admin-rooms-edit">Редактировать</button>
          <button class="admin-rooms-delete">Удалить</button>
        </div>
      </div>
    </div>

    <div class="admin-room-add-box">
      <button @click="roomDialog = true" class="admin-room-add">Добавить</button>

      <RoomDialog v-model:show="roomDialog" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconPlus from "../components/icons/IconPlus.vue";
import IconPencil from "../components/icons/IconPencil.vue";
import IconCross from "../components/icons/IconCross.vue";
import { getRooms } from "../services/booking";
import { ref, watch } from "vue";
import RoomDialog from "../components/RoomDialog.vue";
import { type Room } from "../services/booking";

const rooms = ref<Room[]>([]);
const roomInput = ref("");

const roomDialog = ref(false);

function fetchRooms() {
  getRooms()
    .then((roomsFromFetch) => {
      rooms.value = roomsFromFetch;
    })
    .catch((error) => {
      console.error(error.message);
    });
}

fetchRooms();

watch(roomInput, () => {});
</script>

<style scoped>
.admin-room-container {
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 10px;
  flex: 1 0;
}

.room-item {
  display: flex;
  gap: 26px;
  background-color: rgb(217, 224, 220);
  border-radius: 5px;
}

.room-item-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 14px;
}

.booking-button-container {
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 8px;
}

.admin-rooms-delete {
  height: 34px;
  width: 76px;
  border: none;
  background-color: rgb(150, 50, 50);
  color: var(--color-on-primary);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}

.admin-rooms-delete:hover {
  background-color: rgb(133, 27, 27);
}

.admin-rooms-edit {
  height: 34px;
  width: 126px;
  border: none;
  background-color: rgb(206, 138, 37);
  color: var(--color-on-primary);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}

.admin-rooms-edit:hover {
  background-color: rgb(189, 120, 17);
}

.admin-room-add-box {
  display: flex;
  justify-content: flex-end;
}

.admin-room-add {
  height: 34px;
  width: 126px;
  border: none;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
}
</style>
