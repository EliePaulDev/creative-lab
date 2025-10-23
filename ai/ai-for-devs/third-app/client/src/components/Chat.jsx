
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';


const LOCAL_HISTORY_KEY = 'chat_history';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // index of selected chat
  const controllerRef = useRef(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_HISTORY_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setHistory(parsed);
      if (parsed.length > 0) {
        setMessages(parsed[parsed.length - 1]);
        setActiveChat(parsed.length - 1);
      }
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Prepare history for API
    const apiHistory = messages
      .filter(m => m.sender === 'user' || m.sender === 'bot')
      .map(m => ({
        role: m.sender === 'user' ? 'human' : 'ai',
        content: m.text
      }));
    setMessages((prev) => [...prev, { sender: 'user', text: input }, { sender: 'bot', text: '' }]);
    setInput('');
    setIsStreaming(true);
    controllerRef.current = new AbortController();
    let streamedText = '';
    try {
      const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input, history: apiHistory }),
        signal: controllerRef.current.signal,
      });
      if (!response.body) throw new Error('No response body');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          streamedText += chunk;
          setMessages((prev) => {
            // Always update the last message (bot)
            if (prev.length === 0) return prev;
            const last = prev[prev.length - 1];
            if (last.sender === 'bot') {
              return [...prev.slice(0, -1), { ...last, text: streamedText }];
            }
            return prev;
          });
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setMessages((prev) => [...prev, { sender: 'bot', text: 'Error: ' + err.message }]);
      }
    } finally {
      setIsStreaming(false);
      // Save to history after bot response is done
      setHistory((prev) => {
        let newHistory = [...prev];
        if (activeChat !== null && newHistory[activeChat]) {
          newHistory[activeChat] = [...messages, { sender: 'user', text: input }, { sender: 'bot', text: streamedText }];
        } else {
          newHistory.push([...messages, { sender: 'user', text: input }, { sender: 'bot', text: streamedText }]);
          setActiveChat(newHistory.length - 1);
        }
        return newHistory;
      });
    }
  };


  const handleStop = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  // Start a new chat
  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setActiveChat(null);
  };

  // Select a chat from history
  const handleSelectHistory = (idx) => {
    setMessages(history[idx]);
    setActiveChat(idx);
  };

  return (
    <div className="chat-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <button onClick={handleNewChat} disabled={isStreaming}>New Chat</button>
        <div>
          <strong>History:</strong>
          <select
            value={activeChat !== null ? activeChat : ''}
            onChange={e => handleSelectHistory(Number(e.target.value))}
            disabled={isStreaming || history.length === 0}
            style={{ marginLeft: 8 }}
          >
            <option value="" disabled>Select chat</option>
            {history.map((h, idx) => (
              <option key={idx} value={idx}>Chat {idx + 1}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
            {msg.sender === 'bot' ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isStreaming}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={isStreaming || !input.trim()}>Send</button>
        {isStreaming && <button type="button" onClick={handleStop}>Stop</button>}
      </form>
    </div>
  );
};

export default Chat;
