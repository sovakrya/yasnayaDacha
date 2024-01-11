<template>
  <div>
    <div class="booking-popover-label">
      <label for="countUsers">Гости</label>
      <input id="countUsers" type="text" :value="inputText" readonly @click="handleClick" />
    </div>

    <div v-show="bookingPopoverIsOpen" :style="popPosit" class="popup">
      <button @click="bookingPopoverIsOpen = false" class="close-button">закрыть</button>

      <div class="counter-container">
        <div>
          <div>
            <label for="adultCount">взрослый</label>
          </div>
          <button @click="incrementAdults">+</button>
          <input id="adultCount" type="text" :value="adultsCountTemp" readonly />
          <button @click="decrementAdults">-</button>
        </div>

        <div>
          <div>
            <label for="kidCount">дети до 5 лет</label>
          </div>
          <button @click="incrementKids">+</button>
          <input id="kidCount" type="text" :value="kidsCountTemp" readonly />
          <button @click="decrementKids">-</button>
        </div>
      </div>

      <div class="buttons-bottom-container">
        <button type="button" @click="addNewPopover">Добавить номер</button>

        <button @click="saveCountPeople">Готово</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, defineModel } from 'vue'

const countPeople = defineModel({ type: Object, required: true })

const adultsCountTemp = ref(1)
const kidsCountTemp = ref(0)

const inputText = computed(() => {
  let text = ''
  if (countPeople.value.adultsCount) {
    text = `Взрослые: ${countPeople.value.adultsCount}`
  }

  if (countPeople.value.kidsCount) {
    text += ` дети: ${countPeople.value.kidsCount}`
  }

  return text
})

function incrementAdults() {
  if (adultsCountTemp.value === 13) {
    return
  }
  adultsCountTemp.value += 1
}

function incrementKids() {
  if (kidsCountTemp.value === 13) {
    return
  }
  kidsCountTemp.value += 1
}

function decrementAdults() {
  if (adultsCountTemp.value === 0) {
    return
  }

  adultsCountTemp.value -= 1
}

function decrementKids() {
  if (kidsCountTemp.value === 0) {
    return
  }

  kidsCountTemp.value -= 1
}

const popPosit = ref({ top: '0px', left: '0px' })
const bookingPopoverIsOpen = ref(false)

function handleClick(event) {
  const { bottom, left } = event.target.getBoundingClientRect()

  if (!bookingPopoverIsOpen.value) {
    popPosit.value.top = `${bottom + 15}px`
    popPosit.value.left = `${left}px`

    adultsCountTemp.value = 1
    kidsCountTemp.value = 0
  }

  bookingPopoverIsOpen.value = !bookingPopoverIsOpen.value
}

function saveCountPeople() {
  countPeople.value = {
    adultsCount: adultsCountTemp.value,
    kidsCount: kidsCountTemp.value
  }
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
  display: flex;
  justify-content: space-between;
}

.close-button {
  align-self: flex-end;
}

.booking-popover-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
