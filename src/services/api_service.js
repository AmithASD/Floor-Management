const API_URL = "http://localhost:3000/api/tables";

// Fetch all rooms
export const fetchRoomsAPI = async () => {
  const response = await fetch(`${API_URL}/rooms`);
  if (!response.ok) throw new Error("Failed to fetch rooms");
  return await response.json();
};

// Save a room
export const saveRoom = async (room) => {
  const response = await fetch(`${API_URL}/add-room`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room),
  });
  if (!response.ok) throw new Error("Failed to save room");
  return await response.json();
};

// Save a table
export const saveTable = async (roomId, table) => {
  const response = await fetch(`${API_URL}/add-table`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId, table }),
  });
  if (!response.ok) throw new Error("Failed to save table");
  return await response.json();
};

// Update a table
export const updateTableAPI = async (tableData) => {
  const response = await fetch(`${API_URL}/update-table`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tableData),
  });
  if (!response.ok) throw new Error("Failed to update table");
  return await response.json();
};

// Delete a table
export const deleteTable = async (roomId, tableId) => {
  const response = await fetch(`${API_URL}/delete-table`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId, tableId }),
  });
  if (!response.ok) throw new Error("Failed to delete table");
};
