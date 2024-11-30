import React, { useEffect, useState, useContext } from 'react';

import { AppContext } from '../../hooks/AppContext';
import styles from './TutorialList.module.scss';

const TutorialList = ({ tutorials, onTutorialClick, userName }) => {
  const { state } = useContext(AppContext);

  const [statusMap, setStatusMap] = useState({}); // Map to store the "done" status of tutorials

  useEffect(() => {
    const fetchStatuses = async () => {
      const statuses = {};

      // Fetch "done" status for each tutorial
      await Promise.all(
        tutorials.map(async (tutorial) => {
          try {
            const response = await fetch(
              `http://110.35.174.14:8080/get-tutorial-done?username=${state.user.name}&tutorial_name=${encodeURIComponent(
                tutorial
              )}`
            );
            if (response.ok) {
              const data = await response.json();
              statuses[tutorial] = data.done; // Store the "done" status
              console.log(tutorial, data.done);
            } else {
              statuses[tutorial] = false; // Default to false on error
            }
          } catch (error) {
            console.error(`Error fetching status for ${tutorial}:`, error);
            statuses[tutorial] = false; // Default to false on error
          }
        })
      );

      setStatusMap(statuses); // Update the status map state
    };

    fetchStatuses();
  }, [tutorials, userName]);

  return (
    <div className={styles.list}>
      {tutorials.map((tutorial) => (
        <div
          key={tutorial}
          className={styles.item}
          onClick={() => onTutorialClick(tutorial)}
        >
          <span>{tutorial}</span>
          <span className={statusMap[tutorial] ? styles.done : styles.undone}>
            {statusMap[tutorial] ? '완료됨' : '미완료'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TutorialList;
