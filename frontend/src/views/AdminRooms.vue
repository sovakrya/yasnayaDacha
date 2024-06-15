<template>
  <div class="admin-rooms-box">
    <input placeholder="Поиск..." v-model="filterRoom" class="admin-rooms-filter" />
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
            <div v-if="cell.column.columnDef.header === 'Действия'" class="actions-box">
              <button
                class="admin-edit-button"
                @click="showUpdateDialogMap[row.original.id] = true"
              >
                <IconPencil />
              </button>

              <UpdateRoomDialog
                v-model:show="showUpdateDialogMap[row.original.id]"
                :roomId="row.original.id"
                :name="row.original.name"
                :numberOfPlaces="row.original.numberOfPlaces"
                :description="row.original.description"
                @clickUpdateButton="updateRoomFetch($event, row.index)"
              />

              <button
                class="admin-delete-button"
                @click="showDeleteDialogMap[row.original.id] = true"
              >
                <IconGarbage />
              </button>

              <DeleteRoomDialog
                v-model:show="showDeleteDialogMap[row.original.id]"
                @clickDeleteRoomButton="deleteRoom(row.original.id, row.index)"
              />
            </div>

            <FlexRender
              v-else
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
import { deleteRoom as __deleteRoom, getRooms, updateRoom } from "../services/booking";
import { ref } from "vue";
import { useVueTable, getCoreRowModel, FlexRender, getFilteredRowModel } from "@tanstack/vue-table";
import { type Room } from "../services/booking";
import IconPencil from "@/components/icons/IconPencil.vue";
import IconGarbage from "@/components/icons/IconGarbage.vue";
import UpdateRoomDialog from "@/components/UpdateRoomDialog.vue";
import DeleteRoomDialog from "@/components/DeleteRoomDialog.vue";

const rooms = ref<Room[]>([]);
const showUpdateDialogMap = ref<Record<string, boolean>>({});
const showDeleteDialogMap = ref<Record<string, boolean>>({});

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

async function updateRoomFetch(room: Room, idx: number) {
  try {
    await updateRoom(room);
    rooms.value = rooms.value.toSpliced(idx, 1, room);

    showUpdateDialogMap.value[room.id] = false;
  } catch (err) {
    console.error((err as Error).message);
  }
}

async function deleteRoom(id: number, idx: number) {
  try {
    await __deleteRoom(id);
    rooms.value = rooms.value.toSpliced(idx, 1);

    showDeleteDialogMap.value[id] = false;
  } catch (err) {
    console.error((err as Error).message);
  }
}

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
  {
    accessorKey: "actions",
    header: "Действия",
  },
];

const filterRoom = ref("");

const tableRooms = useVueTable<Room>({
  get data() {
    return rooms.value;
  },
  columns: columnsRoom,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get globalFilter() {
      return filterRoom.value;
    },
  },
});
</script>

<style scoped>
.admin-rooms-box {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.admin-rooms-filter {
  height: 40px;
  align-self: center;
  min-width: 500px;
}

.actions-box {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.table {
  border-collapse: collapse;
  border: solid 1px rgb(165, 165, 165);
}

.table th {
  text-align: start;
  font-weight: bold;
  border: solid 1px rgb(165, 165, 165);
  padding: 14px;
  background-color: rgb(217, 224, 220);
}

.table td {
  border: solid 1px rgb(165, 165, 165);
  padding: 16px;
  text-align: start;
}
</style>
