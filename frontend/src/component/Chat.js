import React, { useState, useEffect } from 'react';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [otherUsername, setOtherUsername] = useState('');
    const [username, setUsername] = useState('');
    const [userExists, setUserExists] = useState(false); // State to track if user exists

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const ws = new WebSocket(`ws://localhost:8000?token=${token}`);
            ws.addEventListener('open', () => {
                console.log('Connected to the WebSocket server.');
                setSocket(ws);

                // Extract username from token or fetch it from an API
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUsername(payload.username);
            });

            ws.addEventListener('message', (event) => {
                setMessages(prevMessages => [...prevMessages, event.data]);
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
        if (socket && message.trim() !== '' && otherUsername.trim() !== '') {
            const messagePayload = {
                from: username,
                to: otherUsername,
                message,
            };
            socket.send(JSON.stringify(messagePayload));
            setMessage('');
        }
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter' && otherUsername.trim() !== '') {
            try {
                const response = await fetch(`/api/user/check-user?toUser=${otherUsername}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {
                    setUserExists(true);
                    console.log('User exists');
                } else if (response.status === 404) {
                    setUserExists(false);
                    console.log('User does not exist');
                } else {
                    console.error('Error checking user:', response.statusText);
                }
            } catch (error) {
                console.error('Error checking user:', error);
            }
        }
    };

    return (
        <div className="chat container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Chat Room</h2>
                <div className="text-sm">Logged in as: {username}</div>
            </div>
            {/* <h2 className="text-2xl font-bold mb-4">Chat Room</h2> */}
            <div className="mb-4">
                <input
                    type="text"
                    value={otherUsername}
                    onChange={(e) => setOtherUsername(e.target.value)}
                    onKeyDown={handleKeyPress} // Call function on key press
                    placeholder="Enter recipient username"
                    className={`border rounded p-2 mr-2 w-full sm:w-auto ${userExists ? 'border-green-500' : 'border-red-500'}`} // Change border color based on user existence
                />
                {!userExists && (
                    <div className="text-red-500 text-sm">User does not exist</div>
                )}
            </div>
            <div id="chat" className="bg-gray-100 p-4 mb-4 h-64 overflow-y-scroll">
                {messages
                    .filter((msg) => {
                        const { message } = JSON.parse(msg);
                        return message.trim() !== '';
                    })
                    .map((msg, index) => {
                        const { from, to, message } = JSON.parse(msg);

                        // Determine if the message is sent by the current user
                        const isCurrentUser = from === username;

                        return (
                            <div
                                key={index}
                                className={`mb-2 ${isCurrentUser ? 'flex justify-end' : 'flex justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs rounded-lg p-2 ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                >
                                    {/* <strong>{isCurrentUser ? 'You' : from}</strong>: {message} */}
                                    {message}
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="border rounded p-2 flex-grow"
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white p-2 ml-2 rounded">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
