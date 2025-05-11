import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot' | 'other';
  username: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

interface Thread {
  id: string;
  title: string;
  author: string;
  content: string;
  timestamp: string;
  replies: number;
  likes: number;
  isLiked?: boolean;
}

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender: 'user',
      username: 'You',
      timestamp: new Date().toISOString(),
      likes: 0,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I am AniBot, your anime companion! How can I help you today?',
        sender: 'bot',
        username: 'AniBot',
        timestamp: new Date().toISOString(),
        likes: 0,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Threads Sidebar */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Discussion Threads
          </h2>
          <div className="space-y-4">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  activeThread === thread.id
                    ? 'bg-purple-100 dark:bg-purple-900/30'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveThread(thread.id)}
              >
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {thread.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {thread.content}
                </p>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{thread.author}</span>
                  <div className="flex items-center space-x-4">
                    <span>{thread.replies} replies</span>
                    <span>{thread.likes} likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {activeThread ? 'Thread Discussion' : 'AniBot Chat'}
          </h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : message.sender === 'bot'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {message.sender === 'bot' ? (
                    <Bot className="h-5 w-5" />
                  ) : message.sender === 'user' ? (
                    <User className="h-5 w-5" />
                  ) : null}
                  <span className="font-medium">{message.username}</span>
                  <span className="text-xs opacity-70">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
                <p>{message.content}</p>
                <div className="flex items-center justify-end mt-2 space-x-2">
                  <button className="p-1 hover:bg-opacity-20 rounded-full">
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                  <span className="text-xs">{message.likes}</span>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span className="font-medium">AniBot</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className={`p-2 rounded-full ${
                !newMessage.trim()
                  ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white transition-colors`}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom; 