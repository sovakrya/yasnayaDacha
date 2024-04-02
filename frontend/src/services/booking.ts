export type Room = {
  id: number;
  name: string;
  numberOfPlaces: number;
  description: string;
};

export async function getRooms({
  numberOfPlaces,
  startDate,
  endDate,
}: {
  numberOfPlaces: number;
  startDate: number;
  endDate: number;
}): Promise<Room[]> {
  const response = await fetch(`/api/rooms`, {
    headers: {
      "Content-Type": "application/json",
    },

    method: "POST",

    body: JSON.stringify({ numberOfPlaces, startDate, endDate }),
  });

  return response.json();
}

type BookingRoom = {
  room: number;
  user: number;
  startDate: number;
  endDate: number;
  name: string;
  lastName: string;
  secondName: string;
  phone: string;
  mail: string;
};
export async function bookRoom({
  room,
  user,
  startDate,
  endDate,
  name,
  lastName,
  secondName,
  phone,
  mail,
}: BookingRoom): Promise<
  | { status: 200 }
  | {
      fields: {
        name?: string;
        lastName?: string;
        secondName?: string;
        phone?: string;
        mail?: string;
      };
      status: 400;
      message: string;
    }
> {
  const response = await fetch("/api/booking", {
    headers: {
      "Content-Type": "application/json",
    },

    method: "POST",

    body: JSON.stringify({
      room,
      user,
      startDate,
      endDate,
      name,
      lastName,
      secondName,
      phone,
      mail,
    }),
  });

  return response.json();
}

export async function addUser({
  phone,
  name,
  lastName,
  secondName,
  mail,
}: {
  phone: string;
  name: string;
  lastName: string;
  secondName: string;
  mail: string;
}) {
  const response = await fetch("/api/user", {
    headers: {
      "Content-Type": "application/json",
    },

    method: "POST",

    body: JSON.stringify({
      phone,
      name,
      lastName,
      secondName,
      mail,
    }),
  });

  return response.json();
}

export async function getBooking() {
  const response = await fetch("/api/booking");

  return response.json();
}
