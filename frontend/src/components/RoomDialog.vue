<template>
  <dialog ref="roomPopup">
    <div>
      <label for="name">Название номера</label>
      <input id="name" v-model="roomName" />

      <label for="roomNum">количество спальных мест </label>
      <input id="roomNum" v-model="numberOfPlaces" />

      <button>Добавить номер</button>

      <button @click="closeDialog">Отмена</button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, defineModel, watch } from "vue";

const roomName = ref("");
const numberOfPlaces = ref("");

const roomPopup = ref<HTMLDialogElement>();

onMounted(() => {
  if (!roomPopup.value) {
    return;
  }

  roomPopup.value.addEventListener("click", closeOnBackDropClickk);
});

function closeOnBackDropClickk({ currentTarget, target }: MouseEvent) {
  const dialog = currentTarget as HTMLDataElement;
  const isClickedOnBackDrop = target === dialog;

  if (isClickedOnBackDrop) {
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
  if (!roomPopup.value) {
    return;
  }

  roomPopup.value.showModal();
}

function closeDialog() {
  if (!roomPopup.value) {
    return;
  }

  roomPopup.value.close();
}
</script>
