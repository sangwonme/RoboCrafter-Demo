import React, { useContext, useState } from 'react';
import { AppContext } from '../hooks/AppContext';
import styles from './Login.module.scss';

const Login = ({ onLogin }) => {
  const { dispatch } = useContext(AppContext);
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    if (username.trim()) {
      // Update the user in the app context
      dispatch({ type: 'UPDATE_USER', payload: { name: username } });

      // Call the /init API
      try {
        const response = await fetch('http://110.35.174.14:8080/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        if (!response.ok) {
          throw new Error(`Failed to initialize: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Initialization successful:', data);
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleLogin();
          }}
        />
      </div>
    </div>
  );
};

export default Login;
