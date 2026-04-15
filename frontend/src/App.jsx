import { useState, useRef, useEffect } from 'react';
import './App.css';
import axios from "axios";

// Simple chatbot logic
const Chatbot = (input) => {
  return "Hello! I am a simulation. You said: " + input;
};
function RegisterForm({ onClose, onLoginClick }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:4000/api/v1/users/register",
        formData
      );

      console.log("Response:", res.data);


      setSuccess(res.data.message);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="signForm">
        <div className="form-container">

          {success ? (

            <div>
              <h2>Success !</h2>
              <p>{success}</p>

              <div id="input-container-submit">
                <button id="submitBtn" onClick={onLoginClick}>
                  Login
                </button>
              </div>

              <button type="button" onClick={onClose}>
                Close
              </button>
            </div>
          ) : (

            <form onSubmit={handleSubmit}>
              <h2>Register an account</h2>

              <div className="input-container">
                <label className="input-container-label">
                  Enter username :
                </label>
                <input
                  placeholder="Enter username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                  className="input-container-box"
                />
              </div>

              <div className="input-container">
                <label className="input-container-label">
                  Enter Email Id :
                </label>
                <input
                  placeholder="Enter email Id"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="input-container-box"
                />
              </div>

              <div className="input-container">
                <label className="input-container-label">
                  Enter password :
                </label>
                <input
                  placeholder="Enter password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="input-container-box"
                />
              </div>

              <div id="input-container-submit">
                <button type="submit" id="submitBtn" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>

              {error && <p className="error-text">{error}</p>}

              <button type="button" onClick={onClose}>
                Close
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}

function LoginForm({ onClose, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:4000/api/v1/users/logIn",
        formData
      );

      console.log("Login Response:", res.data);

      // ✅ store token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ show success UI
      setSuccess(res.data.message);
      onLoginSuccess(res.data.user);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="signForm">
        <div className="form-container">

          {success ? (
            // ✅ SUCCESS UI
            <div>
              <h2>Success</h2>
              <p>{success}</p>

              <div id="input-container-submit">
                <button id="submitBtn" onClick={onClose}>
                  Continue
                </button>
              </div>

              <button type="button" onClick={onClose}>
                Close
              </button>
            </div>
          ) : (
            // ✅ LOGIN FORM (same UI style)
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>

              <div className="input-container">
                <label className="input-container-label">
                  Enter Email Id :
                </label>
                <input
                  placeholder="Enter email Id"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-container-box"
                />
              </div>

              <div className="input-container">
                <label className="input-container-label">
                  Enter password :
                </label>
                <input
                  placeholder="Enter password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-container-box"
                />
              </div>

              <div id="input-container-submit">
                <button type="submit" id="submitBtn" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>

              {error && <p className="error-text">{error}</p>}

              <button type="button" onClick={onClose}>
                Close
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
function Sidebar({ onRegisterClick, onLoginClick, isLoggedIn, user, onLogout , onNewChat }) {
  return (
    <aside className="sidebar">
      <div>
        <h3 id="greeting">
          {isLoggedIn
            ? `Welcome, ${user?.username}`
            : "Good Morning , Rohit !"}
        </h3>
        <button className="new-chat"  onClick={onNewChat}>+ New chat</button>
      </div>

      <div className="sidebar-footer">
        <button className="nav-item">☼ Light mode</button>
        <hr />

        {!isLoggedIn ? (
          <>
            <button className="nav-item" onClick={onRegisterClick}>
              Register
            </button>
            <hr />
            <button className="nav-item" onClick={onLoginClick}>
              Sign In
            </button>
          </>
        ) : (
          <>
            <button className="nav-item" onClick={onLogout}>
              Logout
            </button>
          </>
        )}

        <hr />
        <button className="nav-item">About</button>
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
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [warning, setWarning] = useState("");


  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop =
        chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });
  const SendMessage = async () => {
  if (!isLoggedIn) {
    setWarning("⚠️ Please login first to send messages");

    setTimeout(() => {
      setWarning("");
    }, 2500);

    return;
  }

  if (!inputText.trim()) return;

  const userMessage = {
    message: inputText,
    sender: 'user',
    id: crypto.randomUUID()
  };

  // show user message instantly
  setChatMessages(prev => [...prev, userMessage]);

  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:4000/api/v1/chat",
      {
        message: inputText
      },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
    );

    const botMessage = {
      message: response.data.reply || response.data,
      sender: 'robot',
      id: crypto.randomUUID()
    };

    setChatMessages(prev => [...prev, botMessage]);

  } catch (err) {
    console.error(err);

    setChatMessages(prev => [
      ...prev,
      {
        message: "⚠️ Error getting response",
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
  }

  setInputText('');
};
  const handleNewChat = () => {
    setChatMessages([]);   // clear chat
    setInputText("");      // clear input
  };

  return (
    <div className="app-layout">
      <Sidebar
        onRegisterClick={() => setShowRegister(true)}
        onLoginClick={() => setShowLogin(true)}
        onNewChat={handleNewChat}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLoggedIn(false);
          setUser(null);
        }}
      />

      <main className="main-content">
        {/* If no messages, show the grid. If messages exist, show the chat history */}
        {showRegister && (
          <RegisterForm
            onClose={() => setShowRegister(false)}
            onLoginClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          />
        )}
        {showLogin && (
          <LoginForm
            onClose={() => setShowLogin(false)}
            onLoginSuccess={(userData) => {
              setIsLoggedIn(true);
              setUser(userData);
              setShowLogin(false);
            }}
          />
        )}
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
          {warning && <p className="warning-text">{warning}</p>}
          <div className="input-wrapper">
            <input
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
              placeholder="Send a message..."
              onKeyDown={(e) => e.key === 'Enter' && SendMessage()}
            />
            <button onClick={SendMessage} className="send-btn" >➤</button>
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

