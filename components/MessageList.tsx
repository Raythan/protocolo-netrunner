import React, { useMemo } from 'react';
import type { ScheduledMessage } from '../types';
import MessageCard from './MessageCard';

interface MessageListProps {
  messages: ScheduledMessage[];
  onDeleteMessage: (id: string) => void;
  onMessageSent: (id: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, onDeleteMessage, onMessageSent }) => {
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => a.scheduleTime.getTime() - b.scheduleTime.getTime());
  }, [messages]);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Upcoming Messages</h2>
      {sortedMessages.length > 0 ? (
        <div className="space-y-4">
          {sortedMessages.map(message => (
            <MessageCard 
              key={message.id} 
              message={message} 
              onDelete={onDeleteMessage} 
              onMessageSent={onMessageSent}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 px-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
          <p className="text-slate-500 dark:text-slate-400">You have no messages scheduled.</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">Use the form above to add one!</p>
        </div>
      )}
    </section>
  );
};

export default MessageList;
