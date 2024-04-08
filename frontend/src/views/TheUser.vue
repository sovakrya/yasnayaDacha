<template>
  <div class="main-wrapper">
    <BookingFilter
      v-model:count-people="countPeople"
      v-model:end-date="endDate"
      v-model:start-date="startDate"
      v-model:active-step="activeStep"
      @find="fetchRooms"
      class="filter-wrapper"
    />

    <TheStepper v-model:active-step="activeStep" />

    <div class="room-item-main" v-if="activeStep === 1">
      <RoomItem
        :room="room"
        v-for="room of rooms"
        :key="room.id"
        @pushed="selectRoom(room)"
        @picRoom="selectRoom(room)"
      />
    </div>

    <ServiceItem
      v-else-if="activeStep === 2"
      :room="selectedRoom"
      @selected="activeStep = 3"
      class="service-item"
    />

    <BookingForm
      v-else-if="activeStep === 3"
      :room="selectedRoom"
      :start-date="startDate"
      :end-date="endDate"
      :adults="countPeople.adultsCount"
      :kids="countPeople.kidsCount"
      :range="{ start: startDate, end: endDate }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getRooms, type Room } from "../services/booking";
import RoomItem from "../components/RoomItem.vue";
import BookingFilter from "../components/BookingFilter.vue";
import ServiceItem from "../components/ServiceItem.vue";
import BookingForm from "../components/BookingForm.vue";
import TheStepper from "../components/TheStepper.vue";

const props = withDefaults(
  defineProps<{
    adults?: number;
    kids?: number;
  }>(),
  {
    adults: 0,
    kids: 0,
  }
);

const activeStep = ref(1);
const selectedRoom = ref();

// function reset() {
//   activeStep.value = 1;
//   selectedRoom.value = undefined;
// }

function selectRoom(room: Room) {
  selectedRoom.value = room;
  activeStep.value = 2;
}

const startDate = ref(new Date().getTime());
const endDate = ref(new Date().getTime());

const rooms = ref<Room[]>([]);

const countPeople = ref({ adultsCount: props.adults, kidsCount: props.kids });

function fetchRooms() {
  getRooms({
    numberOfPlaces: countPeople.value.adultsCount + countPeople.value.kidsCount,
    start: startDate.value,
    end: endDate.value,
  })
    .then((roomsFromFetch) => {
      rooms.value = roomsFromFetch;
    })
    .catch((error: Error) => {
      console.error(error.message);
    });
}

watch([startDate, endDate, countPeople], fetchRooms, { immediate: true });
</script>

<style scoped>
.main-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
}

.room-item-main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.filter-wrapper {
  align-self: center;
}

.service-item {
  flex-grow: 1;
}
</style>
