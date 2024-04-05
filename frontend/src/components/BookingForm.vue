<template>
  <div class="main-form-container">
    <div class="input-wrapper">
      <div class="booking-label">
        <label for="name" :class="{ 'error-color': validationErrors.name }">Имя </label>
        <input
          id="name"
          v-model="name"
          :class="{ 'error-input': validationErrors.name }"
          class="input-size"
        />

        <div class="error-text error-size">
          {{ validationErrors.name }}
        </div>
      </div>

      <div class="booking-label">
        <label for="lastName" :class="{ 'error-color': validationErrors.lastName }">Фамилия</label>
        <input
          id="lastName"
          v-model="lastName"
          :class="{ 'error-input': validationErrors.lastName }"
          class="input-size"
        />

        <div class="error-text error-size">
          {{ validationErrors.lastName }}
        </div>
      </div>

      <div class="booking-label">
        <label for="secondName" :class="{ 'error-color': validationErrors.secondName }"
          >Отчество
        </label>
        <input
          id="secondName"
          v-model="secondName"
          :class="{ 'error-input': validationErrors.secondName }"
          class="input-size"
        />

        <div class="error-text error-size">
          {{ validationErrors.secondName }}
        </div>
      </div>

      <div class="booking-label">
        <label for="phone" :class="{ 'error-color': validationErrors.phone }"
          >Номер телефона
        </label>
        <input
          id="phone"
          v-model="phone"
          :class="{ 'error-input': validationErrors.phone }"
          class="input-size"
        />

        <div class="error-text error-size">
          {{ validationErrors.phone }}
        </div>
      </div>

      <div class="booking-label">
        <label for="mail" :class="{ 'error-color': validationErrors.mail }"
          >Электронная почта
        </label>
        <input
          id="mail"
          v-model="mail"
          :class="{ 'error-input': validationErrors.mail }"
          class="input-size"
        />

        <div class="error-text error-size">
          {{ validationErrors.mail }}
        </div>
      </div>

      <div id="datePickerBooking" class="calendar-wrapper">
        <div id="countPeople" class="count-people-container">
          <span>Количество гостей</span>

          <span>взрослые</span>
          <div class="count-people-content">
            <button @click="decrementAdults">-</button>
            <input readonly class="count-people-input" :value="adults" />
            <button @click="incrementAdults">+</button>
          </div>

          <span>дети до 5 лет</span>
          <div class="count-people-content">
            <button @click="decrementKids">-</button>
            <input readonly class="count-people-input" :value="kids" />
            <button @click="incrementKid">+</button>
          </div>
        </div>

        <DatePicker
          :columns="2"
          v-model.range.number="range"
          :color="selectedColor"
          :disabled-dates="bookingDays"
        />
      </div>

      <button id="booking" class="button-booking" @click="bookRoomFetch">Забронировать</button>

      <GoodBookingModal v-model:show="goodModal" />
    </div>

    <div class="sidebar-wrapper">
      <div class="sidebar-header">Ваше бронирование:</div>

      <div>количество гостей: {{ kids + adults }}</div>

      <div>заезд: {{ correctStartDate }}</div>

      <div>выезд: {{ correctEndDate }}</div>

      <div>Номер: {{ room.name }}</div>

      <div>Цена(?)</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Room } from "@/services/booking";
import { bookRoom, getBookingDays } from "@/services/booking";
import { computed, ref, watch } from "vue";
import GoodBookingModal from "./GoodBookingModal.vue";
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";

const props = defineProps<{
  range: { start: number; end: number };
}>();

const range = ref(props.range);
const selectedColor = ref("green");

const goodModal = ref(false);

const name = ref("");
const secondName = ref("");
const lastName = ref("");
const phone = ref("");
const mail = ref("");
const adults = ref(0);
const kids = ref(0);

const room = defineModel<Room>("room", {
  required: true,
});

const correctStartDate = computed(() => {
  return new Date(range.value.start).toLocaleDateString();
});
const correctEndDate = computed(() => {
  return new Date(range.value.end).toLocaleDateString();
});

function incrementAdults() {
  if (adults.value === 10) {
    return;
  }

  return (adults.value += 1);
}

function decrementAdults() {
  if (adults.value === 0) {
    return;
  }
  return (adults.value -= 1);
}

function incrementKid() {
  if (kids.value === 10) {
    return;
  }

  return (kids.value += 1);
}

function decrementKids() {
  if (kids.value === 0) {
    return;
  }
  return (kids.value -= 1);
}

const userId = 1;

const validationErrors = ref<{
  name?: string;
  lastName?: string;
  secondName?: string;
  phone?: string;
  mail?: string;
  dates?: string;
}>({});

const bookingDays = ref<{ start?: number; end: number }[]>([]);

function getBookingDaysFetch() {
  getBookingDays({ room: room.value.id }).then((days) => {
    days.push({ end: new Date().getTime() });
    bookingDays.value = days;
  });
}

getBookingDaysFetch();

function bookRoomFetch() {
  bookRoom({
    room: room.value.id,
    user: userId,
    start: range.value.start,
    end: range.value.end,
    name: name.value,
    lastName: lastName.value,
    secondName: secondName.value,
    mail: mail.value,
    phone: phone.value,
  }).then((res) => {
    if (res.status === 200) {
      goodModal.value = true;
      return;
    }

    validationErrors.value = res.fields;
  });
}

watch([name, secondName, lastName, phone, mail], (newV, oldV) => {
  if (newV[0] !== oldV[0]) {
    validationErrors.value.name = "";
  }

  if (newV[1] !== oldV[1]) {
    validationErrors.value.secondName = "";
  }

  if (newV[2] !== oldV[2]) {
    validationErrors.value.lastName = "";
  }

  if (newV[3] !== oldV[3]) {
    validationErrors.value.phone = "";
  }

  if (newV[4] !== oldV[4]) {
    validationErrors.value.mail = "";
  }
});
</script>

<style scoped>
.main-form-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.input-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 400px);
  grid-template-areas:
    "name lastName secondName"
    "phone mail ."
    "datePickerBooking datePickerBooking datePickerBooking"
    ". . booking";

  gap: 16px;
  background-color: var(--color-bg-item);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 0 8px 0 var(--color-box-shadow);
}

#datePickerBooking {
  grid-area: datePickerBooking;
}

#booking {
  grid-area: booking;
}

.input-size {
  height: 40px;
}

.booking-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-item);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 8px 0 var(--color-box-shadow);
  gap: 4px;
}

.sidebar-header {
  font-size: larger;
}

.count-people-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  width: 250px;
  padding: 20px;
  color: black;
}

.count-people-content {
  display: flex;
  gap: 8px;
}

.count-people-input {
  height: 30px;
  width: 60px;
}

.button-booking {
  width: 120px;
  height: 30px;
  justify-self: flex-end;
  background-color: var(--color-button);
  border: none;
  color: var(--color-text);
  border-radius: 4px;
}

.button-booking:hover {
  background-color: var(--color-hover-button);
}

.error-input {
  border: solid 1px rgb(199, 29, 29);
  border-radius: 2px;
  box-shadow: 0 0 3px 0 rgb(199, 29, 29);
  background-color: rgb(206, 206, 206);
}

.error-text {
  font-size: 14px;
  color: rgb(199, 29, 29);
}

.error-color {
  color: rgb(199, 29, 29);
}

.error-size {
  height: 16px;
}

.calendar-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
