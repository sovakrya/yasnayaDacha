import { Elysia, t } from "elysia";
import { getBooking, getRooms, addUser, addBooking, addRoom, getUsers, getBookingDays } from "./db";

const app = new Elysia({});

app.get("/api/booking", async () => {
  return new Response(JSON.stringify(await getBooking()), {
    headers: {
      "Content-Type": "application/json",
    },
  });
});

app.get("/api/users", async () => {
  return new Response(JSON.stringify(await getUsers()), {
    headers: {
      "Content-Type": "application/json",
    },
  });
});

app.get(
  "/api/bookingDays",
  async ({ query }) => {
    const bookingDays = await getBookingDays(query);

    return new Response(JSON.stringify(bookingDays));
  },
  {
    query: t.Object({
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
      startDate: t.Optional(t.Integer()),
      endDate: t.Optional(t.Integer()),
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
  "/api/booking",
  async ({ body }) => {
    let validErrors: {
      name?: string;
      lastName?: string;
      secondName?: string;
      phone?: string;
      mail?: string;
    } = {};

    if (!body.name) {
      validErrors.name = "Имя должно быть заполненно";
    }

    if (!body.lastName) {
      validErrors.lastName = "Фамилия должна быть заполненна";
    }

    if (!body.secondName) {
      validErrors.secondName = "Отчество должно быть заполненно";
    }

    const phoneErrorMsg = validatePhone(body.phone);
    if (phoneErrorMsg) {
      validErrors.phone = phoneErrorMsg;
    }

    const mailErrorMsg = validateMail(body.mail);
    if (mailErrorMsg) {
      validErrors.mail = mailErrorMsg;
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
      startDate: t.Integer(),
      endDate: t.Integer(),
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
    return "Номер телефона должен быть заполннен";
  }

  if (phone.length !== 11 || phone !== String(Number(phone))) {
    return "Неправильный номер телефона";
  }
}

function validateMail(mail: string) {
  if (!mail) {
    return "Электронная почта должна быть заполненна";
  }

  const msg = "Неправильнный адрес электронной почты";
  const mailWithoutAt = mail.split("@");

  if (mailWithoutAt.length !== 2) {
    return msg;
  }

  const domains = mailWithoutAt.at(1)!.split(".");

  if (/[()<>@,;:\\".[\] ]/.test(domains.at(-1)!)) {
    return msg;
  }
}
