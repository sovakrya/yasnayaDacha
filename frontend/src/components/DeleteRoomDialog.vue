<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

onMounted(() => {
  if (!deleteDialog.value) {
    return;
  }

  deleteDialog.value.addEventListener("click", closeOnBackDropClick);
});

const emit = defineEmits<{
  clickDeleteRoomButton: [];
}>();

const deleteDialog = ref<HTMLDialogElement>();

function closeOnBackDropClick({ currentTarget, target }: MouseEvent) {
  const dialog = currentTarget as HTMLDialogElement;
  const isClickedOnBackDrop = target === dialog;

  if (isClickedOnBackDrop) {
    show.value = false;
  }
}

const show = defineModel<boolean>("show");

watch(show, (show) => {
  if (show) {
    openDialog();
  } else {
    closeDialog();
  }
});

function openDialog() {
  if (!deleteDialog.value) {
    return;
  }

  deleteDialog.value.showModal();
}

function closeDialog() {
  if (!deleteDialog.value) {
    return;
  }

  deleteDialog.value.close();
}
</script>

<template>
  <dialog ref="deleteDialog" class="delete-dialog-wrapper">
    <div class="delete-dialog-box">
      <span class="delete-dialog-title">Вы действительно хотите удалить эту комнату?</span>

      <div class="delete-dialog-button-box">
        <button class="delete-dialog-buttons" @click="emit('clickDeleteRoomButton')">ОК</button>
        <button class="delete-dialog-buttons" @click="show = false">Отмена</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.delete-dialog-wrapper {
  margin: auto;
  padding: 0;
  border: none;
  background-color: var(--color-bg-item);
  color: var(--color-text);
  border-radius: 6px;
}

.delete-dialog-box {
  display: flex;
  min-width: 500px;
  flex-direction: column;
  padding: 30px;
  gap: 40px;
}

.delete-dialog-title {
  font-weight: 700;
  font-size: 20px;
  text-align: center;
}

.delete-dialog-button-box {
  display: flex;
  justify-content: center;
  gap: 45px;
}

.delete-dialog-buttons {
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
