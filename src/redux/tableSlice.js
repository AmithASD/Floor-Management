import { createSlice } from "@reduxjs/toolkit";

// API Functions
import { saveRoom, saveTable, updateTableAPI, deleteTable } from "../services/api_service";

const initialState = {
  rooms: [],
};

const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    addRoomLocal: (state, action) => {
      state.rooms.push(action.payload);
    },
    addTableLocal: (state, action) => {
      const { roomId, table } = action.payload;
      const room = state.rooms.find((room) => room.id === roomId);
      if (room) {
        room.tables.push(table);
      }
    },
    updateTableLocal: (state, action) => {
      const { roomId, tableId, x, y, ...rest } = action.payload;
      const room = state.rooms.find((room) => room.id === roomId);
      if (room) {
        const table = room.tables.find((t) => t.id === tableId);
        if (table) {
          table.x = x || table.x;
          table.y = y || table.y;
          Object.assign(table, rest);
        }
      }
    },
    removeTableLocal: (state, action) => {
      const { roomId, tableId } = action.payload;
      const room = state.rooms.find((room) => room.id === roomId);
      if (room) {
        room.tables = room.tables.filter((table) => table.id !== tableId);
      }
    },
  },
});

export const {
  setRooms,
  addRoomLocal,
  addTableLocal,
  updateTableLocal,
  removeTableLocal,
} = tableSlice.actions;

export const fetchRooms = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3000/api/tables/rooms");
    const rooms = await response.json();
    dispatch(setRooms(rooms));
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};

export const addRoom = (room) => async (dispatch) => {
  try {
    const savedRoom = await saveRoom(room);
    dispatch(addRoomLocal(savedRoom));
  } catch (error) {
    console.error("Error adding room:", error);
  }
};

export const addTable = (roomId, table) => async (dispatch) => {
  try {
    const savedRoom = await saveTable(roomId, table);
    dispatch(addTableLocal({ roomId, table }));
  } catch (error) {
    console.error("Error adding table:", error);
  }
};

export const updateTable = (tableData) => async (dispatch) => {
  try {
    const updatedRoom = await updateTableAPI(tableData);
    dispatch(updateTableLocal(tableData));
  } catch (error) {
    console.error("Error updating table:", error);
  }
};

export const removeTable = (roomId, tableId) => async (dispatch) => {
  try {
    await deleteTable(roomId, tableId);
    dispatch(removeTableLocal({ roomId, tableId }));
  } catch (error) {
    console.error("Error deleting table:", error);
  }
};

export default tableSlice.reducer;
