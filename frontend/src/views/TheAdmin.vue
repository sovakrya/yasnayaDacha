<template>
  <div>
    <header>
      <nav class="main-nav">
        <h1 class="admin-nav_title">Админ панель</h1>

        <RouterLink :to="{ name: 'adminRooms' }">
          <div class="admin-nav_link-box">
            <img src="../components/icons/home.svg" width="24px" height="24px" />
            <div>Комнаты</div>
          </div></RouterLink
        >
        <RouterLink :to="{ name: 'adminUsers' }" class="admin-nav_link">
          <div class="admin-nav_link-box">
            <img src="../components/icons/user.svg" width="24px" height="24px" />
            <div>Пользователи</div>
          </div>
        </RouterLink>
        <RouterLink :to="{ name: 'adminBooking' }" class="admin-nav_link">
          <div class="admin-nav_link-box">
            <img src="../components/icons/calendar.svg" width="24px" height="24px" />
            <div>Бронирование</div>
          </div>
        </RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.main-nav {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 250px;
  position: fixed;
  z-index: 1;
  top: 80px;
  left: 0;
  overflow-x: hidden;
  gap: 10px;
  background-color: rgb(217, 224, 220);
  padding: 20px;
}

.admin-nav_title {
  font-weight: 700;
  font-size: 25px;
  text-align: center;
}

.admin-nav_link-box {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 22px;
  color: var(--color-text);
  cursor: pointer;
  gap: 8px;
}

.admin-nav_link-box:hover {
  background-color: var(--color-primary);
  color: var(--on-primary);
  fill: var(--on-primary);
  stroke: var(--on-primary);
  border-radius: 6px;
  transition: 0.4s;
}
</style>
