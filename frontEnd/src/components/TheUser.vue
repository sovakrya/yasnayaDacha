<template>
  <div>
    <RoomItem :room="room" v-for="room of rooms" :key="room.id" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getRooms } from '../services/booking'
import RoomItem from './RoomItem.vue'

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

fetchRooms()
</script>
