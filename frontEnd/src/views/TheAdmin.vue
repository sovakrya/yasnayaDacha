<template>
  <div>
    <header>
      <nav class="main-nav">
        <h1>Админ панель</h1>

        <RouterLink :to="{ name: 'adminRooms' }">Комнаты</RouterLink>
        <RouterLink :to="{ name: 'adminUsers' }">Пользователи</RouterLink>
        <RouterLink :to="{ name: 'adminBooking' }">Бронирование</RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<script setup></script>

<style scoped>
.main-nav {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
