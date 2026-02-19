import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send, X, MessageSquare, User, Shield } from 'lucide-react';

interface Message {
    text: string;
    sender: 'Admin' | 'User';
    timestamp: Date;
}

interface ChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
    role: 'Admin' | 'User';
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose, role }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Connect to the backend socket
        const newSocket = io('http://localhost:3001'); // Backend is on 3001
        setSocket(newSocket);

        newSocket.on('message', (msg: any) => {
            const receivedMsg = typeof msg === 'string' ? JSON.parse(msg) : msg;
            setMessages((prev) => [...prev, {
                text: receivedMsg.text,
                sender: receivedMsg.sender,
                timestamp: new Date()
            }]);
        });

        return () => {
            newSocket.close();
        };
    }, [role]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && socket) {
            const payload = {
                text: message,
                sender: role
            };
            socket.emit('message', payload);
            setMessage('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className={`p-4 ${role === 'Admin' ? 'bg-indigo-600' : 'bg-blue-600'} text-white flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                        {role === 'Admin' ? <Shield size={20} /> : <User size={20} />}
                    </div>
                    <div>
                        <h3 className="font-bold">Chat with {role === 'Admin' ? 'User' : 'Admin'}</h3>
                        <p className="text-xs text-white/80 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="hover:bg-white/20 p-1.5 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            >
                {messages?.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <MessageSquare size={32} className="text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-sm">No messages yet. Start a conversation!</p>
                    </div>
                )}
                {messages?.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === role ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${msg.sender === role
                            ? (role === 'Admin' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-blue-600 text-white rounded-br-none')
                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                            }`}>
                            <p className="text-sm font-medium mb-1 opacity-70 flex justify-between gap-4">
                                <span>{msg?.sender}</span>
                                <span className="text-[10px]">
                                    {msg?.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </p>
                            <p className="text-sm leading-relaxed">{msg?.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-400 transition-all outline-none text-sm"
                />
                <button
                    type="submit"
                    disabled={!message.trim()}
                    className={`p-2 rounded-xl text-white transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 ${role === 'Admin' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;
