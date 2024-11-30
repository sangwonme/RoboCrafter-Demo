import React, { useState, useEffect, useContext } from 'react';
import BounceLoader from 'react-spinners/BounceLoader'; // Import the BounceLoader
import { CopyBlock, dracula } from 'react-code-blocks'; // Import from react-code-blocks
import styles from './InstructionOverlay.module.scss';

import ObjectiveStatus from './ObjectiveStatus';

import { AppContext } from '../../hooks/AppContext';

const InstructionOverlay = ({ selectedModule, userName, onBack, fetchModules }) => {
  const { state } = useContext(AppContext);

  const [instruction, setInstruction] = useState(null);
  const [instructionLoading, setInstructionLoading] = useState(false);
  const [instructionError, setInstructionError] = useState(null);

  useEffect(() => {
    const fetchInstruction = async () => {
      setInstructionLoading(true);
      setInstructionError(null);

      try {
        const response = await fetch('http://110.35.174.14:8080/get-instruction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_name: userName,
            selected_module: selectedModule.function_name,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch instruction');
        }

        const data = await response.json();
        setInstruction(data);
        console.log(data.skeleton_code);
        console.log(data.diagram_code);
        console.log(data.learning_objective);
      } catch (err) {
        console.error(err);
        setInstructionError('Failed to load instruction. Please try again.');
      } finally {
        setInstructionLoading(false);
      }
    };

    fetchInstruction();
  }, [selectedModule, userName]);

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          ← Back
        </button>
      </div>
      <div className={styles.content}>
        <h2>{selectedModule.function_name}</h2>

        {/* Overview */}
        <p>
          <strong>프로젝트 기능 설명</strong> {selectedModule.goal}
        </p>
        <p>
          <strong>학습 재료:</strong> {selectedModule.materials.join(', ')}
        </p>
        <p>
          <strong>학습 목표:</strong> {selectedModule.implementation}
        </p>

        {/* Loading */}
        {instructionLoading && (
          <div className={styles.loader}>
            <BounceLoader color="#36d7b7" size={30} />
            <p style={{ color: '#36d7b7' }}>코드 생성중...</p>
          </div>
        )}
        {instructionError && (
          <div className={styles.error}>{instructionError}</div>
        )}

        {instruction && (
          <div className={styles.tutorials}>
            <h3>프로젝트 진행을 위해 알아야 할 내용</h3>
            <p>"학습하기" 탭에서 아래의 내용들을 학습한 다음에 프로젝트를 진행하세요.</p>
              {instruction.learning_objective.map((objective) => (
                  <ObjectiveStatus
                    username={state.user.name}
                    tutorialName={objective}
                  />
              ))}
          </div>
        )}


        {/* Instructions */}
        {instruction && (
          <div className={styles.instruction}>
            <h3>1. 회로 작성</h3>
            <p>미니 프로젝트를 진행하려면 아래의 회로 코드를 복사하여 왼쪽 화면의 diagram.json에 붙여넣기 하세요.</p>
            <CopyBlock
              text={instruction.diagram_code} // Pretty print JSON
              language="json"
              showLineNumbers
              theme={dracula}
              wrapLines
            />

            <h3>2. 코드 작성</h3>
            <p>미니 프로젝트를 진행하려면 아래의 뼈대 코드를 복사하여 왼쪽 화면의 sketch.ino에 붙여넣기 하세요.</p>
            <CopyBlock
              text={instruction.skeleton_code}
              language="c"
              showLineNumbers
              theme={dracula}
            />

          </div>
        )}
      </div>
    </div>
  );
};

export default InstructionOverlay;
