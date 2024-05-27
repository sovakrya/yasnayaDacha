<template>
  <div class="main-container">
    <div class="step-wrapper">
      <button @click="decrementStep" class="button-step" v-show="activeStep != 1">
        <img src="./icons/arrow-prev.svg" />
      </button>

      <div class="step">
        {{ steps[activeStep - 1] }}
      </div>

      <div class="button-spays">
        <button
          @click="incrementStep"
          class="button-step"
          v-show="activeStep != 1 && activeStep != 3"
        >
          <img src="./icons/arrow-next.svg" />
        </button>
      </div>
    </div>

    <div class="stepper-container">
      <div class="stepper" :style="{ width: stepperProgress }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const steps = ["Выберите номер", "Подтвердите выбор", "Введите данные"];
const activeStep = defineModel<number>("activeStep", { required: true });
const stepperProgress = computed(() => {
  return `${activeStep.value * 33.3333333333}%`;
});

function decrementStep() {
  if (activeStep.value != 1) {
    activeStep.value--;
  }
}

function incrementStep() {
  if (activeStep.value != 3) {
    activeStep.value++;
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-wrapper {
  display: flex;
}

.step {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: x-large;
}

/* .step-progress-wrapper {
  position: relative;
  border: 1px solid #4e4c4a;
  border-radius: 16px;
}
.step-progress {
  overflow: hidden;
  display: block;
  border: none;
  border-radius: 16px;
  height: 10px;
  background-color: #4b4947;
} */

.stepper-container {
  width: 100%;
  background-color: var(--color-light-primary);
  height: 4px;
  border-radius: 4px;
}

.stepper {
  background-color: var(--color-primary);
  height: inherit;
  transition: width 0.6s ease;
  border-radius: 4px;
}

/*
.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border: 4px solid gray;
  border-radius: 50%;
} */

.button-step {
  display: flex;
  align-items: center;
  gap: 2px;
  background-color: none;
  border: none;
  width: 36px;
  border-radius: 6px;
  font-weight: bold;
  height: 38.39px;
}

.button-step:hover {
  background-color: rgb(197, 197, 197);
}

.button-spays {
  height: 38.39px;
  width: 36px;
}
</style>
