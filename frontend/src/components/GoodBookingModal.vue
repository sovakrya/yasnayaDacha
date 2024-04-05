<template>
  <dialog ref="goodBook" class="modal-container">
    <div class="modal-wrapper">
      <h1>Бронирование успешно завершено</h1>

      <img src="./icons/checkMark.svg" />
      <h3>c вами свяжутся в течении какого-то рабочего времени</h3>

      <div class="button-ok-wrapper">
        <button @click="show = false" class="button-ok">хорошо</button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

onMounted(() => {
  if (!goodBook.value) {
    return;
  }

  goodBook.value.addEventListener("click", closeOnBackDropClickk);
});

const goodBook = ref<HTMLDialogElement>();

function closeOnBackDropClickk({ currentTarget, target }: MouseEvent) {
  const dialog = currentTarget as HTMLDialogElement;
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
  if (!goodBook.value) {
    return;
  }

  goodBook.value.showModal();
}

function closeDialog() {
  if (!goodBook.value) {
    return;
  }

  goodBook.value.close();
}
</script>

<style>
.modal-container {
  margin: auto;
  padding: 0;
  border: none;
  background-color: var(--color-bg-item);
  color: var(--color-text);
  border-radius: 8px;
}

.modal-wrapper {
  display: flex;
  height: 300px;
  width: 700px;
  padding: 2em;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}

.modal-container::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.button-ok-wrapper {
  align-self: flex-end;
}

.button-ok {
  width: 120px;
  height: 30px;
  background-color: var(--color-button);
  border: none;
  color: var(--color-text);
  border-radius: 4px;
}

.button-ok:hover {
  background-color: var(--color-hover-button);
}
</style>
