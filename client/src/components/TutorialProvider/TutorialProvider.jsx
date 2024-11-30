import React, { useState, useContext, useEffect } from 'react';
import styles from './TutorialProvider.module.scss';

import { AppContext } from '../../hooks/AppContext';
import TutorialList from './TutorialList';
import TutorialOverlay from './TutorialOverlay';

const TutorialProvider = () => {
  const { state } = useContext(AppContext);

  // State to store fetched tutorials
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to manage selected tutorial
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  // Fetch the tutorials
  const fetchTutorials = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://110.35.174.14:8080/get-tutorial-list');
      if (!response.ok) {
        throw new Error('Failed to fetch tutorials');
      }
      const data = await response.json();
      setTutorials(data.curriculum);
    } catch (err) {
      console.error(err);
      setError('Failed to load tutorials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tutorials on component mount
  useEffect(() => {
    fetchTutorials();
  }, []);

  // Handle back action
  const handleBack = () => {
    setSelectedTutorial(null);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }


  return (
    <div className={styles.container}>
      {!selectedTutorial ? (
        <TutorialList tutorials={tutorials} onTutorialClick={setSelectedTutorial} />
      ) : (
        <TutorialOverlay
          selectedTutorial={selectedTutorial}
          userName={state.user.name}
          onBack={handleBack}
          fetchTutorials={fetchTutorials} // Pass the fetch function
        />
      )}
    </div>
  );
};


export default TutorialProvider;
