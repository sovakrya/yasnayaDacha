<template>
  <dialog ref="roomPopup">
    <div>
      <label for="name">Название комнаты</label>
      <input id="name" v-model="roomName" />

      <label for="roomNum">количество комнат</label>
      <input id="roomNum" v-model="numberOfPlaces" />

      <button>Добавить комнату</button>

      <button @click="closeDialog">Отмена</button>
    </div>
  </dialog>
</template>

<script setup>
import { ref, onMounted, defineModel, watch } from 'vue'

const roomName = ref('')
const numberOfPlaces = ref('')

const roomPopup = ref()

onMounted(() => {
  roomPopup.value.addEventListener('click', closeOnBackDropClickk)
})

function closeOnBackDropClickk({ currentTarget, target }) {
  const dialog = currentTarget
  const isClickedOnBackDrop = target === dialog

  if (isClickedOnBackDrop) {
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
  if (!roomPopup.value) {
    return
  }

  roomPopup.value.showModal()
}

function closeDialog() {
  if (!roomPopup.value) {
    return
  }

  roomPopup.value.close()
}
</script>
