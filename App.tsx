import React, { useState, useEffect, useCallback } from 'react';
import type { ScheduledMessage } from './types';
import SchedulerForm from './components/SchedulerForm';
import MessageList from './components/MessageList';
import { Header } from './components/Header';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ScheduledMessage[]>([]);

  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem('scheduledMessages');
      if (storedMessages) {
        const parsedMessages: ScheduledMessage[] = JSON.parse(storedMessages).map((msg: any) => ({
          ...msg,
          scheduleTime: new Date(msg.scheduleTime),
          frequency: msg.frequency || 'once', // Add default frequency for backward compatibility
        }));
        setMessages(parsedMessages);
      }
    } catch (error) {
      console.error("Failed to load messages from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('scheduledMessages', JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to localStorage", error);
    }
  }, [messages]);

  const addMessage = useCallback((message: Omit<ScheduledMessage, 'id'>) => {
    const newMessage: ScheduledMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
  }, []);

  const handleMessageSent = useCallback((id: string) => {
    const message = messages.find(msg => msg.id === id);
    if (!message) return;

    if (message.frequency === 'once') {
      deleteMessage(id);
    } else {
      const newScheduleTime = new Date(message.scheduleTime);
      switch (message.frequency) {
        case 'daily':
          newScheduleTime.setDate(newScheduleTime.getDate() + 1);
          break;
        case 'weekly':
          newScheduleTime.setDate(newScheduleTime.getDate() + 7);
          break;
        case 'monthly':
          newScheduleTime.setMonth(newScheduleTime.getMonth() + 1);
          break;
      }
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === id ? { ...msg, scheduleTime: newScheduleTime } : msg
        )
      );
    }
  }, [messages, deleteMessage]);


  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <SchedulerForm onAddMessage={addMessage} />
          <MessageList messages={messages} onDeleteMessage={deleteMessage} onMessageSent={handleMessageSent} />
        </main>
      </div>
    </div>
  );
};

export default App;
