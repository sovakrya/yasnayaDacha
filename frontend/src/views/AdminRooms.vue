<template>
  <table class="table">
    <thead>
      <tr v-for="headerGroup in tableRooms.getHeaderGroups()" :key="headerGroup.id">
        <th v-for="header in headerGroup.headers" :key="header.id">
          <FlexRender
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          ></FlexRender>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="row in tableRooms.getRowModel().rows" :key="row.id">
        <td v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"></FlexRender>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { getRooms } from "../services/booking";
import { ref } from "vue";
import { useVueTable, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { type Room } from "../services/booking";

const rooms = ref<Room[]>([]);

function fetchRooms() {
  getRooms()
    .then((roomsFromFetch) => {
      rooms.value = roomsFromFetch;
    })
    .catch((error) => {
      console.error(error.message);
    });
}

fetchRooms();

const columnsRoom = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "numberOfPlaces",
    header: "Количество мест",
  },
  {
    accessorKey: "description",
    header: "Описание",
  },
];

const tableRooms = useVueTable<Room>({
  get data() {
    return rooms.value;
  },
  columns: columnsRoom,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<style scoped>
.table {
  border-collapse: collapse;
  border: solid 2px grey;
}

th,
td {
  border: solid 1px grey;
}
</style>
