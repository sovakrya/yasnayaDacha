<template>
  <div class="admin-users_box">
    <div>
      <input />
      <button>поиск</button>
    </div>

    <div v-for="user of users" :key="user.id" :user="user">
      <div class="admin-users_user_box">
        <div>Имя: {{ user.name }}</div>
        <div>Фамилия: {{ user.lastName }}</div>
        <div>Отчество: {{ user.secondName }}</div>

        <div>Телефон: {{ user.phone }}</div>

        <div>Почта: {{ user.mail }}</div>

        <div>
          <button>Редактировать</button>
          <button>Удалить</button>
        </div>
      </div>
    </div>

    <button>Добавить</button>
  </div>
</template>

<script setup lang="ts">
import { getUsers, type User } from "@/services/booking";
import { ref } from "vue";

const users = ref<User[]>([]);
getUsers()
  .then((usersFetch) => {
    users.value = usersFetch;
  })
  .catch((err) => {
    console.log(err);
  });
</script>

<style scoped>
.admin-users_box {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  flex: 1 0;
}

.admin-users_user_box {
  display: flex;
  flex-direction: column;
  background-color: rgb(217, 224, 220);
  gap: 8px;
  padding: 10px;
  border-radius: 4px;
  font-size: 18px;
}
</style>
