<template>
  <div class="admin-box">
    <nav class="admin-nav">
      <h1 class="admin-nav_title">Админ панель</h1>

      <RouterLink :to="{ name: 'adminRooms' }">
        <div class="admin-nav_link-box">
          <IconHome />
          <div>Комнаты</div>
        </div></RouterLink
      >
      <RouterLink :to="{ name: 'adminUsers' }" class="admin-nav_link">
        <div class="admin-nav_link-box">
          <IconUser />
          <div>Пользователи</div>
        </div>
      </RouterLink>
      <RouterLink :to="{ name: 'adminBooking' }" class="admin-nav_link">
        <div class="admin-nav_link-box">
          <IconCalendar />
          <div>Бронирование</div>
        </div>
      </RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import IconHome from "@/components/icons/IconHome.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconUser from "@/components/icons/IconUser.vue";
</script>

<style scoped>
.admin-box {
  display: flex;
  gap: 24px;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 250px;
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
  gap: 6px;
  padding: 4px;
}

.admin-nav_link-box:hover {
  background-color: var(--color-primary);
  color: var(--on-primary);
  fill: var(--on-primary);
  stroke: var(--on-primary);
  border-radius: 6px;
  transition: 0.3s;
}
</style>
