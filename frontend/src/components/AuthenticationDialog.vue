<template>
  <dialog ref="registrationPopUp" class="popUp-container">
    <div class="authentication-container">
      <label for="name">Имя</label>
      <input id="name" v-model="nameRef" />

      <label for="phone">Номер телефона</label>
      <input id="phone" v-model="phoneRef" />

      <label for="password">Пароль</label>
      <input id="password" v-model="passwordRef" />

      <button>Зарегистрироваться</button>

      <button @click="show = false">Отмена</button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, defineModel, watch } from "vue";
import { addUser } from "../services/booking";

const nameRef = ref("");
const phoneRef = ref(0);
const passwordRef = ref("");

onMounted(() => {
  if (!registrationPopUp.value) {
    return;
  }

  registrationPopUp.value.addEventListener("click", closeOnBackDropClickk);
});

const registrationPopUp = ref<HTMLDialogElement>();

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
  if (!registrationPopUp.value) {
    return;
  }

  registrationPopUp.value.showModal();
}

function closeDialog() {
  if (!registrationPopUp.value) {
    return;
  }

  registrationPopUp.value.close();
}

// function addUserFromFetch() {
//   addUser({ name: nameRef.value, phone: phoneRef.value })
//     .then((user) => {
//       console.log("Пользователь зарегистрирован", user);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
</script>

<style scoped>
.popUp-container {
  margin: auto;
  padding: 0;
  border: none;
}
.authentication-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 2em;
}
</style>
