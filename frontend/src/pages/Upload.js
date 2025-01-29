import { useState } from "react";
import "../styles/queries.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import TopBar from "../components/TopBar"

export default function ChatbotUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);

  const botResponses = [
    "Hello! How can I assist you today?",
    "Can you please provide more details?",
    "Let me check that for you...",
  ];
  
  const webSearchResponses = [
    [
      { link: "https://example.com/article1", content: "This article explains the basics." },
      { link: "https://example.com/article2", content: "This one provides advanced insights." },
    ],
    [
      { link: "https://example.com/guide1", content: "A beginner's guide on the topic." },
      { link: "https://example.com/guide2", content: "An in-depth technical reference." },
    ],
  ];
  
//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (input.trim() !== "") {
//       setChatStarted(true);
//       const userMessage = { text: input, sender: "user" };
//       const botMessage = { text: botResponses[Math.floor(Math.random() * botResponses.length)], sender: "bot" };
//       setMessages([...messages, userMessage, botMessage]);
//       setInput("");
//     }
//   };

const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setChatStarted(true);
  
      const userMessage = { text: input, sender: "user" };
  
      // Fixed bot response (based on a sequence or predefined logic)
      const botMessage = { text: botResponses[0], sender: "bot" }; 
  
      // Select a predefined web search response
      const webSearchData = webSearchResponses[0]; 
  
      // Create the web search message
      const webSearchMessage = {
        sender: "bot",
        text: (
          <>
            {webSearchData.map((entry, index) => (
              <div key={index}>
                <a href={entry.link} target="_blank" rel="noopener noreferrer" style={{color: "white"}}>
                  {entry.link}
                </a>
                <p>{entry.content}</p>
              </div>
            ))}
          </>
        ),
      };
  
      setMessages([...messages, userMessage, botMessage, webSearchMessage]);
      setInput("");
    }
  };

  const handleDeleteChat = () => {
    setMessages([]);
    setChatStarted(false);
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <>
     <TopBar />
      {!chatStarted && (
        <header className="header">
          <h1 className="title">Hello, there</h1>
          <p className="subtitle">How can I help you today?</p>
        </header>
      )}

      <div className={`chat-list ${chatStarted ? "full-screen" : ""}`}>
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="typing-area">
        <form className="typing-form" onSubmit={handleSendMessage}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter a prompt here"
              className="typing-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button type="submit" id="send-message-button" className="icon">
              <i className="bi bi-send"></i>
            </button>
          </div>

          <div className="action-buttons">
            <span id="theme-toggle-button" className="icon" onClick={toggleTheme}>
              <i className={`bi ${isDarkMode ? "bi-moon" : "bi-brightness-high"}`}></i>
            </span>

            <span id="delete-chat-button" className="icon" onClick={handleDeleteChat}>
              <i className="bi bi-trash"></i>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
