<template>
  <dialog ref="bookingPopUp" class="popUp-container">
    <div class="popUp-wrapper">
      <header>
        <h1>Имя</h1>
      </header>

      <div class="pic-container">
        <img src="../components/icons/pic.jpg" class="pic-container__img pic-container__item_1" />
        <img src="../components/icons/pic.jpg" class="pic-container__img pic-container__item_2" />
        <img src="../components/icons/pic.jpg" class="pic-container__img pic-container__item_3" />
        <img src="../components/icons/pic.jpg" class="pic-container__img pic-container__item_4" />
        <img src="../components/icons/pic.jpg" class="pic-container__img" />
        <img src="../components/icons/pic.jpg" class="pic-container__img" />
        <img src="../components/icons/pic.jpg" class="pic-container__img" />
        <img src="../components/icons/pic.jpg" class="pic-container__img" />
      </div>

      <div>
        <label for="start">от:</label>
        <input
          id="start"
          type="date"
          :valueAsNumber="startDate"
          @input="date = $event.target.valueAsNumber"
        />

        <label for="end">до:</label>
        <input
          id="end"
          type="date"
          :valueAsNumber="endDate"
          @input="date = $event.target.valueAsNumber"
        />
        <button @click="bookRoomFromFetch">забронировать</button>
      </div>

      <div>описание</div>

      <footer class="footer-boking-dialog">
        <button @click="closeDialog">Закрыть</button>
      </footer>
    </div>
  </dialog>
</template>

<script setup>
import { bookRoom } from '../services/booking'
import { ref, onMounted, defineModel, watch } from 'vue'

onMounted(() => {
  bookingPopUp.value.addEventListener('click', closeOnBackDropClick)
})

const bookingPopUp = ref()

function closeOnBackDropClick({ currentTarget, target }) {
  const dialog = currentTarget
  const isClickedOnBackDrop = target === dialog

  if (isClickedOnBackDrop) {
    dialog.close()

    show.value = false
  }
}

const show = defineModel('show', { type: Boolean, default: false, local: true })

watch(show, (show) => {
  if (show) {
    openDialog()
  } else {
    closeDialog()
  }
})

function openDialog() {
  if (!bookingPopUp.value) {
    return
  }

  bookingPopUp.value.showModal()

  show.value = true
}

function closeDialog() {
  if (!bookingPopUp.value) {
    return
  }

  bookingPopUp.value.close()

  show.value = false
}

const userId = 1
const startDate = ref(new Date().getTime())
const endDate = ref(new Date().getTime())

const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})

function bookRoomFromFetch() {
  bookRoom({
    room: props.room.id,
    user: userId,
    startDate: startDate.value,
    endDate: endDate.value
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
.popUp-container {
  margin: auto;
  padding: 0;
  border: none;
}

.popUp-wrapper {
  display: flex;
  height: 700px;
  width: 1000px;
  padding: 2em;
  flex-direction: column;
  gap: 20px;
}
.popUp-container::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.pic-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(5, 5vw);
  gap: 15px;
}

.pic-container__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pic-container__item_1 {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 6;
}

.pic-container__item_2 {
  grid-column-start: 5;
  grid-column-end: 7;
  grid-row-start: 1;
  grid-row-end: 4;
}

.pic-container__item_3 {
  grid-column-start: 7;
  grid-column-end: 9;
  grid-row-start: 1;
  grid-row-end: 4;
}

.pic-container__item_4 {
  grid-column-start: 5;
  grid-column-end: 7;
  grid-row-start: 4;
  grid-row-end: 6;
}
.footer-boking-dialog {
  display: flex;
  justify-content: end;
}
</style>
