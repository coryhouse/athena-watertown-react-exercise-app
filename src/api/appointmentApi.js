// API Proxies. These functions call our API
// Centralizing here for consistency, reuse, and to provide for mocking
export async function getAppointments() {
  return fetch("http://localhost:3001/appointments").then(handleResponse);
}

export async function getAppointmentById(appointmentId) {
  return (
    fetch(`http://localhost:3001/appointments?id=${appointmentId}`)
      .then(handleResponse)
      // API returns an array for query, so take first match.
      .then(appointments => appointments[0])
  );
}

export async function deleteAppointment(appointmentId) {
  return fetch(`http://localhost:3001/appointments/${appointmentId}`, {
    method: "DELETE",
  });
}

export async function addAppointment(appointment) {
  return fetch("http://localhost:3001/appointments", {
    method: "POST",
    body: JSON.stringify(appointment),
    headers: {
      "content-type": "application/json",
    },
  }).then(handleResponse);
}

export async function editAppointment(appointment) {
  return fetch(`http://localhost:3001/appointments/${appointment.id}`, {
    method: "PUT",
    body: JSON.stringify(appointment),
    headers: {
      "content-type": "application/json",
    },
  }).then(handleResponse);
}

// Centralized response handler
async function handleResponse(response) {
  if (response.ok) return response.json();
  throw new Error("Network response was not okay");
}
