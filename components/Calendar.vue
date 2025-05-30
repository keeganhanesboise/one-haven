<script setup lang="ts">
import type { Document } from '@contentful/rich-text-types';
import { BLOCKS } from '@contentful/rich-text-types';
import { DateTime } from 'luxon';

import { useRichTextRenderer } from '~/composables/useRichTextRenderer';
import type {
  CalendarDisplayEvent,
  CalendarEventEntry,
  ExceptionDateEntry
} from '~/types/contentful';

const props = defineProps<{
  events?: CalendarEventEntry[] | null;
  startingYear: number;
  startingMonth: number;
}>();

const selectedYear = ref<number>(props.startingYear);
const selectedMonth = ref<number>(props.startingMonth);
const displayedEvents = ref<CalendarDisplayEvent[]>([]);
const showModal = ref<boolean>(false);
const openedEvents = ref<CalendarDisplayEvent[]>([]);

const formattedMonthYear = computed(() => {
  return DateTime.fromObject(
    { year: selectedYear.value, month: selectedMonth.value },
    { locale: 'en-US' }
  ).toLocaleString({ month: 'long', year: 'numeric' });
});

const isDateExcludedFromRecurringEvent = (
  excludedDates: (DateTime<true> | DateTime<false>)[],
  occurrenceDate: DateTime<true> | DateTime<false>
): boolean => {
  return excludedDates
    .map((date) => date.toISODate())
    .includes(occurrenceDate.toISODate());
};

const generateDisplayEvents = (
  events: CalendarEventEntry[],
  year: number,
  month: number
): CalendarDisplayEvent[] => {
  const calendarDisplayEvents: CalendarDisplayEvent[] = [];

  const monthStart = DateTime.fromObject(
    { year, month: month, day: 1 },
    { zone: 'America/Denver' }
  );

  const monthEnd = monthStart.plus({ months: 1 });

  events.forEach((event) => {
    const {
      exceptionDates,
      recurrenceRule,
      recurrenceEndDate,
      name,
      duration,
      summary,
      startDate,
      description,
      image
    } = event.fields;

    let imageUrl: string = '';
    if (image && image.fields.file?.url) {
      imageUrl = image.fields.file.url as string;
    }

    const occurrenceDate = DateTime.fromISO(startDate, {
      zone: 'America/Denver'
    });

    const endDate = occurrenceDate.plus({ hours: duration });

    const emptyDocument: Document = {
      nodeType: BLOCKS.DOCUMENT,
      content: [],
      data: {}
    };

    // event doesn't recur
    if (!recurrenceRule || recurrenceRule.length === 0) {
      if (occurrenceDate >= monthStart && occurrenceDate <= monthEnd) {
        calendarDisplayEvents.push({
          id: name + occurrenceDate,
          name: name,
          summary: summary,
          description: useRichTextRenderer(description ?? emptyDocument, {}),
          imageUrl: imageUrl,
          startDate: occurrenceDate,
          startTime: occurrenceDate.toLocaleString(DateTime.TIME_SIMPLE),
          endTime: endDate.toLocaleString(DateTime.TIME_SIMPLE),
          dayOfMonth: occurrenceDate.day,
          endDate: endDate
        });
      }

      // event is recurring, find out which dates it occurs this month based on it's initial start day
    } else {
      let recurrenceEnd = recurrenceEndDate
        ? DateTime.fromISO(recurrenceEndDate, {
            zone: 'America/Denver'
          })
        : monthEnd;

      if (recurrenceEnd > monthEnd) recurrenceEnd = monthEnd;

      let recurrenceDate = DateTime.fromISO(startDate, {
        zone: 'America/Denver'
      });

      // gather any dates this recurring event should be excluded from
      let convertedExceptionDates: (DateTime<true> | DateTime<false>)[] = [];
      if (exceptionDates && exceptionDates.length) {
        convertedExceptionDates = exceptionDates.map(
          (entry: ExceptionDateEntry) =>
            DateTime.fromISO(entry.fields.date, { zone: 'America/Denver' })
        );
      }

      while (recurrenceDate <= recurrenceEnd) {
        if (
          recurrenceDate >= monthStart &&
          !isDateExcludedFromRecurringEvent(
            convertedExceptionDates,
            recurrenceDate
          )
        ) {
          calendarDisplayEvents.push({
            id: name + recurrenceDate,
            name: name,
            summary: summary,
            description: useRichTextRenderer(description ?? emptyDocument, {}),
            imageUrl: imageUrl,
            startDate: recurrenceDate,
            startTime: occurrenceDate.toLocaleString(DateTime.TIME_SIMPLE),
            endTime: endDate.toLocaleString(DateTime.TIME_SIMPLE),
            dayOfMonth: recurrenceDate.day,
            endDate: recurrenceDate.plus({ hours: duration })
          });
        }

        if (recurrenceRule.includes('Weekly')) {
          recurrenceDate = recurrenceDate.plus({ week: 1 });
        } else if (recurrenceRule.includes('Bi-Weekly')) {
          recurrenceDate = recurrenceDate.plus({ week: 2 });
        } else if (recurrenceRule.includes('Monthly')) {
          recurrenceDate = recurrenceDate.plus({ month: 1 });
        } else {
          console.error(
            'There was a problem with the events recurrence rule: ' +
              recurrenceRule
          );
          return;
        }
      }
    }
  });

  return calendarDisplayEvents;
};

onMounted(async () => {
  if (props.events) {
    displayedEvents.value = generateDisplayEvents(
      props.events,
      selectedYear.value,
      selectedMonth.value
    );
  }
});

const hasEvent = (day: number | null): boolean | undefined => {
  return (
    displayedEvents.value.some((event) => event.dayOfMonth === day) ?? false
  );
};

const getEventsForDay = (day: number | null): CalendarDisplayEvent[] => {
  return displayedEvents.value
    .filter((event) => event.dayOfMonth === day)
    .sort((a, b) => a.startDate - b.startDate);
};

const daysInMonth = computed(() => {
  const date = DateTime.fromObject({
    year: selectedYear.value,
    month: selectedMonth.value
  });
  return date.isValid ? date.daysInMonth : 0;
});

const firstDayOfMonth = computed(() => {
  const firstDay = DateTime.fromObject({
    year: selectedYear.value,
    month: selectedMonth.value,
    day: 1
  }).weekday;
  return firstDay === 7 ? 0 : firstDay; // Converts 7 (Sunday) to 0
});

const calendarDays = computed(() => {
  const days = [];
  const totalDays = daysInMonth.value;
  const firstDay = firstDayOfMonth.value;

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  return days;
});

const isToday = (day: number | null): boolean => {
  const today = DateTime.local();
  return (
    day === today.day &&
    selectedMonth.value === today.month &&
    selectedYear.value === today.year
  );
};

const changeMonth = (offset: number) => {
  const newMonth = selectedMonth.value + offset;
  if (newMonth < 0) {
    selectedMonth.value = 12;
    selectedYear.value -= 1;
  } else if (newMonth > 12) {
    selectedMonth.value = 1;
    selectedYear.value += 1;
  } else {
    selectedMonth.value = newMonth;
  }
  if (props.events) {
    displayedEvents.value = generateDisplayEvents(
      props.events,
      selectedYear.value,
      selectedMonth.value
    );
  }
};

const openDay = (day: number | null) => {
  openedEvents.value = getEventsForDay(day);
  showModal.value = true;
};

function closeDay(): void {
  showModal.value = false;
}
</script>

<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="changeMonth(-1)">
        <img
          alt="previous calendar month"
          class="navigation-button"
          src="/img/prev-icon.svg" />
      </button>
      <transition mode="out-in" name="fade">
        <h3 :key="formattedMonthYear">{{ formattedMonthYear }}</h3>
      </transition>
      <button @click="changeMonth(1)">
        <img
          alt="next calendar month"
          class="navigation-button"
          src="/img/next-icon.svg" />
      </button>
    </div>

    <p v-if="events === null" class="calendar-error-message">
      Sorry, there was an error loading the calendar events :(
    </p>
    <transition mode="out-in" name="fade">
      <div :key="formattedMonthYear" class="calendar-grid">
        <div
          v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
          :key="day"
          class="day-label">
          {{ day }}
        </div>
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          class="day"
          :class="{ 'has-event': hasEvent(day), today: isToday(day) }"
          role="button"
          tabindex="0"
          @click="hasEvent(day) ? openDay(day) : null"
          @keydown.enter="hasEvent(day) ? openDay(day) : null">
          <span v-if="day" class="day-number">
            {{ day }}
          </span>
          <ul v-if="hasEvent(day)" class="events-list is-displayed-desktop-l">
            <li
              v-for="event in getEventsForDay(day).slice(0, 2)"
              :key="event.id">
              <div class="event">
                <span class="event-time">{{ event.startTime }}</span>
                {{ event.name }}
              </div>
            </li>
          </ul>
          <div
            v-if="getEventsForDay(day).length > 2"
            class="more-events is-displayed-desktop-l">
            +{{ getEventsForDay(day).length - 2 }} more
          </div>
        </div>
      </div>
    </transition>
  </div>
  <EventModal
    :events="openedEvents"
    :is-visible="showModal"
    @close="closeDay" />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.calendar {
  min-height: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  text-align: center;
  flex-grow: 1;
  align-items: center;
}

.day-number {
  padding-left: 4px;
  padding-top: 4px;
  padding-bottom: 2px;
  align-self: flex-start;
}

.day {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 125px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background: #f9f9f9;
  transition: background-color 0.3s ease;
  overflow: hidden;
}

.has-event:hover {
  background: #e0e0e0;
}

.has-event {
  border: 1px solid #bc4749;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.today {
  background: #e0e0e0;
}

.events-list {
  max-height: 72px;
  overflow: hidden;
}

.event {
  display: flex;
  flex-direction: column;
  padding: 2px 4px;
  font-size: 0.8rem;
  color: #333;
  list-style: none;
  text-align: left;
  margin: 0;
}

.event-time {
  font-weight: bold;
}

.more-events {
  height: 16px;
  font-size: 0.8rem;
}

.calendar-error-message {
  color: red;
  font-size: 0.8rem;
  margin-bottom: 10px;
  margin-top: 0;
  text-align: center;
}

@media (max-width: 768px) {
  .calendar {
    min-height: unset;
  }
  .day {
    height: 10vw;
  }
  .day.has-event::after {
    border-top: 10px solid #bc4749;
    border-left: 10px solid transparent;
  }
}
</style>
