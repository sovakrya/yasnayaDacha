<template>
  <search>
    <form class="filter-container" @submit.prevent role="search">
      <div class="boking-filter-container">
        <h1>Бронирование домиков и комнат</h1>

        <div class="boking-search">
          <div class="booking-label">
            <label for="startDate">Заезд</label>

            <input
              id="startDate"
              type="date"
              :valueAsNumber="startDate"
              @input="date = $event.target.valueAsNumber"
            />
          </div>

          <div class="booking-label">
            <label for="endDate"> Выезд</label>
            <input
              id="endDate"
              type="date"
              :valueAsNumber="endDate"
              @input="date = $event.target.valueAsNumber"
            />
          </div>

          <div>
            <BookingPopover v-model="countPeople" />
          </div>

          <button @click="fetchRooms">Найти</button>
        </div>
      </div>
    </form>
  </search>

  <div class="room-item-main">
    <RoomItem :room="room" v-for="room of rooms" :key="room.id" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getRooms } from '../services/booking'
import RoomItem from '../components/RoomItem.vue'
import BookingPopover from '../components/BookingPopover.vue'

const startDate = ref(new Date().getTime())
const endDate = ref(new Date().getTime())

const rooms = ref([])

const countPeople = ref({ adultsCount: 0, kidsCount: 0 })

function fetchRooms() {
  getRooms({
    numberOfPlaces: countPeople.value.adultsCount + countPeople.value.kidsCount,
    startDate: startDate.value,
    endDate: endDate.value
  })
    .then((roomsFromFetch) => {
      rooms.value = roomsFromFetch
    })
    .catch((error) => {
      console.error(error.message)
    })
}

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
  background-color: var(--color-bg-item);
  height: 170px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 7px 0 var(--color-box-shadow);
}

.boking-search {
  display: flex;

  gap: 15px;
}

.booking-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
