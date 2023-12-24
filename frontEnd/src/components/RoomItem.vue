<template>
  <div class="room-item-container room-item-border">
    <img src="../components/icons/pic.jpg" width="300" height="300" class="pic-container" />

    <div class="room-discription">
      <div>описание описание описание описание описание</div>
    </div>

    <div class="boking-button">
      <button type="button" @click="bookingDialog = true">выбрать</button>

      <BookingDialog v-model:show="bookingDialog" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BookingDialog from './BookingDialog.vue'

const bookingDialog = ref(false)
</script>

<style scoped>
.room-item-container {
  display: flex;
  gap: 1em;
  flex-direction: column;
}

.room-item-border {
  background-color: rgb(32, 32, 32);
  box-shadow: 0 0 7px 0 rgb(14, 14, 14);
  border-radius: 5px;
  border: none;
}

.room-discription {
  padding: 1em;
}

.boking-button {
  padding: 1em;
}

.pic-container {
  border-radius: 5px;
}
</style>
