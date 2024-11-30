import React, { useContext, useState } from 'react';
import styles from './ProjectSuggestion.module.scss';

import { AppContext } from '../../hooks/AppContext';

const ProjectSuggestion = ({ data }) => {
  const { state } = useContext(AppContext);

  // btn status
  const [accept, setAccept] = useState(false);
  const [decline, setDecline] = useState(false);

  // Handle accept action
  const handleAccept = async () => {
    try {
      const response = await fetch('http://110.35.174.14:8080/accept-module', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: state.user.name,
          data: data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept module');
      }

      const result = await response.json();

      // change state
      setAccept(true);
      setDecline(false);

      console.log('Module accepted:', result);
    } catch (error) {
      console.error('Error accepting module:', error);
    }
  };

  // Handle decline action
  const handleDecline = async () => {
    try {
      const response = await fetch('http://110.35.174.14:8080/decline-module', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: state.user.name,
          data: data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to decline module');
      }

      const result = await response.json();
      console.log('Module declined:', result);

      // change state
      setDecline(true);
      setAccept(false);

    } catch (error) {
      console.error('Error declining module:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.info}>
          <h3>{data.function_name}</h3>
          <p><strong>Goal:</strong> {data.goal}</p>
          <p>
            <strong>Materials:</strong>{" "}
            {data.materials.map((material, index) => (
              <span key={index} className={styles.material}>
                {material}{index < data.materials.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
        <div className={styles.actions}>
          <button
            className={`${styles.checkButton} ${accept ? styles.selected : ''}`}
            onClick={handleAccept}
          >
            ✔
          </button>
          <button
            className={`${styles.crossButton} ${decline ? styles.selected : ''}`}
            onClick={handleDecline}
          >
            ✘
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSuggestion;
