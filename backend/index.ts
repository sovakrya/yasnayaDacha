import { Elysia, t } from "elysia";
import {
  getBooking,
  getRooms,
  addUser,
  addBooking,
  addRoom,
  getUsers,
  getBookingDays,
  updateUser,
  updateRoom,
  updateBooking,
  deleteUser,
  deleteRoom,
  deleteBooking,
} from "./db";

const app = new Elysia({});

const headers = {
  "Content-Type": "application/json",
};

app.get("/api/booking", async () => {
  return new Response(JSON.stringify(await getBooking()), {
    headers,
  });
});

app.get("/api/users", async () => {
  return new Response(JSON.stringify(await getUsers()), {
    headers,
  });
});

app.post(
  "/api/bookingDays",
  async ({ body }) => {
    const bookingDays = await getBookingDays(body);

    return new Response(JSON.stringify(bookingDays), {
      headers,
    });
  },
  {
    body: t.Object({
      room: t.Integer(),
      from: t.Optional(t.Integer()),
      to: t.Optional(t.Integer()),
    }),
  }
);

app.post(
  "/api/rooms",
  async ({ body }) => {
    return new Response(JSON.stringify(await getRooms(body)), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  {
    body: t.Object({
      numberOfPlaces: t.Optional(t.Integer()),
      start: t.Optional(t.Integer()),
      end: t.Optional(t.Integer()),
    }),
  }
);

app.post(
  "/api/user",
  async ({ body }) => {
    try {
      await addUser(body);
    } catch (err) {
      let msg: string;
      if (err instanceof Error) {
        msg = err.message;
      } else {
        msg = String(err);
      }
      return new Response(JSON.stringify({ status: "ERROR", message: msg }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }

    return { status: 200 };
  },
  {
    body: t.Object({
      phone: t.String(),
      name: t.String(),
      lastName: t.String(),
      secondName: t.String(),
      mail: t.String(),
    }),
  }
);

app.post(
  "api/room",
  async ({ body }) => {
    try {
      await addRoom(body);
    } catch (err) {
      let msg: string;
      if (err instanceof Error) {
        msg = err.message;
      } else {
        msg = String(err);
      }
      return new Response(JSON.stringify({ status: "ERROR", message: msg }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }

    return { status: 200 };
  },
  {
    body: t.Object({
      name: t.String(),
      numberOfPlaces: t.Integer(),
      description: t.String(),
    }),
  }
);

app.post(
  "api/updateUser",
  async ({ body }) => {
    await updateUser(body);

    return { status: 200 };
  },
  {
    body: t.Object({
      id: t.Integer(),
      phone: t.String(),
      name: t.String(),
      lastName: t.String(),
      secondName: t.String(),
      mail: t.String(),
    }),
  }
),
  app.post(
    "api/updateRoom",
    async ({ body }) => {
      await updateRoom(body);

      return { status: 200 };
    },

    {
      body: t.Object({
        id: t.Integer(),
        name: t.String(),
        numberOfPlaces: t.Integer(),
        description: t.String(),
      }),
    }
  );

app.post(
  "api/updateBooking",
  async ({ body }) => {
    await updateBooking(body);

    return { status: 200 };
  },
  {
    body: t.Object({
      id: t.Integer(),
      room: t.Integer(),
      user: t.Integer(),
      start: t.Integer(),
      end: t.Integer(),
    }),
  }
);

app.post(
  "api/deleteUser",
  async ({ body }) => {
    await deleteUser(body);

    return { status: 200 };
  },
  {
    body: t.Object({
      id: t.Integer(),
    }),
  }
);

app.post(
  "api/deleteRoom",
  async ({ body }) => {
    await deleteRoom(body);

    return { status: 200 };
  },
  {
    body: t.Object({
      id: t.Integer(),
    }),
  }
);

app.post(
  "api/deleteBooking",
  async ({ body }) => {
    await deleteBooking(body);

    return { status: 200 };
  },
  {
    body: t.Object({
      id: t.Integer(),
    }),
  }
);
app.post(
  "/api/booking",
  async ({ body }) => {
    const validErrors: {
      name?: string;
      lastName?: string;
      secondName?: string;
      phone?: string;
      mail?: string;
      dates?: string;
    } = {};

    if (!body.name) {
      validErrors.name = "Имя должно быть заполнено";
    }

    if (!body.lastName) {
      validErrors.lastName = "Фамилия должна быть заполнена";
    }

    if (!body.secondName) {
      validErrors.secondName = "Отчество должно быть заполнено";
    }

    const phoneErrorMsg = validatePhone(body.phone);
    if (phoneErrorMsg) {
      validErrors.phone = phoneErrorMsg;
    }

    const mailErrorMsg = validateMail(body.mail);
    if (mailErrorMsg) {
      validErrors.mail = mailErrorMsg;
    }

    const today = new Date().getTime();
    if (body.end < today || body.start < today || body.start > body.end) {
      validErrors.dates = "Некорректная дата";
    }

    if (Object.keys(validErrors).length) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Required fields are missing",
          fields: validErrors,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 400,
        }
      );
    }

    try {
      await addBooking(body);
    } catch (err) {
      let msg: string;
      if (err instanceof Error) {
        msg = err.message;
      } else {
        msg = String(err);
      }
      return new Response(JSON.stringify({ status: "400", message: msg }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }

    return { status: 200 };
  },
  {
    body: t.Object({
      room: t.Integer(),
      user: t.Integer(),
      start: t.Integer(),
      end: t.Integer(),
      phone: t.String(),
      name: t.String(),
      lastName: t.String(),
      secondName: t.String(),
      mail: t.String(),
    }),
  }
);

app.listen(8080);

console.log(`🌈 Elysia is running at on port ${app.server?.hostname}:${app.server?.port}`);

function validatePhone(phone: string) {
  if (!phone) {
    return "Номер телефона должен быть заполнен";
  }

  if (phone.length !== 11 || phone !== String(Number(phone))) {
    return "Неправильный номер телефона";
  }
}

function validateMail(mail: string) {
  if (!mail) {
    return "Электронная почта должна быть заполнена";
  }

  const msg = "Неправильный адрес электронной почты";
  const mailWithoutAt = mail.split("@");

  if (mailWithoutAt.length !== 2) {
    return msg;
  }

  const domains = mailWithoutAt.at(1)!.split(".");

  if (/[()<>@,;:\\".[\] ]/.test(domains.at(-1)!)) {
    return msg;
  }
}
