<template>
  <SectionSlot>
    <div class="games-and-events-container">
      <div class="event-info-container">
        <div class="event-info-text">
          <h2>Games & Events</h2>
          <p>Phasellus eu varius ligula, ac rhoncus quam. Sed euismod eros
            pretium dui sodales, id sodales elit tempor. Nam blandit mollis nisi
            vitae pulvinar. Vivamus pretium urna ac velit consectetur pellentesque.
            Morbi sodales nisi eu malesuada molestie. Sed tellus justo, rhoncus eget
            venenatis in, vehicula ornare ipsum. Nulla facilisi.</p>
        </div>
        <div class="event-info-img">
          <img id="redD20" src="/img/red-d20.svg" alt=""/>
        </div>
      </div>
      <div v-if="!fetchingCalendarEvents" class="event-calendar-container">
        <Calendar :events="calendarEvents" :year="2025" :month="4" />
      </div>
    </div>
  </SectionSlot>
</template>

<script setup lang="ts">
  import { useContentful } from '~/composables/useContentful';
  import type { CalendarEventEntry } from '~/types/contentful';

  const contentfulClient = useContentful();
  const calendarEvents = ref<CalendarEventEntry[]>([]);
  const fetchingCalendarEvents = ref(false);

  fetchingCalendarEvents.value = true;

  const getEventsForMonth = async (year: number, month: number): Promise<any> => {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01T00:00:00Z`;
    const endDate = new Date(year, month, 1).toISOString();

    try {
      const events = await contentfulClient.getEntries({
        content_type: 'calendarEvent',
        'fields.startDate[gte]': startDate,
        'fields.startDate[lt]': endDate,
      });

      calendarEvents.value = events.items;
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      fetchingCalendarEvents.value = false
    }
  }

  onMounted(async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = 4;
    await getEventsForMonth(currentYear, currentMonth)
  });
</script>

<style scoped>
  h2 {
    color: white;
  }
  p {
    color: white;
  }
  #redD20 {
    width: 100%;
    max-width: 200px
  }
  .games-and-events-container {
    display: flex;
    height: 100%;
  }
  .event-info-container {
    display: flex;
    flex-direction: column;
    width: 30%;
    justify-content: center;
    padding-right: 10px;
  }
  .event-info-img {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .event-calendar-container {
    width: 70%;
    display: flex;
    align-items: center;
    padding-left: 10px;
    justify-content: center;
  }

  @media (max-width: 768px) {
    #redD20 {
      max-width: 100px;
    }
    .games-and-events-container {
      flex-direction: column;
      justify-content: center;
    }
    .event-info-container {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      padding-right: 0;
    }
    .event-info-text {
      width: 70%;
    }
    .event-info-img {
      width: 30%;
      padding: 10px;
    }
    .event-calendar-container {
      width: 100%;
      padding-left: 0;
    }
  }
</style>