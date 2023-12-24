<template>
  <div>
    {{ booking }}
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getBooking } from '../services/booking'

const booking = ref([])

function fetchBooking() {
  getBooking()
    .then((bookingFromFetch) => {
      booking.value = bookingFromFetch
    })
    .catch((err) => {
      console.error(err)
    })
}

fetchBooking()
</script>

<style scoped></style>
