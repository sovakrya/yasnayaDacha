import { Elysia, t } from "elysia";
import {
  deleteBooking,
  getBooking,
  getBookings,
  getBookingDay,
  getRoom,
  getRooms,
  addUser,
  addBooking,
  addRoom,
} from "./db";

const app = new Elysia();

app.get("/", () => {
  return "Hello";
});

app.get(
  "/api/rooms",
  async () =>
    new Response(JSON.stringify(await getRooms()), {
      headers: {
        "Content-Type": "application/json",
      },
    })
);

app.get("/api/rooms/:id", async (c) => {
  const res = await getRoom(c.params.id);
  if (res) {
    return res;
  }

  return {};
});

app.get(
  "/api/booking",
  async () =>
    new Response(JSON.stringify(await getBooking()), {
      headers: {
        "Content-Type": "application/json",
      },
    })
);

app.get("/api/booking/:id", async (c) => {
  return await getBookings(c.params.id);
});

app.get("/api/booking/day", getBookingDay);

app.delete("api/booking/:id", async (c) => {
  return await deleteBooking(c.params.id);
});

app.post(
  "/api/user",
  async ({ body }) => {
    try {
      await addUser(body);
    } catch (err) {
      return new Response(
        JSON.stringify({ status: "ERROR", message: err.message }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 400,
        }
      );
    }

    return { status: "OK" };
  },
  {
    body: t.Object({
      phone: t.Integer(),
      name: t.String(),
      password: t.String(),
    }),
  }
);

app.post(
  "/api/booking",
  async ({ body }) => {
    try {
      await addBooking(body);
    } catch (err) {
      return new Response(
        JSON.stringify({ status: "ERROR", message: err.message }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 400,
        }
      );
    }

    return { status: "OK" };
  },
  {
    body: t.Object({
      room: t.Integer(),
      user: t.Integer(),
      startDate: t.Integer(),
      endDate: t.Integer(),
    }),
  }
);

app.post(
  "api/room",
  async ({ body }) => {
    return await addRoom(body);
  },
  {
    body: t.Object({
      id: t.Integer(),
      name: t.String(),
      numberOfPlaces: t.Integer(),
    }),
  }
);

app.listen(8080);

console.log(
  `🦊 Elysia is running at on port ${app.server?.hostname}:${app.server?.port}`
);
