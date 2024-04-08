<template>
  <search>
    <form class="filter-container" @submit.prevent role="search">
      <div class="booking-label">
        <label for="startDate">Заезд</label>

        <input
          id="startDate"
          type="date"
          :valueAsNumber="startDate"
          @input="startDate = ($event.target as HTMLInputElement).valueAsNumber"
          class="filter-input-wrapper input-filter"
        />
      </div>

      <div class="booking-label">
        <label for="endDate"> Выезд</label>
        <input
          id="endDate"
          type="date"
          :valueAsNumber="endDate"
          @input="endDate = ($event.target as HTMLInputElement).valueAsNumber"
          class="filter-input-wrapper input-filter"
        />
      </div>

      <BookingPopover v-model="countPeople" />
    </form>
  </search>
</template>

<script setup lang="ts">
import BookingPopover from "./BookingPopover.vue";

const startDate = defineModel<number>("startDate", { required: true });
const endDate = defineModel<number>("endDate", { required: true });

const countPeople = defineModel<{ adultsCount: number; kidsCount: number }>("countPeople", {
  required: true,
});
</script>

<style scoped>
.filter-container {
  padding: 24px 68px;
  display: flex;
  gap: 22px;
  background-color: var(--color-bg-item);
  border-radius: 8px;
  box-shadow: 0 0 8px 0 var(--color-box-shadow);
  align-items: center;
}

.booking-label {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-filter {
  background-color: var(--color-bg-item);
  color: var(--color-text);
}

.input-filter:focus {
  outline: solid 1px var(--color-outline);
}
</style>
