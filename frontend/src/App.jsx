import { useState, useRef, useEffect } from 'react';
import './App.css';

// Simple chatbot logic
const Chatbot = (input) => {
  return "Hello! I am a simulation. You said: " + input;
};

function Sidebar() {
  return (
    <aside className="sidebar">
      <button className="new-chat">+ New chat</button>
      <div className="sidebar-footer">
        <div className="nav-item">☼ Light mode</div>
        <div className="nav-item">Register</div>
        <div className="nav-item">Sign In</div>
        <div className="nav-item">About</div>
      </div>
    </aside>
  );
}

function HomeGrid() {
  return (
    <div className="home-grid">
      <h1 className="main-title">ChatBuddy</h1>
      <div className="grid-container">
        <div className="column">
          <div className="icon">☼</div>
          <h3>Examples</h3>
          <div className="card">"How to learn Machine learning..." →</div>
          <div className="card">"How to learn Figma..." →</div>
          <div className="card">"What is blackhole ?" →</div>
        </div>
        <div className="column">
          <div className="icon">⚡</div>
          <h3>Capabilities</h3>
          <div className="card">Give answers based on keywords</div>
          <div className="card">Simulate ChatGPT answers</div>
          <div className="card">Simulate OpenAI universe</div>
        </div>
        <div className="column">
          <div className="icon">⚠</div>
          <h3>Limitations</h3>
          <div className="card">It's not an AI</div>
          <div className="card">Limited keyword answers</div>
          <div className="card">No real conversation</div>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
      {sender === "robot" && <div className="avatar bot-avatar">🤖</div>}
      <div className="chat-message-text">{message}</div>
      {sender === "user" && <div className="avatar user-avatar">👤</div>}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const SendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { message: inputText, sender: 'user', id: crypto.randomUUID() };
    const response = Chatbot(inputText);
    const botMessage = { message: response, sender: 'robot', id: crypto.randomUUID() };

    setChatMessages([...chatMessages, userMessage, botMessage]);
    setInputText('');
  };

  return (
    <div className="app-layout">
      <Sidebar />
      
      <main className="main-content">
        {/* If no messages, show the grid. If messages exist, show the chat history */}
        {chatMessages.length === 0 ? (
          <HomeGrid />
        ) : (
          <div className="chat-messages-container" ref={chatMessagesRef}>
            {chatMessages.map((msg) => (
              <ChatMessage key={msg.id} message={msg.message} sender={msg.sender} />
            ))}
          </div>
        )}

        <div className="input-area">
          <div className="input-wrapper">
            <input
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
              placeholder="Send a message..."
              onKeyDown={(e) => e.key === 'Enter' && SendMessage()}
            />
            <button onClick={SendMessage} className="send-btn">➤</button>
          </div>
          <p className="footer-disclaimer">
            This project is contributed to PRIVA-SYNC. Developed by Rohit Kumar.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;

