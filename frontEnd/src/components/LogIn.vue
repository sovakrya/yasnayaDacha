<template>
  <div class="log-in-container">
    <label for="phone">Номер телефона</label>
    <input id="phone" :phone="phoneRef" />

    <label for="password">Пароль</label>
    <input id="password" :password="passwordRef" />

    <button @click="logInSite">Войти</button>

    <button @click="closePopUp">Отмена</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const phoneRef = ref('')
const passwordRef = ref('')
</script>

<style scoped>
.log-in-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
