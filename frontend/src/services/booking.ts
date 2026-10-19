export type Room = {
  id: number;
  name: string;
  numberOfPlaces: number;
  squareMeter: number;
  price: number;
  description: string;
};

export type User = {
  id: number;
  phone: string;
  name: string;
  lastName: string;
  secondName: string;
  mail: string;
};

export type Image = {
  id: number;
  room: number;
  path: string;
  mime: string;
  hash: string;
  sort: number | null;
  isMain: boolean;
};

export async function getRooms({
  numberOfPlaces,
  start,
  end,
}: {
  numberOfPlaces?: number;
  start?: number;
  end?: number;
} = {}): Promise<Room[]> {
  const response = await fetch(`/api/rooms`, {
    headers: {
      "Content-Type": "application/json",
    },

    method: "POST",

    body: JSON.stringify({ numberOfPlaces, start, end }),
  });

  return response.json();
}

type BookingRoom = {
  room: number;
  user: number;
  start: number;
  end: number;
  name: string;
  lastName: string;
  secondName: string;
  phone: string;
  mail: string;
};
export async function bookRoom({
  room,
  user,
  start,
  end,
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
        dates?: string;
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
      start,
      end,
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

export async function getBookingDays({
  room,
}: {
  room: number;
}): Promise<{ start?: number; end: number }[]> {
  const response = await fetch("/api/bookingDays", {
    headers: {
      "Content-Type": "application/json",
    },

    method: "POST",

    body: JSON.stringify({
      room,
    }),
  });

  return response.json();
}

export async function getUsers(): Promise<User[]> {
  const resp = await fetch("/api/users");

  return resp.json();
}

export async function updateRoom(room: Room) {
  const resp = await fetch("/api/updateRoom", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",

    body: JSON.stringify(room),
  });

  return resp.json();
}

export async function deleteRoom(id: number) {
  const resp = await fetch("/api/deleteRoom", {
    headers: {
      "Content-Type": "application/json",
    },

    method: "POST",

    body: JSON.stringify({ id }),
  });

  return resp.json();
}

export async function getAllImages(): Promise<Image[]> {
  const resp = await fetch("/api/images");

  return resp.json();
}

export async function getRoomImages(roomId: number): Promise<Image[]> {
  const resp = await fetch("/api/roomImages", {
    headers: {
      "Content-Type": "application/json",
    },

    method: "POST",

    body: JSON.stringify({ roomId }),
  });

  return resp.json();
}

export async function getMainImage(roomId: number): Promise<Image> {
  const resp = await fetch("api/mainRoomImage", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",

    body: JSON.stringify({ roomId }),
  });

  return resp.json();
}

export async function addImage(roomId: number, image: File, isMain: boolean, sort?: number | null) {
  const formData = new FormData();

  formData.append("room", String(roomId));
  formData.append("image", image);
  formData.append("isMain", isMain ? "true" : "false");

  if (sort !== undefined || sort !== null) formData.append("sort", String(sort));

  const resp = await fetch("api/addRoomImages", {
    method: "POST",
    body: formData,
  });

  return resp;
}
