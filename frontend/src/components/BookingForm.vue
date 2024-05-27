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
        <DatePicker
          :columns="3"
          v-model.range.number="range"
          :color="selectedColor"
          :disabled-dates="bookingDays"
        />
      </div>

      <button id="booking" class="button-booking" @click="bookRoomFetch">Забронировать</button>

      <GoodBookingModal v-model:show="goodModal" />
    </div>

    <div class="sidebar-wrapper">
      <div class="sidebar-header-wrapper">
        <span class="sidebar-header">Ваше бронирование:</span>
      </div>

      <span class="sidebar-data">заезд: {{ correctStartDate }}</span>

      <span class="sidebar-data">выезд: {{ correctEndDate }}</span>

      <span class="sidebar-data">Номер: {{ room.name }}</span>

      <div class="price-container">
        <span class="price">Цена(?)</span>
      </div>
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

const room = defineModel<Room>("room", {
  required: true,
});

const correctStartDate = computed(() => {
  return new Date(range.value.start).toLocaleDateString();
});
const correctEndDate = computed(() => {
  return new Date(range.value.end).toLocaleDateString();
});

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
  border: solid 1px var(--color-item-border);
  border-radius: 4px;
}

.input-size:focus {
  outline: solid 1px var(--color-outline);
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
  gap: 8px;
}

.sidebar-header {
  font-size: larger;
  font-weight: bold;
}

.button-booking {
  width: 136px;
  height: 36px;
  justify-self: flex-end;
  background-color: var(--color-primary);
  border: none;
  color: var(--color-on-primary);
  border-radius: 4px;
  font-size: medium;
  font-weight: bold;
}

.button-booking:hover {
  background-color: var(--color-hover-button);
}

.error-input {
  border: solid 1px var(--color-error);
  border-radius: 2px;
  box-shadow: 0 0 3px 0 var(--color-error);
  background-color: var(--color-error-container);
}

.error-text {
  font-size: 14px;
  color: var(--color-error);
}

.error-color {
  color: var(--color-error);
}

.error-size {
  height: 16px;
}

.calendar-wrapper {
  display: flex;
  justify-content: center;
}

.dark-green {
  --vc-accent: var(--color-primary);
}

.price-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
}

.price {
  font-size: large;
  font-weight: bold;
}

.sidebar-data {
  font-size: large;
}
</style>
