<template>
  <div class="room-item-container room-item-border">
    <img src="../components/icons/pic.jpg" width="300" height="300" class="pic-container" />

    <div class="room-discription">
      <div>описание описание описание описание описание</div>
    </div>

    <div class="booking-button">
      <button type="button" @click="bookingDialog = true">выбрать</button>

      <BookingDialog v-model:show="bookingDialog" :room="props.room" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BookingDialog from './BookingDialog.vue'

const bookingDialog = ref(false)

const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.room-item-container {
  display: flex;
  gap: 1em;
  flex-direction: column;
}

.room-item-border {
  background-color: var(--color-bg-item);
  box-shadow: 0 0 7px 0 var(--color-box-shadow);
  border-radius: 5px;
  border: none;
}

.room-discription {
  padding: 1em;
}

.booking-button {
  padding: 1em;
}

.pic-container {
  border-radius: 5px;
}
</style>
