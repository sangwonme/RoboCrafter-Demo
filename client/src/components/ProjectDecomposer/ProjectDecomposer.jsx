import React, { useState, useContext, useRef, useEffect } from 'react';
import BounceLoader from 'react-spinners/BounceLoader'; // Import the loader
import styles from './ProjectDecomposer.module.scss';

import { AppContext } from '../../hooks/AppContext';

import Message from './Message';
import TextInput from '../TextInput';
import ProjectSuggestion from './ProjectSuggestion';

const ProjectDecomposer = () => {
  const { state } = useContext(AppContext);

  // text input
  const [inputValue, setInputValue] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const handleComposition = (event) => {
    if (event.type === 'compositionstart') {
      setIsComposing(true);
    } else if (event.type === 'compositionend') {
      setIsComposing(false);
    }
  };

  // message between user and bot
  const [messages, setMessages] = useState([]);

  // tmp result from agent
  const [result, setResult] = useState({});

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // Ref for the messages div
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // send text to server
  const handleSendMessage = async (event) => {
    if (event.key === 'Enter' && !isComposing && inputValue.trim()) {
      const userMessage = { value: inputValue, sender: 'me' };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputValue('');
      setIsLoading(true); // Start loading

      try {
        // Make an API request to /project-decompose
        const response = await fetch('http://110.35.174.14:8080/project-decompose', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_name: state.user.name,
            user_text: inputValue,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to decompose');
        }

        const data = await response.json();
        setResult(data);
        const botMessage = { value: '아래와 같은 미니 프로젝트를 진행할 수 있어요. 마음에 드는 프로젝트들을 선택해주세요.', sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        const suggestionMessages = Object.entries(data).map(([key, entry]) => ({
          value: entry,
          sender: 'bot',
        }));
        setMessages((prevMessages) => [...prevMessages, ...suggestionMessages]);
        const anotherMessage = { value: '아이디어를 더 진행시키고 싶다면 더욱 구체적으로 말해주세요.', sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, anotherMessage]);
        
      } catch (error) {
        console.error('Error fetching from API:', error);
        const errorMessage = { value: 'Failed to get response from server.', sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        {/* messages */}
        <div className={styles.chatContainer}>
          <div className={styles.messages}>
            {messages.map((msg, index) =>
              typeof msg.value === 'string' ? (
                <Message key={index} text={msg.value} sender={msg.sender} />
              ) : (
                <ProjectSuggestion key={index} data={msg.value} />
              )
            )}
            {isLoading && (
              <div className={styles.loader}>
                <BounceLoader color="#36d7b7" size={30} />
                <p style={{ color: '#36d7b7' }}>프로젝트 생성중...</p>
              </div>
            )}
            {/* Ref to always scroll to the bottom */}
            <div ref={messagesEndRef}></div>
          </div>
        </div>

        {/* text input */}
        <div className={styles.inputContainer}>
          <TextInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleComposition={handleComposition}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectDecomposer;
