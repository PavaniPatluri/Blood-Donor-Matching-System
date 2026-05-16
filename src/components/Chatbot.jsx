import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your Life Drop AI Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newUserMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');

    // Mock AI response
    setTimeout(() => {
      let botResponse = "I'm an AI assistant. I'm currently in demo mode, but I'll be able to help you with portal queries soon!";
      
      const lowerInput = newUserMsg.text.toLowerCase();
      if (lowerInput.includes('map') || lowerInput.includes('location') || lowerInput.includes('near')) {
        botResponse = "You can find nearby blood banks and donors using the Live Donor Map feature on your dashboard.";
      } else if (lowerInput.includes('appointment') || lowerInput.includes('schedule') || lowerInput.includes('book')) {
        botResponse = "To schedule a donation, please visit the Appointments section. You can pick an available time slot there.";
      } else if (lowerInput.includes('emergency') || lowerInput.includes('urgent')) {
        botResponse = "If there's a critical shortage, you can activate Emergency Mode using the control panel at the bottom. This will immediately alert nearby donors.";
      } else if (lowerInput.includes('reward') || lowerInput.includes('point')) {
        botResponse = "You earn points for every donation! Check the Rewards Dashboard to see your balance and unlock benefits.";
      }

      setMessages(prev => [...prev, { id: Date.now(), text: botResponse, sender: 'bot' }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={fabStyle}
          aria-label="Open AI Chatbot"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={chatWindowStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={24} />
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>Portal AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} style={closeBtnStyle}>
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={messagesAreaStyle}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                style={{
                  ...messageWrapperStyle,
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  ...bubbleStyle,
                  backgroundColor: msg.sender === 'user' ? '#ef4444' : '#f3f4f6',
                  color: msg.sender === 'user' ? '#fff' : '#111',
                  borderBottomRightRadius: msg.sender === 'user' ? 0 : '12px',
                  borderBottomLeftRadius: msg.sender === 'bot' ? 0 : '12px',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={inputAreaStyle}>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..." 
              style={inputStyle}
            />
            <button type="submit" style={{...sendBtnStyle, opacity: inputValue.trim() ? 1 : 0.5}} disabled={!inputValue.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

const fabStyle = {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: '#ef4444',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
  border: 'none',
  cursor: 'pointer',
  zIndex: 9999,
  transition: 'transform 0.2s',
};

const chatWindowStyle = {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  width: '350px',
  height: '500px',
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  zIndex: 9999,
  border: '1px solid #eee',
  fontFamily: 'inherit'
};

const headerStyle = {
  backgroundColor: '#ef4444',
  color: '#fff',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const closeBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.2rem'
};

const messagesAreaStyle = {
  flex: 1,
  padding: '1rem',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  backgroundColor: '#fafafa'
};

const messageWrapperStyle = {
  display: 'flex',
  width: '100%'
};

const bubbleStyle = {
  maxWidth: '80%',
  padding: '0.75rem 1rem',
  borderRadius: '12px',
  fontSize: '0.9rem',
  lineHeight: '1.4',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
};

const inputAreaStyle = {
  padding: '1rem',
  borderTop: '1px solid #eee',
  display: 'flex',
  gap: '0.5rem',
  backgroundColor: '#fff'
};

const inputStyle = {
  flex: 1,
  padding: '0.75rem 1rem',
  borderRadius: '24px',
  border: '1px solid #ddd',
  outline: 'none',
  fontSize: '0.95rem'
};

const sendBtnStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#ef4444',
  color: '#fff',
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'opacity 0.2s'
};
