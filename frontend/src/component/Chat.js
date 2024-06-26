import React, { useState, useEffect } from 'react';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const ws = new WebSocket(`ws://localhost:8000?token=${token}`);
            ws.addEventListener('open', () => {
                console.log('Connected to the WebSocket server.');
                setSocket(ws);
            });

            ws.addEventListener('message', (event) => {
                setMessages([...messages, event.data]);
            });

            ws.addEventListener('close', () => {
                console.log('Disconnected from the WebSocket server.');
                // Optional: handle reconnection logic
            });

            // Clean up function to close WebSocket connection when component unmounts
            return () => {
                ws.close();
            };
        }
    }, []); // Only run once on component mount

    const sendMessage = () => {
        if (socket && message.trim() !== '') {
            socket.send(message);
            setMessage('');
        }
    };

    return (
        <div className="chat">
            <h2>Chat Room</h2>
            <div id="chat">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>Username:</strong> {msg}
                    </div>
                ))}
            </div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
