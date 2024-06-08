<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const name = ref("");
const numberOfPlaces = ref("");
const description = ref("");

onMounted(() => {
  if (!update.value) {
    return;
  }

  update.value.addEventListener("click", closeOnBackDropClick);
});

const update = ref<HTMLDialogElement>();

function closeOnBackDropClick({ currentTarget, target }: MouseEvent) {
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
  if (!update.value) {
    return;
  }

  update.value.showModal();
}

function closeDialog() {
  if (!update.value) {
    return;
  }

  update.value.close();
}
</script>

<template>
  <dialog ref="update" class="modal-wrapper">
    <div class="update-dialog-box">
      <span class="update-dialog__title">Редактирование</span>
      <input placeholder="Название.." class="update-dialog__input" v-model="name" />
      <input
        placeholder="Количество мест.."
        class="update-dialog__input"
        v-model="numberOfPlaces"
      />
      <input
        placeholder="Описание.."
        class="update-dialog__input update-dialog__input_description"
        v-model="description"
      />

      <div class="update-dialog__buttons-box">
        <button class="update-dialog__buttons">Обновить</button>
        <button class="update-dialog__buttons">Отмена</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.modal-wrapper {
  margin: auto;
  padding: 0;
  border: none;
  background-color: var(--color-bg-item);
  color: var(--color-text);
  border-radius: 6px;
}

.update-dialog-box {
  display: flex;
  min-width: 500px;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
}

.update-dialog__title {
  text-align: center;
  font-weight: 700;
  font-size: 20px;
}

.update-dialog__input {
  height: 40px;
}

.update-dialog__input_description {
  height: 200px;
}

.update-dialog__buttons-box {
  display: flex;
  padding: 8px 0 0 0;
  justify-content: space-between;
}

.update-dialog__buttons {
  height: 36px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  background-color: var(--color-primary);
  color: var(--on-primary);
  border-radius: 4px;
  cursor: pointer;
}
</style>
