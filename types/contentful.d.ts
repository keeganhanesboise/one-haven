import { Entry, Asset } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface CalendarEvent {
  name: string;
  summary: string;
  description?: Document;
  icon?: Asset;
  startDate: string;
  duration: number;
  recurrenceRule: string[];
  recurrenceEndDate: string;
}

export type CalendarEventEntry = Entry<CalendarEvent> & { fields: CalendarEvent };

export interface CalendarDisplayEvent {
  id: string;
  name: string;
  summary: string;
  description?: Document;
  icon?: Asset;
  startDate: Date;
  startTime: string;
  endTime: string;
  dayOfMonth: number;
  endDate: Date;
}