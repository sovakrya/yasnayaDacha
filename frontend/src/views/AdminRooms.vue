<template>
  <div class="room-container">
    <div :room="room" v-for="room of rooms" :key="room.id" class="room-border room-item">
      {{ room }}

      <div class="buking-button-container">
        <button class="button-pensil">
          <IconPencil />
        </button>
        <button class="button-cross">
          <IconCross />
        </button>
      </div>
    </div>

    <div class="plus-button-container">
      <button class="plus-button" @click="roomDialog = true">
        <IconPlus />
      </button>

      <RoomDialog v-model:show="roomDialog" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconPlus from "../components/icons/IconPlus.vue";
import IconPencil from "../components/icons/IconPencil.vue";
import IconCross from "../components/icons/IconCross.vue";
import { getRooms } from "../services/booking";
import { ref } from "vue";
import RoomDialog from "../components/RoomDialog.vue";
import { type Room } from "../services/booking";

const rooms = ref<Room[]>([]);

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
</script>

<style scoped>
.room-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2em;
}

.room-border {
  background-color: rgb(32, 32, 32);
  box-shadow: 0 0 7px 0 rgb(14, 14, 14);
  border-radius: 5px;
}

.room-item {
  height: 3em;
  display: flex;
  justify-content: space-between;
}

.plus-button-container {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
}

.plus-button {
  background-color: rgb(34, 163, 30);
  cursor: pointer;
  border: none;
  box-shadow: 0 0 7px rgb(8, 22, 7);
  border-radius: 5px;
}

.plus-button:hover {
  background-color: rgb(116, 223, 113);
}

.plus-button:active {
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
  transform: translateY(4px);
}

.buking-button-container {
  display: flex;
  gap: 1em;
  margin: 5px;
}

.button-pensil {
  background-color: rgb(196, 156, 24);
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.button-pensil:hover {
  background-color: rgb(243, 218, 135);
}

.button-pensil:active {
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
  transform: translateY(4px);
}

.button-cross {
  background-color: rgb(177, 27, 27);
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.button-cross:hover {
  background-color: rgb(228, 110, 110);
}

.button-cross:active {
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
  transform: translateY(4px);
}
</style>
