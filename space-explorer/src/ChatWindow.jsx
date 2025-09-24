import React, { useState } from 'react';

function ChatWindow({ isOpen, onClose }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isBotTyping) return;

    const userMessageText = inputMessage.trim();
    const userMessage = { sender: 'user', text: userMessageText };
    
    // Add user message to the chat history
    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsBotTyping(true);

    try {
        // Send message to the Node.js backend server
        const response = await fetch('http://localhost:3001/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Send user message text to the server
            body: JSON.stringify({ message: userMessageText }), 
        });

        if (!response.ok) {
            throw new Error(`Server response status: ${response.status}`);
        }

        const data = await response.json();
        
        // Add AI's response to the chat history
        const botResponse = { 
            sender: 'bot', 
            text: data.response
        };
        setChatMessages(prev => [...prev, botResponse]);

    } catch (error) {
        console.error("Chatbot API Error:", error);
        setChatMessages(prev => [...prev, { 
            sender: 'bot', 
            text: 'Connection failed. Check if the Node.js server is running and your OpenAI API key is valid.' 
        }]);
    } finally {
        setIsBotTyping(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="chat-window">
        <div className="chat-header">
            AI Space Guide
            <button onClick={onClose} className="close-btn">X</button>
        </div>
        <div className="chat-messages">
            {chatMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                    {msg.text}
                </div>
            ))}
            {isBotTyping && (
                <div className="message bot typing">...Typing</div>
            )}
        </div>
        <div className="chat-input">
            <input
                type="text"
                placeholder="Ask about stars, nebulae, and galaxies..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isBotTyping}
            />
            <button onClick={sendMessage} disabled={isBotTyping}>Send</button>
        </div>
    </div>
  );
}

export default ChatWindow;