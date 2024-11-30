import React, { useEffect, useState, useContext } from 'react';

import { AppContext } from '../../hooks/AppContext';
import styles from './ObjectiveStatus.module.scss';

const ObjectiveStatus = ({ username, tutorialName }) => {
  const { state } = useContext(AppContext);

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `http://110.35.174.14:8080/get-tutorial-done?username=${state.user.name}&tutorial_name=${tutorialName}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch tutorial status');
        }

        const data = await response.json();
        setStatus(data.done);
      } catch (err) {
        console.error(err);
        setError('Error fetching status');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [username, tutorialName]);

  if (loading) return <span className={styles.loading}>Loading...</span>;
  if (error) return <span className={styles.error}>Error</span>;

  return (
    <div className={styles.objectiveStatus}>
      <span className={styles.tutorialName}>{tutorialName}</span>
      <span
        className={
          status ? styles.statusCompleted : styles.statusNotCompleted
        }
      >
        {status ? '완료됨' : '미완료'}
      </span>
    </div>
  );
};

export default ObjectiveStatus;
