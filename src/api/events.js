const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

async function http(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function fetchEvents(params = {}) {
  const query = new URLSearchParams(params).toString();
  const suffix = query ? `?${query}` : "";
  return http(`/api/events${suffix}`);
}

export async function createEvent(event) {
  return http(`/api/events`, {
    method: "POST",
    body: JSON.stringify(event),
  });
}

export async function updateEvent(id, event) {
  return http(`/api/events/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(event),
  });
}

export async function deleteEvent(id) {
  return http(`/api/events/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
