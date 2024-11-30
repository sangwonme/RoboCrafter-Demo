import React, { useContext } from 'react';
import { AppContext } from '../hooks/AppContext';

const MyComponent = () => {
  const { dispatch } = useContext(AppContext);

  return (
    <div>
      <h1>MyComponent</h1>
      <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        Toggle Theme
      </button>
      <button
        onClick={() =>
          dispatch({ type: "UPDATE_USER", payload: { name: "Jane Doe" } })
        }
      >
        Update User Name
      </button>
      <button
        onClick={() =>
          dispatch({ type: "ADD_NOTIFICATION", payload: "New Notification" })
        }
      >
        Add Notification
      </button>
    </div>
  );
};

export default MyComponent;
