<template>
  <div class="container">
    <div class="linkBox">
      <div class="button-login">
        <button @click="openLogInPopUp">Войти</button>
        <dialog ref="logInPopUp" class="popUp-container">
          <div class="registration-popUp-wrapper">
            <LogIn />
          </div>
        </dialog>

        <button @click="authDialog = true">Регистрация</button>

        <AuthenticationDialog v-model:show="authDialog" />
      </div>
    </div>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import AuthenticationDialog from './components/AuthenticationDialog.vue'
import LogIn from './components/LogIn.vue'

const logInPopUp = ref()
const authDialog = ref(false)
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}

.linkBox {
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.registration-popUp-container::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.registration-popUp-wrapper {
  padding: 2em;
}
</style>
