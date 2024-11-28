import './App.css';
import React, { useEffect } from "react";
import FloorManagement from './components/RoomTab';
import { useDispatch } from "react-redux";
import { fetchRooms } from "./redux/tableSlice";
import { TableProvider } from './context/tableContext';

function App () {
  return (
    <TableProvider>
      <FloorManagement/>
      </TableProvider>
  ); 
} 
          
export default App;