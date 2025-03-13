<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="changeMonth(-1)">←</button>
      <h3>{{ new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' }) }}</h3>
      <button @click="changeMonth(1)">→</button>
    </div>

    <div class="calendar-grid">
      <div class="day-label" v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day">
        {{ day }}
      </div>
      <div class="day" :class="{ 'is-today': isToday(day) }" v-for="(day, index) in calendarDays" :key="index">
        <span class="day-number" v-if="day">{{ day }}</span>
        <div v-if="hasEvent(day)" class="event">{{ getEventForDay(day) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  type CalendarEvent = {
    date: number;
    month: number;
    year: number;
    eventTitle: string;
  };

  const props = defineProps<{
    events?: CalendarEvent[];
  }>();

  const hasEvent = (day: number | null): boolean | undefined => {
    return props.events?.some(
      (event) => event.date === day && event.month === currentMonth.value && event.year === currentYear.value
    ) ?? false;
  };

  const getEventForDay = (day: number | null): string => {
    const event = props.events?.find(
      (event) => event.date === day && event.month === currentMonth.value && event.year === currentYear.value
    );
    return event ? event.eventTitle : '';
  };

  const today = new Date();
  const currentYear = ref(today.getFullYear());
  const currentMonth = ref(today.getMonth()); // 0 = January

  const daysInMonth = computed(() => {
    return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  });

  const firstDayOfMonth = computed(() => {
    return new Date(currentYear.value, currentMonth.value, 1).getDay(); // 0 = Sunday
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
    return (
      day === today.getDate() &&
      currentMonth.value === today.getMonth() &&
      currentYear.value === today.getFullYear()
    );
  };

  const changeMonth = (offset: number) => {
    let newMonth = currentMonth.value + offset;
    if (newMonth < 0) {
      currentMonth.value = 11;
      currentYear.value -= 1;
    } else if (newMonth > 11) {
      currentMonth.value = 0;
      currentYear.value += 1;
    } else {
      currentMonth.value = newMonth;
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
  width: 650px;
  height: 700px;
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
  padding-left: 5px;
  padding-top: 5px;
  align-self: flex-start;
}

.day {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background: #f9f9f9;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.day:hover {
  background: #e0e0e0;
}

.is-today {
  background: #ffcc00;
  color: black;
  font-weight: bold;
}

.event {
  padding: 2px 4px;
  font-size: 0.8rem;
  color: #333;
}
</style>