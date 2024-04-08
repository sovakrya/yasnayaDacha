<template>
  <div>
    <div class="booking-popover-label">
      <label for="countUsers">Гости</label>
      <input
        id="countUsers"
        type="text"
        :value="inputText"
        readonly
        @click="openPopover"
        class="filter-input-wrapper input-color"
      />
    </div>

    <div v-show="bookingPopoverIsOpen" :style="popPosit" class="popup">
      <button @click="bookingPopoverIsOpen = false" class="close-button">закрыть</button>

      <div class="counter-container">
        <div>
          <label for="adultCount">взрослый</label>

          <button @click="decrementAdults">-</button>
          <input id="adultCount" :value="adultsCountTemp" />
          <button @click="incrementAdults">+</button>
        </div>

        <div>
          <label for="kidCount">дети до 5 лет</label>

          <button @click="decrementKids">-</button>
          <input id="kidCount" type="text" :value="kidsCountTemp" readonly />
          <button @click="incrementKids">+</button>
        </div>
      </div>

      <button @click="saveCountPeople" class="buttons-bottom-container">Готово</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineModel } from "vue";

const countPeople = defineModel<{ adultsCount: number; kidsCount: number }>({ required: true });

const adultsCountTemp = ref(countPeople.value.adultsCount);
const kidsCountTemp = ref(countPeople.value.kidsCount);

const inputText = computed(() => {
  let text = "";
  if (countPeople.value.adultsCount) {
    text = `Взрослые: ${countPeople.value.adultsCount}`;
  }

  if (countPeople.value.kidsCount) {
    text += ` дети: ${countPeople.value.kidsCount}`;
  }

  return text;
});

function incrementAdults() {
  if (adultsCountTemp.value === 13) {
    return;
  }
  adultsCountTemp.value += 1;
}

function incrementKids() {
  if (kidsCountTemp.value === 13) {
    return;
  }
  kidsCountTemp.value += 1;
}

function decrementAdults() {
  if (adultsCountTemp.value === 0) {
    return;
  }

  adultsCountTemp.value -= 1;
}

function decrementKids() {
  if (kidsCountTemp.value === 0) {
    return;
  }

  kidsCountTemp.value -= 1;
}

const popPosit = ref({ top: "0px", left: "0px" });
const bookingPopoverIsOpen = ref(false);

function openPopover(event: MouseEvent) {
  const { bottom, left } = (event.target as HTMLInputElement).getBoundingClientRect();

  if (!bookingPopoverIsOpen.value) {
    popPosit.value.top = `${bottom + 15}px`;
    popPosit.value.left = `${left}px`;
  }

  bookingPopoverIsOpen.value = !bookingPopoverIsOpen.value;
}

function saveCountPeople() {
  countPeople.value = {
    adultsCount: adultsCountTemp.value,
    kidsCount: kidsCountTemp.value,
  };
}
</script>

<style scoped>
.popup {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  background: rgb(255, 255, 255);
  color: black;
  padding: 30px;
  border-radius: 5px;
}

.counter-container {
  display: flex;
  gap: 20px;
}

.buttons-bottom-container {
  align-self: flex-end;
}

.close-button {
  align-self: flex-end;
}

.booking-popover-label {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-color {
  background-color: var(--color-bg-item);
}

.input-color:focus {
  outline: solid 1px var(--color-outline);
}
</style>
