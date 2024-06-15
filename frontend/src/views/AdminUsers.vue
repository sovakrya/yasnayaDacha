<template>
  <div class="admin-users-box">
    <input placeholder="Поиск..." v-model="userFilter" class="admin-users-filter" />

    <table class="table">
      <thead>
        <tr v-for="headerGroup in tableUsers.getHeaderGroups()" :key="headerGroup.id">
          <th v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            ></FlexRender>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in tableUsers.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            <div v-if="cell.column.columnDef.header === 'Действия'" class="actions-box">
              <button class="admin-edit-button">
                <IconPencil />
              </button>

              <button class="admin-delete-button">
                <IconGarbage />
              </button>
            </div>

            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            ></FlexRender>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useVueTable, getCoreRowModel, FlexRender, getFilteredRowModel } from "@tanstack/vue-table";
import { getUsers, type User } from "@/services/booking";
import { ref } from "vue";
import IconPencil from "@/components/icons/IconPencil.vue";
import IconGarbage from "@/components/icons/IconGarbage.vue";

const users = ref<User[]>([]);

getUsers()
  .then((usersFetch) => {
    users.value = usersFetch;
  })
  .catch((err) => {
    console.log(err);
  });

const columnUsers = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "name",
    header: "Имя",
  },

  {
    accessorKey: "lastName",
    header: "Фамилия",
  },

  {
    accessorKey: "secondName",
    header: "Отчество",
  },

  {
    accessorKey: "phone",
    header: "Номер телефона",
  },

  {
    accessorKey: "mail",
    header: "Почта",
  },

  {
    accessorKey: "actions",
    header: "Действия",
  },
];

const userFilter = ref("");

const tableUsers = useVueTable<User>({
  get data() {
    return users.value;
  },
  columns: columnUsers,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get globalFilter() {
      return userFilter.value;
    },
  },
});
</script>

<style scoped>
.admin-users-box {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.actions-box {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.admin-users-filter {
  height: 40px;
  align-self: center;
  min-width: 500px;
}
</style>
