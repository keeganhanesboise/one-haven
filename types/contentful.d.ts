import { Entry, Asset } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface CalendarEvent {
  name: string;
  summary: string;
  description?: Document;
  icon?: Asset;
  startDate: string;
  duration: number;
  recurrenceRule: string;
  recurrenceEndDate: string;
}

export type CalendarEventEntry = Entry<CalendarEvent> & { fields: CalendarEvent };

export interface CalendarDisplayEvent {
  id: string;
  name: string;
  summary: string;
  description?: string | undefined;
  iconUrl?: string;
  startDate: Date;
  startTime: string;
  endTime: string;
  dayOfMonth: number;
  endDate: Date;
}

export interface HomePage {
  title: string;
  gamesAndEventsInfo: Document;
  menus: Asset[];
  imageCarousel: Asset[];
  address?: Document;
  storeHours: DayHoursEntry[];
}

export type HomePageEntry = Entry<HomePage> & { fields: HomePage };

export interface DayHours {
  title: string;
  day: string;
  openTime?: string;
  closeTime?: string;
  closed: boolean;
}

export type DayHoursEntry = Entry<DayHours> & { fields: DayHours };