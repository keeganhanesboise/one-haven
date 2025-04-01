<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="changeMonth(-1)">←</button>
      <h3>{{ new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long', year: 'numeric' }) }}</h3>
      <button @click="changeMonth(1)">→</button>
    </div>

    <div class="calendar-grid">
      <div class="day-label" v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day">
        {{ day }}
      </div>
      <div class="day" :class="{ 'has-event': hasEvent(day) }" v-for="(day, index) in calendarDays" :key="index">
        <span class="day-number" v-if="day">{{ day }}<span class="today" v-if="isToday(day)"> (today)</span></span>
        <ul class="is-displayed-desktop-l" v-if="hasEvent(day)">
          <li v-for="event in getEventsForDay(day)" :key="event.id">
            <div class="event">
              <span class="event-time">{{ event.startTime }}</span>
              {{ event.name }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { CalendarDisplayEvent, CalendarEventEntry } from '~/types/contentful';

  const props = defineProps<{
    events?: CalendarEventEntry[];
    startingYear: number;
    startingMonth: number;
  }>();

  const selectedYear = ref(props.startingYear);
  const selectedMonth = ref(props.startingMonth);
  const displayedEvents = ref<CalendarDisplayEvent[]>([]);

  // todo -> add other fields in event
  const generateDisplayEvents = (events: CalendarEventEntry[], year: number, month: number): CalendarDisplayEvent[] => {
    const calendarDisplayEvents: CalendarDisplayEvent[] = [];

    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 1);
    monthEnd.setHours(0, 0, 0, 0);

    events.forEach(event => {
      const {
        recurrenceRule,
        recurrenceEndDate,
        name,
        duration,
        summary,
        startDate
      } = event.fields;
      const occurrenceDate = new Date(startDate);
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + duration);

      const startTimeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/Denver'
      };

      // event doesn't recur
      if (!recurrenceRule || recurrenceRule.length === 0) {
        if (occurrenceDate >= monthStart && occurrenceDate <= monthEnd) {
          calendarDisplayEvents.push({
            id: name + occurrenceDate,
            name: name,
            summary: summary,
            startDate: occurrenceDate,
            startTime: new Intl.DateTimeFormat('en-US', startTimeOptions).format(occurrenceDate),
            dayOfMonth: occurrenceDate.getDate(),
            endDate: endDate
          })
        }

      // event is recurring, find out which dates it occurs this month based on it's initial start day
      } else {
        let recurrenceEnd = recurrenceEndDate ? new Date(recurrenceEndDate) : monthEnd;

        if (recurrenceEnd > monthEnd) recurrenceEnd = monthEnd;

        let recurrenceDate = new Date(occurrenceDate);

        while (recurrenceDate <= recurrenceEnd) {
          if (recurrenceDate >= monthStart) {
            calendarDisplayEvents.push({
              id: name + new Date(recurrenceDate),
              name: name,
              summary: summary,
              startDate: new Date(recurrenceDate),
              startTime: new Intl.DateTimeFormat('en-US', startTimeOptions).format(occurrenceDate),
              dayOfMonth: recurrenceDate.getDate(),
              endDate: new Date(recurrenceDate.getTime() + duration * 60 * 60 * 1000),
            });
          }

          // todo -> handle when the user selects more than one recurrence rule
          // todo -> and one needs to take precedence over the other
          if (recurrenceRule.includes('Weekly')) {
            recurrenceDate.setDate(recurrenceDate.getDate() + 7);
          } else if (recurrenceRule.includes('Bi-Weekly')) {
            recurrenceDate.setDate(recurrenceDate.getDate() + 14);
          } else if (recurrenceRule.includes('Monthly')) {
            recurrenceDate.setMonth(recurrenceDate.getMonth() + 1);
          } else {
            // todo -> handle this case where recurrenceRule was improperly set
            console.log('orh narh');
            console.log(event);
            recurrenceDate.setDate(recurrenceDate.getDate() + 7);
          }
        }
      }
    });

    return calendarDisplayEvents;
  }

  onMounted(async () => {
    if (props.events) {
      displayedEvents.value = generateDisplayEvents(props.events, selectedYear.value, selectedMonth.value);
    }
  });

  const hasEvent = (day: number | null): boolean | undefined => {
    return displayedEvents.value.some((event) => event.dayOfMonth === day) ?? false;
  };

  const getEventsForDay = (day: number | null): CalendarDisplayEvent[] => {
    return displayedEvents.value
      .filter((event) => event.dayOfMonth === day)
      .map((event) => event)
  };
  
  const daysInMonth = computed(() => {
    return new Date(selectedYear.value, selectedMonth.value + 1, 0).getDate();
  });

  const firstDayOfMonth = computed(() => {
    return new Date(selectedYear.value, selectedMonth.value, 1).getDay(); // 0 = Sunday
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
    const today = new Date();
    return (
      day === today.getDate() &&
      selectedMonth.value === today.getMonth() &&
      selectedYear.value === today.getFullYear()
    );
  };

  const changeMonth = (offset: number) => {
    let newMonth = selectedMonth.value + offset;
    if (newMonth < 0) {
      selectedMonth.value = 11;
      selectedYear.value -= 1;
    } else if (newMonth > 11) {
      selectedMonth.value = 0;
      selectedYear.value += 1;
    } else {
      selectedMonth.value = newMonth;
    }
    if (props.events) {
      displayedEvents.value = generateDisplayEvents(props.events, selectedYear.value, selectedMonth.value);
    }
  }
</script>

<style scoped>
button {
  width: 25px;
  height: 25px;
  cursor: pointer;
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

@media (max-width: 768px) {
  .today {
    display: none;
  }
  .calendar {
    min-height: unset;
  }
  .day {
    height: 10vw;
  }
}
</style>