import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch message from backend when component mounts
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    try {
      const response = await fetch('https://test-backend-m7ev.onrender.com/');
      const data = await response.json();
      console.log(data.message);
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching message:', error);
      setMessage('Failed to connect to backend');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('https://test-backend-m7ev.onrender.com/api/greet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      
      const data = await response.json();
      setGreeting(data.message);
    } catch (error) {
      console.error('Error sending name:', error);
      setGreeting('Failed to send name to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Node.js Integration</h1>
        
        {/* Display message from backend */}
        <div className="message-box">
          <h2>Message from Backend:</h2>
          <p>{message || 'Loading...'}</p>
        </div>
        
        {/* Form to interact with backend */}
        <div className="interaction-box">
          <h2>Send Your Name to Backend:</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
          
          {greeting && (
            <div className="greeting">
              <p>{greeting}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
