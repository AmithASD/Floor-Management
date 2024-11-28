import './App.css';
import React, { useEffect } from "react";
import FloorManagement from './components/RoomTab';
import { useDispatch } from "react-redux";
import { fetchRooms } from "./redux/tableSlice";

// function App () {
//   return (
//     <div className="App">
//       <FloorManagement/>
//     </div> 
//   ); 
// } 

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return <FloorManagement />;
};
          
export default App;