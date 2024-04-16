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
      <button @click="bookingPopoverIsOpen = false" class="close-button">
        <IconCross />
      </button>

      <div class="counter-container">
        <div class="counter-wrapper">
          <label for="adultCount" class="label-counter">взрослый</label>

          <div class="counter-content">
            <button @click="decrementAdults" class="button-plus-and-minus">
              <img src="./icons/minus.svg" />
            </button>
            <input id="adultCount" :value="adultsCountTemp" readonly class="input-counter" />
            <button @click="incrementAdults" class="button-plus-and-minus">
              <img src="./icons/plus.svg" />
            </button>
          </div>
        </div>

        <div class="counter-wrapper">
          <label for="kidCount" class="label-counter">дети до 5 лет</label>

          <div class="counter-content">
            <button @click="decrementKids" class="button-plus-and-minus">
              <img src="./icons/minus.svg" />
            </button>
            <input
              id="kidCount"
              type="text"
              :value="kidsCountTemp"
              readonly
              class="input-counter"
            />
            <button @click="incrementKids" class="button-plus-and-minus">
              <img src="./icons/plus.svg" />
            </button>
          </div>
        </div>
      </div>

      <button @click="saveCountPeople" class="button-done">готово</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineModel } from "vue";
import IconCross from "./icons/IconCross.vue";

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
  gap: 24px;
  position: absolute;
  background: var(--color-bg-item);
  color: var(--color-text);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 var(--color-box-shadow);
}

.counter-container {
  display: flex;
  gap: 20px;
}

.counter-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.counter-content {
  display: flex;
  gap: 10px;
}

.label-counter {
  align-self: center;
}

.button-done {
  align-self: flex-end;
  background-color: var(--color-text);
  border: none;
  border-radius: 4px;
  color: var(--color-on-primary);
  cursor: pointer;
  height: 30px;
  width: 96px;
  font-weight: bold;
  font-size: medium;
}

.close-button {
  align-self: flex-end;
  background: none;
  border: none;
  fill: var(--color-text);
  cursor: pointer;
}

.booking-popover-label {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-counter {
  height: 40px;
  width: 40px;
  border: solid 1px var(--color-item-border);
  border-radius: 4px;
  color: var(--color-text);
}

.button-plus-and-minus {
  height: 40px;
  width: 34px;
  border: solid 1px var(--color-item-border);
  background-color: rgb(197, 197, 197);
  border-radius: 4px;
  color: var(--color-on-primary);
  font-weight: bold;
  font-size: medium;
}
</style>
