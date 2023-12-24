<template>
  <div>
    <label for="countUsers">Гости</label>
    <input id="countUsers" type="text" value="1 взрослый" readonly @click="handleClick" />

    <div v-show="foo" :style="popPosit" class="popup">
      <h2>Номер 1</h2>

      <div class="counter-container">
        <div>
          <div>
            <label for="adultCount">взрослый</label>
          </div>
          <button @click="augmentAdults">+</button>
          <input id="adultCount" type="text" :value="adultsCount" readonly />
          <button @click="subtractAdults">-</button>
        </div>

        <div>
          <div>
            <label for="kidCount">дети до 5 лет</label>
          </div>
          <button @click="augmentKids">+</button>
          <input id="kidCount" type="text" :value="kidsCount" readonly />
          <button @click="subtractKids">-</button>
        </div>
      </div>

      <div class="buttons-bottom-container">
        <button type="button">Добавить номер</button>

        <button>Готово</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const adultsCount = ref(1)

const kidsCount = ref(0)

function augmentAdults() {
  if (adultsCount.value === 13) {
    return
  }
  adultsCount.value += 1
}

function augmentKids() {
  if (kidsCount.value === 13) {
    return
  }
  kidsCount.value += 1
}

function subtractAdults() {
  if (adultsCount.value === 0) {
    return
  }

  adultsCount.value -= 1
}

function subtractKids() {
  if (kidsCount.value === 0) {
    return
  }

  kidsCount.value -= 1
}

const popPosit = ref({ top: '0px', left: '0px' })
const foo = ref(false)
function handleClick(event) {
  const { bottom, left } = event.target.getBoundingClientRect()

  if (!foo.value) {
    popPosit.value.top = `${bottom + 15}px`
    popPosit.value.left = `${left}px`
  }

  foo.value = !foo.value
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
</style>
