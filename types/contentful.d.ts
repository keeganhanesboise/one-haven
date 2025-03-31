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

export type CalendarEventEntry = Entry<CalendarEvent>;

export interface CalendarDisplayEvent {
  name: string;
  summary: string;
  description?: Document;
  icon?: Asset;
  startDate: Date;
  startTime: string;
  dayOfMonth: number;
  endDate: Date;
}