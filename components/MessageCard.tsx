import React from 'react';
import type { ScheduledMessage } from '../types';
import { CalendarIcon, ClockIcon, DeleteIcon, PhoneIcon, SendNowIcon, RepeatIcon } from './icons';

interface MessageCardProps {
  message: ScheduledMessage;
  onDelete: (id: string) => void;
  onMessageSent: (id: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onDelete, onMessageSent }) => {
  
  const handleSendNow = () => {
    const phoneNumber = message.phone.replace(/\D/g, ''); // Remove non-numeric characters
    const encodedMessage = encodeURIComponent(message.message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onMessageSent(message.id);
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(message.scheduleTime);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(message.scheduleTime);

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md transition-shadow hover:shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start">
        <div className="flex-grow">
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-2">
            <PhoneIcon className="h-4 w-4 mr-2" />
            <span>To: {message.phone}</span>
          </div>
          <p className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-words">
            {message.message}
          </p>
        </div>
        <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-6 flex sm:flex-col items-center space-x-2 sm:space-x-0 sm:space-y-2">
          <button 
            onClick={handleSendNow}
            className="flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-slate-800"
            title="Send Now"
          >
            <SendNowIcon className="h-4 w-4 mr-1.5" />
            Send Now
          </button>
          <button 
            onClick={() => onDelete(message.id)}
            className="flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-800"
            title="Delete"
          >
             <DeleteIcon className="h-4 w-4 mr-1.5" />
            Delete
          </button>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-1.5"/>
          <span>{formattedDate}</span>
        </div>
        {message.frequency !== 'once' && (
          <div className="flex items-center">
            <RepeatIcon className="h-4 w-4 mr-1.5"/>
            <span className="capitalize">{message.frequency}</span>
          </div>
        )}
        <div className="flex items-center">
          <ClockIcon className="h-4 w-4 mr-1.5"/>
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
