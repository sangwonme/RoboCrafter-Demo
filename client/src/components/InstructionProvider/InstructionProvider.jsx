import React, { useState, useContext, useEffect } from 'react';
import styles from './InstructionProvider.module.scss';

import { AppContext } from '../../hooks/AppContext';
import ModuleList from './ModuleList';
import InstructionOverlay from './InstructionOverlay';

const InstructionProvider = () => {
  const { state } = useContext(AppContext);

  // State to store fetched modules
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to manage selected module
  const [selectedModule, setSelectedModule] = useState(null);

  // Fetch the modules
  const fetchModules = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://110.35.174.14:8080/get-selected-modules?username=${state.user.name}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch modules');
      }
      const data = await response.json();
      setModules(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load modules. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch modules on component mount
  useEffect(() => {
    fetchModules();
  }, [state.user.name]);

  // Handle back action
  const handleBack = () => {
    setSelectedModule(null);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {!selectedModule ? (
        <ModuleList modules={modules} onModuleClick={setSelectedModule} />
      ) : (
        <InstructionOverlay
          selectedModule={selectedModule}
          userName={state.user.name}
          onBack={handleBack}
          fetchModules={fetchModules} // Pass the fetch function
        />
      )}
    </div>
  );
};

export default InstructionProvider;
