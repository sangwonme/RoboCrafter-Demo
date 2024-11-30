import React, { useState } from 'react';
import styles from './MainUI.module.scss';

import ProjectDecomposer from './ProjectDecomposer/ProjectDecomposer';
import InstructionProvider from './InstructionProvider/InstructionProvider';
import TutorialProvider from './TutorialProvider/TutorialProvider';

const MainUI = () => {
  const [activeTab, setActiveTab] = useState('아이디어'); // Default tab

  return (
    <div className={styles.container}>
      {/* Tabs */}
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tab} ${activeTab === '아이디어' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('아이디어')}
        >
          아이디어
        </button>
        <button
          className={`${styles.tab} ${activeTab === '만들기' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('만들기')}
        >
          만들기
        </button>
        <button
          className={`${styles.tab} ${activeTab === '학습하기' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('학습하기')}
        >
          학습하기
        </button>
      </div>

      {/* Main - selected by Tab */}
      <div className={styles.mainContainer}>
        <ProjectDecomposer/>
        {activeTab == '만들기' && <InstructionProvider/>}
        {activeTab === '학습하기' && <TutorialProvider/>}
      </div>
    </div>
  );
};

export default MainUI;
