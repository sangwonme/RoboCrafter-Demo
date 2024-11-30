import React from 'react';
import styles from './TextInput.module.scss';

const TextInput = ({
  inputValue,
  setInputValue,
  handleComposition,
  handleSendMessage,
}) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onCompositionStart={handleComposition}
        onCompositionEnd={handleComposition}
        onKeyDown={handleSendMessage}
        placeholder="Type your message..."
        className={styles.input}
      />
    </div>
  );
};

export default TextInput;
