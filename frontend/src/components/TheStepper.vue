<template>
  <div class="main-container">
    <div class="step-wrapper">
      <button @click="decrementStep" class="button-step" v-if="activeStep != 1">
        <IconArrowLeft />
      </button>

      <div class="step">
        {{ activeStep }}
      </div>

      <button @click="incrementStep" class="button-step" v-if="activeStep != 1 && activeStep != 3">
        <IconArrowRight />
      </button>
    </div>

    <div class="stepper-container">
      <div class="stepper" :style="{ width: stepperProgress }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import IconArrowRight from "../components/icons/IconArrowRight.vue";
import IconArrowLeft from "../components/icons/IconArrowLeft.vue";

// const steps = [1, 2, 3, 4];
const activeStep = defineModel<number>("activeStep", { required: true });
const stepperProgress = computed(() => {
  return `${activeStep.value * 33.4}%`;
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
  background-color: #bbbbbb;
  height: 4px;
  border-radius: 4px;
}

.stepper {
  background-color: #9b9b9b;
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
  background-color: var(--color-button);
  border: none;
  border-radius: 4px;
  height: 30px;
  width: 40px;
}

.button-step:hover {
  background-color: var(--color-hover-button);
}
</style>
