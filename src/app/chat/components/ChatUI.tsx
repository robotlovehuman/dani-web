"use client"

import { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sent: boolean;
}

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome to RetroChat!", sent: false }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now(), text: newMessage, sent: true }]);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-3rem)]">
      <h1 className="text-2xl font-bold mb-4">RetroChat</h1>
      <div className="retro-panel h-[calc(100%-8rem)]">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded ${
                  message.sent 
                    ? 'bg-[var(--c64-brown)] text-[var(--c64-light)]' 
                    : 'bg-[var(--c64-light)] text-[var(--c64-dark)]'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 bg-[var(--c64-light)] border-2 border-[var(--c64-brown)] rounded"
              placeholder="Type your message..."
            />
            <button type="submit" className="retro-button">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 