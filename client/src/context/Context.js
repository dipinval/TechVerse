// context/Context.js

import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const login = (userData) => {
    // Your login logic here, check for admin credentials
    if (userData.username === 'Admin' && userData.password === 'admin1234') {
      // Set the user as an admin
      dispatch({ type: 'LOGIN', payload: { ...userData, role: 'admin' } });
    } else {
      // Regular user login logic
      dispatch({ type: 'LOGIN', payload: userData });
    }
  };

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        login,
      }}
    >
      {children}
    </Context.Provider>
  );
};
