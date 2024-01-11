export async function getRooms({ numberOfPlaces, startDate, endDate }) {
  const response = await fetch(`/api/rooms`, {
    headers: {
      'Content-Type': 'application/json'
    },

    method: 'POST',

    body: JSON.stringify({ numberOfPlaces, startDate, endDate })
  })

  return response.json()
}

export async function bookRoom({ room, user, startDate, endDate }) {
  const response = await fetch('/api/booking', {
    headers: {
      'Content-Type': 'application/json'
    },

    method: 'POST',

    body: JSON.stringify({ room, user, startDate, endDate })
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

export async function getBooking() {
  const response = await fetch('/api/booking')

  return response.json()
}
