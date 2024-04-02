<template>
  <dialog ref="bookingPopUp" class="popUp-container">
    <div class="popUp-wrapper">
      <header class="header-bookin-dialog">
        <h1>{{ props.room.name }}</h1>

        <button @click="closeDialog" class="button-cross">
          <IconCross />
        </button>
      </header>

      <div class="pic-container">
        <img src="../components/icons/pic.jpg" class="pic-container__img pic-container__item_1" />
        <img src="../components/icons/pic.jpg" class="pic-container__img pic-container__item_2" />
        <img src="../components/icons/pic.jpg" class="pic-container__img pic-container__item_3" />
        <img src="../components/icons/pic.jpg" class="pic-container__img pic-container__item_4" />
        <img src="../components/icons/pic.jpg" class="pic-container__img" />
        <img src="../components/icons/pic.jpg" class="pic-container__img" />
        <img src="../components/icons/pic.jpg" class="pic-container__img" />
        <img src="../components/icons/pic.jpg" class="pic-container__img" />
      </div>

      <div>{{ props.room.description }}</div>

      <footer class="footer-booking-dialog">
        <button class="button-pick">выбрать</button>
      </footer>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { type Room } from "../services/booking";
import { ref, onMounted, defineModel, watch } from "vue";
import IconCross from "../components/icons/IconCross.vue";

onMounted(() => {
  if (!bookingPopUp.value) {
    return;
  }

  bookingPopUp.value.addEventListener("click", closeOnBackDropClick);
});

const bookingPopUp = ref<HTMLDialogElement>();

function closeOnBackDropClick({ currentTarget, target }: MouseEvent) {
  const dialog = currentTarget as HTMLDialogElement;
  const isClickedOnBackDrop = target === dialog;

  if (isClickedOnBackDrop) {
    dialog.close();

    show.value = false;
  }
}

const show = defineModel<boolean>("show", { default: false });

watch(show, (show) => {
  if (show) {
    openDialog();
  } else {
    closeDialog();
  }
});

function openDialog() {
  if (!bookingPopUp.value) {
    return;
  }

  bookingPopUp.value.showModal();

  show.value = true;
}

function closeDialog() {
  if (!bookingPopUp.value) {
    return;
  }

  bookingPopUp.value.close();

  show.value = false;
}

const props = defineProps<{
  room: Room;
}>();
</script>

<style scoped>
.popUp-container {
  margin: auto;
  padding: 0;
  border: none;
  background-color: var(--color-bg-item);
  color: var(--color-text);
  border-radius: 8px;
}

.popUp-wrapper {
  display: flex;
  height: 700px;
  width: 1000px;
  padding: 2em;
  flex-direction: column;
  gap: 20px;
}
.popUp-container::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.pic-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(5, 5vw);
  gap: 15px;
}

.pic-container__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pic-container__item_1 {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 6;
}

.pic-container__item_2 {
  grid-column-start: 5;
  grid-column-end: 7;
  grid-row-start: 1;
  grid-row-end: 4;
}

.pic-container__item_3 {
  grid-column-start: 7;
  grid-column-end: 9;
  grid-row-start: 1;
  grid-row-end: 4;
}

.pic-container__item_4 {
  grid-column-start: 5;
  grid-column-end: 7;
  grid-row-start: 4;
  grid-row-end: 6;
}
.footer-booking-dialog {
  display: flex;
  justify-content: end;
}

.header-bookin-dialog {
  display: flex;
  justify-content: space-between;
}

.button-cross {
  cursor: pointer;
  border: none;
  background: none;
  fill: var(--color-hover-button);
}

.button-cross:hover {
  fill: var(--color-text);
}

.button-pick {
  height: 34px;
  width: 74px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: var(--color-button);
  color: var(--color-text);
}

.button-pick:hover {
  background-color: var(--color-hover-button);
}
</style>
