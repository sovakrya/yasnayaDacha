import { Database } from "bun:sqlite";

const db = new Database("booking.sqlite");

db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    phone INTEGER NOT NULL UNIQUE,
    name TEXT,
    password TEXT 
    )`
);

db.run(`CREATE TABLE IF NOT EXISTS rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  numberOfPlaces INTEGER
)`);

db.run(`CREATE TABLE IF NOT EXISTS booking (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room INTEGER,
  user INTEGER,
  startDate INTEGER CHECK(startDate < endDate), 
  endDate INTEGER CHECK(endDate > startDate),
  FOREIGN KEY(room) REFERENCES rooms(id),
  FOREIGN KEY(user) REFERENCES users(id)
  )`);

// db.run(`CREATE TRIGGER IF NOT EXISTS correctDate
//  BEFORE INSERT ON booking
//  BEGIN
//    SELECT RAISE (FAIL, 'wrong date or room') FROM booking
//    WHERE room  = NEW.room AND
//    (
//    startDate BETWEEN NEW.startDate AND NEW.endDate OR
//    endDate BETWEEN NEW.startDate AND NEW.endDate OR
//    NEW.startDate BETWEEN startDate AND endDate OR
//    NEW.endDate BETWEEN startDate AND endDate
//    );
//  END
// `);

const insertPhoneQuery = db.query(
  `INSERT OR IGNORE INTO users (phone, name, password) VALUES 
  ($phone, $name, $password)
  `
);

const insertBookingQuery = db.query(
  `
  INSERT INTO booking (room, user, startDate, endDate)
  VALUES
  ($room, $user, $startDate, $endDate)
  `
);

const checkMatchBooking = db.query(`
  SELECT EXISTS (SELECT 1 FROM booking
  WHERE
  (room = $room) AND 
  (
    startDate BETWEEN $startDate AND $endDate OR 
    endDate BETWEEN $startDate AND $endDate OR
    $startDate BETWEEN startDate AND endDate OR 
    $endDate BETWEEN startDate AND endDate 
    )
  ) as exist
`);

const deleteBookingQuery = db.query(`DELETE FROM booking WHERE id = $id`);

const getRoomsQuery = db.query(`SELECT * FROM rooms `);

const getRoomQuery = db.query(`SELECT * FROM rooms WHERE id = $id`);

const getBookingDayQuery = db.query(`SELECT startDate, endDate FROM booking`);

const getBookingQuery = db.query(`SELECT * FROM booking`);

const getBookingsQuery = db.query(`SELECT * FROM booking WHERE id = $id`);

const addRoomQuery = db.query(
  `INSERT OR IGNORE INTO rooms (name, numberOfPlaces) VALUES ($name, $numberOfPlaces)`
);

const getUserQuery = db.query("SELECT * FROM users WHERE phone = $phone");

export async function addUser({ phone, name, password }) {
  try {
    insertPhoneQuery.run({ $phone: phone, $name: name, $password: password });
  } catch (e) {
    console.log(e);
  }
}

export async function addBooking({ room, user, startDate, endDate }) {
  const { exist } = checkMatchBooking.get({
    $room: room,
    $startDate: startDate,
    $endDate: endDate,
  });

  if (!exist) {
    insertBookingQuery.run({
      $room: room,
      $user: user,
      $startDate: startDate,
      $endDate: endDate,
    });

    return null;
  } else {
    throw new Error("wrong date or room");
  }
}

export async function deleteBooking(user) {
  try {
    deleteBookingQuery.run(user);
  } catch (e) {
    console.log(e);
  }
}

export async function getRooms({ numberOfPlaces, startDate, endDate }) {
  const rooms = getRoomsQuery.all();
  const res = rooms.filter((room) => {
    if (room.numberOfPlaces <= numberOfPlaces) {
      return false;
    }

    const { exist } = checkMatchBooking.get({
      $startDate: startDate,
      $endDate: endDate,
      $room: room.id,
    });

    return !exist;
  });

  return res;
}

export async function getRoom(id) {
  return getRoomQuery.get(id);
}

export async function getBookingDay() {
  return getBookingDayQuery.all();
}

export async function addRoom({ name, numberOfPlaces }) {
  addRoomQuery.run({
    $name: name,
    $numberOfPlaces: numberOfPlaces,
  });
}

export async function getBooking() {
  return getBookingQuery.all();
}

export async function getBookings() {
  return getBookingsQuery.get();
}
