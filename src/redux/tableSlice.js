import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
}

const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    // Add a new room
    addRoom: (state, action) => {
      const { id, name } = action.payload;
      state.rooms.push({ id, name, tables: [] });
    },
    // Add a table to a room
    addTable: (state, action) => {
      const { roomId, table } = action.payload;
      const room = state.rooms.find((room) => room.id === roomId);
      if (room) {
        room.tables.push(table);
      }
    },
    // Update table position (drag and drop)
    updateTable: (state, action) => {
      const { roomId, tableId, x, y } = action.payload;
      const room = state.rooms.find((room) => room.id === roomId);
      if (room) {
        const table = room.tables.find((t) => t.id === tableId);
        if (table) {
          table.x = x;
          table.y = y;
        }
      }
    },
    // Delete a table
    deleteTable: (state, action) => {
      const { roomId, tableId } = action.payload;
      const room = state.rooms.find((room) => room.id === roomId);
      if (room) {
        room.tables = room.tables.filter((t) => t.id !== tableId);
      }
    },
  },
});

export const { addRoom, addTable, updateTable, deleteTable } = tableSlice.actions;
export default tableSlice.reducer;

// Save state to localStorage
export const saveStateToLocalStorage = (state) => {
  localStorage.setItem("floorManagementState", JSON.stringify(state));
};

// Load state from localStorage
export const loadStateFromLocalStorage = () => {
  const savedState = localStorage.getItem("floorManagementState");
  return savedState ? JSON.parse(savedState) : { rooms: [] };
};
