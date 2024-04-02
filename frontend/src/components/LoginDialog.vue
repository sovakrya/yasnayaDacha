<template>
  <dialog ref="logInModal">
    <div class="log-in-container">
      <label for="phone">Номер телефона</label>
      <input id="phone" :phone="phoneRef" />

      <label for="password">Пароль</label>
      <input id="password" :password="passwordRef" />

      <button @click="showLogIn = true">Войти</button>

      <button @click="showLogIn = false">Отмена</button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineModel } from "vue";

const phoneRef = ref("");
const passwordRef = ref("");
const logInModal = ref<HTMLDialogElement>();

onMounted(() => {
  if (!logInModal.value) {
    return;
  }

  logInModal.value.addEventListener("click", closeOnBackDropClickk);
});

function closeOnBackDropClickk({ currentTarget, target }: MouseEvent) {
  const dialog = currentTarget as HTMLDialogElement;
  const isClickedOnBackDrop = target === dialog;

  if (isClickedOnBackDrop) {
    showLogIn.value = false;
  }
}

const showLogIn = defineModel<boolean>("showLogIn", { default: false });

watch(showLogIn, (showLogIn) => {
  if (showLogIn) {
    openDialog();
  } else {
    closeDialog();
  }
});

function openDialog() {
  if (!logInModal.value) {
    return;
  }

  logInModal.value.showModal();
}

function closeDialog() {
  if (!logInModal.value) {
    return;
  }

  logInModal.value.close();
}
</script>

<style scoped>
.log-in-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
