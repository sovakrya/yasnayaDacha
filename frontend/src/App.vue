<template>
  <div class="main-container">
    <header class="header">
      <div class="header-content">
        <h1 class="logo">Ясная дача</h1>

        <div class="phone">номер телефона</div>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style scoped>
.header {
  display: flex;
  position: relative;
  gap: 20px;
  height: 80px;
  background-color: rgba(60, 66, 63, 0.541);
  justify-content: center;
}

.header-content {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.logo {
  display: flex;
  justify-content: center;
  color: rgb(255, 255, 255);
  font-size: 25px;
  flex: 1 0;
}

.phone {
  display: flex;
  justify-content: flex-end;
  color: rgb(255, 255, 255);
  position: absolute;
  right: 24px;
}

.main-container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
