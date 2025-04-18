import { Entry, Asset } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface CalendarEvent {
  name: string;
  summary: string;
  description?: Document;
  image?: Asset;
  startDate: string;
  duration: number;
  recurrenceRule: string;
  recurrenceEndDate: string;
  exceptionDates?: ExceptionDateEntry[];
}

export type CalendarEventEntry = Entry<CalendarEvent> & {
  fields: CalendarEvent;
};

export interface ExceptionDate {
  title: string;
  date: string;
}

export type ExceptionDateEntry = Entry<ExceptionDate> & {
  fields: ExceptionDate;
};

export interface CalendarDisplayEvent {
  id: string;
  name: string;
  summary: string;
  description?: string | undefined;
  imageUrl?: string;
  startDate: DateTime<true> | DateTime<false>;
  startTime: string;
  endTime: string;
  dayOfMonth: number;
  endDate: DateTime<true> | DateTime<false>;
}

export interface HomePage {
  title: string;
  gamesAndEventsInfo: Document;
  menus: Asset[];
  aboutUsInfo: Document;
  aboutUsImage: Asset;
  imageCarousel: Asset[];
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
