<template>
  <div class="main-container">
    <div class="step-wrapper">
      <div class="button-slot">
        <button
          type="button"
          @click="decrementStep"
          class="button-step"
          aria-label="Назад"
          v-show="activeStep != 1"
        >
          <img src="./icons/arrow-prev.svg" alt="" />
        </button>
      </div>

      <div class="step">
        {{ steps[activeStep - 1] }}
      </div>

      <div class="button-slot">
        <button
          type="button"
          @click="incrementStep"
          class="button-step"
          aria-label="Вперёд"
          v-show="activeStep != 1 && activeStep != 3"
        >
          <img src="./icons/arrow-next.svg" alt="" />
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
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.step {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: x-large;
  text-align: center;
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

.button-slot {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
}

.button-step {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background-color: var(--color-primary-container);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.button-step:hover {
  background-color: var(--color-light-primary);
}

.button-step:active {
  transform: scale(0.94);
}

.button-step:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
