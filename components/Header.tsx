
import React from 'react';
import { WhatsAppIcon } from './icons';

export const Header: React.FC = () => (
  <header className="flex items-center justify-center text-center">
    <WhatsAppIcon className="h-10 w-10 text-green-500 mr-3" />
    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
      WhatsApp Message Scheduler
    </h1>
  </header>
);
