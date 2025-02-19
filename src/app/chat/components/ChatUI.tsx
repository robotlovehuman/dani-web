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
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;
    
    const userMessage = { id: Date.now(), text: newMessage, sent: true };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Create a placeholder for the assistant's message
    const assistantMessageId = Date.now() + 1;
    setMessages(prev => [...prev, {
      id: assistantMessageId,
      text: '',
      sent: false
    }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [{ role: 'user', content: newMessage }]
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Convert the chunk to text
        const text = new TextDecoder().decode(value);
        
        // Update the assistant's message
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId
            ? { ...msg, text: msg.text + text }
            : msg
        ));
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId
          ? { ...msg, text: "Sorry, I couldn't process that message." }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="retro-button"
              disabled={isLoading}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 