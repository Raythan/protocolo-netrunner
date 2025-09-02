import React, { useState } from 'react';
import type { ScheduledMessage, Frequency } from '../types';
import { generateMessageWithAI } from '../services/geminiService';
import { AiIcon, SendIcon, SpinnerIcon } from './icons';

interface SchedulerFormProps {
  onAddMessage: (message: Omit<ScheduledMessage, 'id'>) => void;
}

const SchedulerForm: React.FC<SchedulerFormProps> = ({ onAddMessage }) => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('once');
  const [error, setError] = useState('');
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiGenerate = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    const generatedMessage = await generateMessageWithAI(aiPrompt);
    setMessage(generatedMessage);
    setIsGenerating(false);
    setShowAiPrompt(false);
    setAiPrompt('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !message || !date || !time) {
      setError('All fields are required.');
      return;
    }

    const scheduleTime = new Date(`${date}T${time}`);
    if (scheduleTime <= new Date()) {
      setError('Scheduled time must be in the future.');
      return;
    }

    setError('');
    onAddMessage({ phone, message, scheduleTime, frequency });
    setPhone('');
    setMessage('');
    setDate('');
    setTime('');
    setFrequency('once');
  };

  return (
    <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Schedule a New Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Recipient's Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 123 4567"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:text-white"
          />
        </div>
        
        <div className="relative">
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Message
          </label>
          {showAiPrompt && (
            <div className="mb-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-md">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g., Wish my brother a happy birthday"
                className="w-full px-3 py-2 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-md focus:ring-green-500 focus:border-green-500"
                disabled={isGenerating}
              />
              <button
                type="button"
                onClick={handleAiGenerate}
                disabled={isGenerating || !aiPrompt}
                className="mt-2 w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {isGenerating ? <SpinnerIcon className="h-5 w-5 animate-spin" /> : 'Generate'}
              </button>
            </div>
          )}
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:text-white"
          ></textarea>
           <button
            type="button"
            onClick={() => setShowAiPrompt(!showAiPrompt)}
            className="absolute top-0 right-0 mt-1 mr-1 flex items-center text-sm px-2 py-1 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500"
            title="Generate with AI"
          >
            <AiIcon className="h-4 w-4 mr-1" />
            AI
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:text-white"
            />
          </div>
          <div>
             <label htmlFor="frequency" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Frequency
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as Frequency)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:text-white"
            >
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
        
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        
        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-slate-800 transition-colors duration-200"
        >
          <SendIcon className="h-5 w-5 mr-2" />
          Schedule Message
        </button>
      </form>
    </section>
  );
};

export default SchedulerForm;
