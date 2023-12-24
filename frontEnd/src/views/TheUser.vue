<template>
  <search>
    <form class="filter-container" @submit.prevent>
      <div class="boking-filter-container">
        <h1>Бронирование домиков и комнат</h1>

        <div class="boking-search">
          <div>
            <label for="startDate">Заезд</label>
            <input id="startDate" />
          </div>

          <div>
            <label for="endDate"> Выезд</label>
            <input id="endDate" />
          </div>

          <div>
            <BookingPopover />
          </div>

          <button>Найти</button>
        </div>

        <input type="search" v-model="filter" class="input-filter" />
      </div>
    </form>
  </search>

  <div class="room-item-main">
    <RoomItem :room="room" v-for="room of filteredRooms" :key="room.id" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getRooms } from '../services/booking'
import RoomItem from '../components/RoomItem.vue'
import BookingPopover from '../components/BookingPopover.vue'

const rooms = ref([])

function fetchRooms() {
  getRooms()
    .then((roomsFromFetch) => {
      rooms.value = roomsFromFetch
    })
    .catch((error) => {
      console.error(error.message)
    })
}

const filter = ref('')

const filteredRooms = computed(() => {
  return rooms.value.filter((room) => {
    return room.name.toLowerCase().includes(filter.value.toLowerCase())
  })
})

fetchRooms()
</script>

<style scoped>
.room-item-main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  height: 300px;
  gap: 20px;
  padding: 20px;
}

.filter-container {
  padding: 20px;
}

.boking-filter-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  background-color: rgb(32, 32, 32);
  height: 170px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 7px 0 rgb(14, 14, 14);
}

.boking-search {
  display: flex;

  gap: 15px;
}
</style>
