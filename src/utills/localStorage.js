// ../utills/localStorage.js
export const saveStateToLocalStorage = (state) => {
  localStorage.setItem("floorManagementState", JSON.stringify(state));
};

export const loadStateFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem("floorManagementState");
    return savedState ? JSON.parse(savedState) : { rooms: [] };
  } catch (err) {
    console.error("Error loading from localStorage", err);
    return null;
  }
};
