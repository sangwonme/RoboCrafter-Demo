import React from 'react';
import styles from './ModuleList.module.scss';

const ModuleList = ({ modules, onModuleClick }) => {
  return (
    <div className={styles.moduleList}>
      {modules.map((module, index) => (
        <div
          key={index}
          className={styles.moduleCard}
          onClick={() => onModuleClick(module)}
        >
          <h3>{module.function_name}</h3>
          <p>{module.goal}</p>
        </div>
      ))}
    </div>
  );
};

export default ModuleList;
