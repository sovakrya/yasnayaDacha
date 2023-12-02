<template>
  <div class="room-item-container">
    <div class="room-item">
      {{ props.room }}
    </div>

    <div>
      <button type="button" @click="openPopUp">забронировать</button>

      <dialog ref="bookingPopUp" class="popUp-container">
        <div class="popUp-wrapper">
          <h1>Забронировать комнату: {{ props.room.name }}</h1>
          <div class="date-wrapper">
            <label for="start">от</label>
            <input
              id="start"
              type="date"
              :valueAsNumber="startDateRef"
              @input="date = $event.target.valueAsNumber"
            />

            <label for="end">до</label>
            <input
              id="end"
              type="date"
              :valueAsNumber="endDateRef"
              @input="date = $event.target.valueAsNumber"
            />
          </div>

          <div class="button-booking-wrapper">
            <button @click="bookRoomFromFetch">Забронировать</button>

            <button @click="closePopUp">Отмена</button>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { bookRoom } from '../services/booking'

onMounted(() => {
  bookingPopUp.value.addEventListener('click', closeOnBackDropClick)
})

function closeOnBackDropClick({ currentTarget, target }) {
  const dialog = currentTarget
  const isClickedOnBackDrop = target === dialog

  if (isClickedOnBackDrop) {
    dialog.close()
  }
}

const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})

const bookingPopUp = ref()

function openPopUp() {
  if (!bookingPopUp.value) {
    return
  }

  bookingPopUp.value.showModal()
}

function closePopUp() {
  if (!bookingPopUp.value) {
    return
  }

  bookingPopUp.value.close()
}

const startDateRef = ref(new Date().getTime())
const endDateRef = ref(new Date().getTime())

const userId = 1

function bookRoomFromFetch() {
  bookRoom({
    room: props.room.id,
    user: userId,
    startDate: startDateRef.value,
    endDate: endDateRef.value
  })
    .then((booking) => {
      console.log('забронировано!', booking)
    })
    .catch((error) => {
      if (error.status === '400') {
        console.log(error)
      }
    })
}
</script>

<style scoped>
.room-item {
  flex-grow: 1;
}

.room-item-container {
  border: 2px solid rgb(38, 107, 53);
  border-radius: 7px;
  display: flex;
  padding: 1em;
  gap: 1em;
  margin: 20px;
}

.popUp-container {
  margin: auto;
  padding: 0;
  border: none;
}

.popUp-container::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.popUp-wrapper {
  display: flex;
  padding: 2em;
  flex-direction: column;
  gap: 20px;
}

.date-wrapper {
  display: flex;
  justify-content: space-evenly;
}

.button-booking-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
