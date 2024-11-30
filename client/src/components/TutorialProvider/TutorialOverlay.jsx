import React, { useEffect, useState, useContext } from 'react';

import { AppContext } from '../../hooks/AppContext';

import ReactMarkdown from 'react-markdown';
import styles from './TutorialOverlay.module.scss';

const TutorialOverlay = ({ selectedTutorial, userName, onBack, fetchTutorials }) => {
  const { state } = useContext(AppContext);

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markingAsDone, setMarkingAsDone] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);

  useEffect(() => {
    const fetchTutorialContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://110.35.174.14:8080/get-tutorial-document?tutorial_name=${encodeURIComponent(
            selectedTutorial
          )}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch tutorial content');
        }
        const data = await response.json();
        setContent(data.content); // Store the Markdown content
      } catch (err) {
        console.error(err);
        setError('Failed to load tutorial content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const checkIfDone = async () => {
      try {
        const response = await fetch(
          `http://110.35.174.14:8080/get-tutorial-done?username=${state.user.name}&tutorial_name=${encodeURIComponent(
            selectedTutorial
          )}`
        );
        if (!response.ok) {
          throw new Error('Failed to check tutorial status');
        }
        const data = await response.json();
        setAlreadyDone(data.done);
      } catch (err) {
        console.error('Error checking tutorial status:', err);
      }
    };

    fetchTutorialContent();
    checkIfDone();
  }, [selectedTutorial, state.user.name]);

  const markAsDone = async () => {
    setMarkingAsDone(true);
    try {
      const response = await fetch('http://110.35.174.14:8080/update-tutorial-done', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: state.user.name,
          tutorial_name: selectedTutorial,
          done: true,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update tutorial status');
      }
  
      // Optionally refresh the tutorial list to reflect the update
      fetchTutorials();
      setAlreadyDone(true); // Mark as done locally
  
      // Scroll to top before navigating back
      window.scrollTo({ top: 0, behavior: 'smooth' });
  
      // Call the onBack function to navigate back
      onBack();
    } catch (err) {
      console.error('Error updating tutorial status:', err);
      alert('Failed to mark tutorial as done. Please try again.');
    } finally {
      setMarkingAsDone(false);
    }
  };
  
  

  return (
    <div className={styles.overlay}>
      <button className={styles.backButton} onClick={onBack}>
        ← Back
      </button>
      <h2>{selectedTutorial}</h2>

      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {/* Render Markdown content */}
      {!loading && !error && (
        <>
          {alreadyDone && <p className={styles.doneMessage}>이미 학습이 완료되었습니다.</p>}
          <div className={styles.markdown}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          {!alreadyDone && (
            <button
              className={styles.doneButton}
              onClick={markAsDone}
              disabled={markingAsDone}
            >
              {markingAsDone ? 'Marking as Done...' : '학습 완료'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TutorialOverlay;
