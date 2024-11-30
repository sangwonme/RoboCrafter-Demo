import React, { useContext } from 'react';
import { AppContext } from './hooks/AppContext';
import styles from './App.module.scss';

import Wokwi from "./components/Wokwi";
import MainUI from './components/MainUI';
import Login from './components/Login';

const App = () => {
  const { state } = useContext(AppContext);

  return (
    // Test Code
    // <div>
    //   <Message text="hi" sender="not me"/>
    //   <Message text="hello there" sender="me"/>
    //   <h1>Main Component</h1>
    //   <MyComponent/>
    //   <p>User Name: {state.user.name}</p>
    //   <p>Theme: {state.theme}</p>
    //   <p>Notifications: {state.notifications.length}</p>
    // </div>
    <>
      {!state.user.name && <Login/>}

      <div className={styles.container}>
        <div className={styles.wokwi}>
          <Wokwi/>
        </div>
        <div className={styles.robocrafter}>
          <MainUI/>
        </div>
      </div>
    </>
  );
};

export default App;
