export async function getRooms() {
  const response = await fetch('/api/rooms')

  return response.json()
}

export async function bookRoom({ id, room, user, startDate, endDate }) {
  const response = await fetch('/api/booking', {
    headers: {
      'Content-Type': 'application/json'
    },

    method: 'POST',

    body: JSON.stringify({ id, room, user, startDate, endDate })
  })

  return response.json()
}

export async function addUser({ phone, name, password }) {
  const response = await fetch('/api/user', {
    headers: {
      'Content-Type': 'application/json'
    },

    method: 'POST',

    body: JSON.stringify({ phone, name, password })
  })

  return response.json()
}
