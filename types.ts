export type Frequency = 'once' | 'daily' | 'weekly' | 'monthly';

export interface ScheduledMessage {
  id: string;
  phone: string;
  message: string;
  scheduleTime: Date;
  frequency: Frequency;
}
