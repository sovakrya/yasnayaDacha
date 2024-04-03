import { Database } from "bun:sqlite";

type Room = {
  id: number;
  numberOfPlaces: number;
  name: string;
  description: string;
};

type User = {
  id: number;
  phone: string;
  name: string;
  lastName: string;
  secondName: string;
  mail: string;
};

type Booking = {
  id: number;
  room: number;
  user: number;
  start: number;
  end: number;
};

const db = new Database("booking.sqlite");

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  phone TEXT,
  name TEXT,
  lastName TEXT,
  secondName TEXT, 
  mail TEXT
  )`);

db.run(`CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    numberOfPlaces INTEGER,
    description TEXT
  )`);

db.run(`CREATE TABLE IF NOT EXISTS booking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room INTEGER,
    user INTEGER,
    start INTEGER CHECK(start < end), 
    end INTEGER,
    FOREIGN KEY(room) REFERENCES rooms(id),
    FOREIGN KEY(user) REFERENCES users(id)
    )`);

const insertRoomQuery = db.query<
  Room,
  { $name: string; $numberOfPlaces: number; $description: string }
>(`
INSERT OR IGNORE INTO rooms (name, numberOfPlaces, description) 
VALUES 
($name, $numberOfPlaces, $description)
`);

const insertUserQuery = db.query<
  User,
  {
    $phone: string;
    $name: string;
    $lastName: string;
    $secondName: string;
    $mail: string;
  }
>(`
INSERT OR IGNORE INTO users (phone, name, lastName, secondName, mail) 
VALUES 
($phone, $name, $lastName, $secondName, $mail )
`);

const insertBookingQuery = db.query<
  Booking,
  { $room: number; $user: number; $start: number; $end: number }
>(`
INSERT INTO booking (room, user, start, end)
VALUES
($room, $user, $start, $end)
`);

const getRoomsQuery = db.query<Room, []>(`SELECT * FROM rooms`);

const getBookingQuery = db.query<Booking, []>(`SELECT * FROM booking`);

const getUsersQuery = db.query<User, []>(`SELECT * FROM users`);

const getBookingDaysQuery = db.query<{ start: number; end: number }, { $room: number }>(`
SELECT start, end FROM booking
WHERE room = $room 
`);

const findMatchInBooking = db.query<
  { exist: boolean },
  { $start: number; $end: number; $room: number }
>(`
SELECT EXISTS (SELECT 1 FROM booking
    WHERE
    (room = $room) AND 
    (
      start BETWEEN $start AND $end OR 
      end BETWEEN $start AND $end OR
      $start BETWEEN start AND end OR 
      $end BETWEEN start AND end 
      )
    ) AS exist
`);

const findMatchInUsers = db.query<
  { existUser: boolean },
  { $phone: string; $name: string; $lastName: string; $secondName: string; $mail: string }
>(
  `
  SELECT EXISTS (SELECT 1 FROM users
    WHERE
    phone = $phone OR
    name = $name OR 
    lastName = $lastName OR
    secondName = $secondName OR
    mail = $mail
    ) AS existUser
  `
);

export async function addRoom({
  name,
  numberOfPlaces,
  description,
}: {
  name: string;
  numberOfPlaces: number;
  description: string;
}) {
  insertRoomQuery.run({
    $name: name,
    $numberOfPlaces: numberOfPlaces,
    $description: description,
  });
}

export async function addBooking({
  room,
  user,
  start,
  end,
  name,
  lastName,
  secondName,
  phone,
  mail,
}: {
  room: number;
  user: number;
  start: number;
  end: number;
  name: string;
  lastName: string;
  secondName: string;
  phone: string;
  mail: string;
}) {
  const { existUser } = findMatchInUsers.get({
    $phone: phone,
    $name: name,
    $lastName: lastName,
    $secondName: secondName,
    $mail: mail,
  })!;

  if (!existUser) {
    insertUserQuery.run({
      $phone: phone,
      $name: name,
      $lastName: lastName,
      $secondName: secondName,
      $mail: mail,
    });
  }

  const { exist } = findMatchInBooking.get({
    $room: room,
    $start: start,
    $end: end,
  })!;

  if (!exist) {
    insertBookingQuery.run({
      $room: room,
      $user: user,
      $start: start,
      $end: end,
    });

    return console.log("The room is booked");
  } else {
    throw new Error("wrong date");
  }
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
  try {
    insertUserQuery.run({
      $phone: phone,
      $name: name,
      $lastName: lastName,
      $secondName: secondName,
      $mail: mail,
    });
  } catch (e) {
    throw new Error("wrong user value");
  }
}

export async function getRooms({
  numberOfPlaces,
  start,
  end,
}: {
  numberOfPlaces?: number;
  start?: number;
  end?: number;
}) {
  const rooms = getRoomsQuery.all();

  if (!numberOfPlaces && !start && !end) {
    return rooms;
  }

  const res = rooms.filter((room) => {
    if (numberOfPlaces) {
      if (room.numberOfPlaces < numberOfPlaces) {
        return false;
      }
    }

    if (start && end) {
      const { exist } = findMatchInBooking.get({
        $start: start,
        $end: end,
        $room: room.id,
      })!;

      return !exist;
    }

    return true;
  });

  return res;
}

export async function getBooking() {
  return getBookingQuery.all();
}

export async function getBookingDays({ room }: { room: number }) {
  return getBookingDaysQuery.all({ $room: room });
}

export async function getUsers() {
  return getUsersQuery.all();
}
