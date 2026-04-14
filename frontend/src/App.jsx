import { useState, useRef, useEffect } from 'react';
import './App.css';

// Simple chatbot function
const Chatbot = (input) => {
  return "Hello " + input;
};

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function SendMessage() {
    if (!inputText.trim()) return;

    const userMessage = {
      message: inputText,
      sender: 'user',
      id: crypto.randomUUID()
    };

    const response = Chatbot(inputText);

    const botMessage = {
      message: response,
      sender: 'robot',
      id: crypto.randomUUID()
    };

    setChatMessages([
      ...chatMessages,
      userMessage,
      botMessage
    ]);

    setInputText('');
  }

  function pass_input(event) {
    if (event.key === 'Enter') {
      SendMessage();
    }
  }

  return (
    <div className="chat-input-container">
      <input
        onChange={saveInputText}
        value={inputText}
        placeholder="Send a message to Chatbot"
        className="chat-input"
        onKeyDown={pass_input}
      />
      <button onClick={SendMessage} className="send-btn">
        Send
      </button>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div className={sender === 'user'
      ? 'chat-message-user'
      : 'chat-message-robot'}>
      
      {sender === "robot" && (
        <img src="robot.png" width="40" height="40" />
      )}

      <div className="chat-message-text">
        {message}
      </div>

      {sender === "user" && (
        <img src="DefCap.png" width="40" height="40" />
      )}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const container = chatMessagesRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg.message}
          sender={msg.sender}
        />
      ))}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      message: 'hello chatbot',
      sender: 'user',
      id: 'id1'
    },
    {
      message: 'Hello! How can I help you?',
      sender: 'robot',
      id: 'id2'
    }
  ]);

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;