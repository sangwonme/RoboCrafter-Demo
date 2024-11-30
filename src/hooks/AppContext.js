import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = {
  user: { name: null, age: 30 },
  theme: "light",
  notifications: [],
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [...state.notifications, action.payload] };
    default:
      return state;
  }
};

// Create Context
export const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
