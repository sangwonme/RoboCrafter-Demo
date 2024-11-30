import React from 'react';
import styles from './Message.module.scss';

const Message = ({ text, sender }) => {
  return (
    <div
      className={`${styles.message} ${
        sender === 'me' ? styles.myMessage : styles.otherMessage
      }`}
    >
      {text}
    </div>
  );
};

export default Message;
