<template>
  <div class="container">
    <div class="linkBox">
      <button @click="loginDialog = true">Войти</button>

      <LoginDialog v-model:showLogIn="loginDialog" />

      <button @click="authDialog = true">Регистрация</button>

      <AuthenticationDialog v-model:show="authDialog" />
    </div>

    <div>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import AuthenticationDialog from './components/AuthenticationDialog.vue'
import LoginDialog from './components/LoginDialog.vue'

const authDialog = ref(false)
const loginDialog = ref(false)
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
