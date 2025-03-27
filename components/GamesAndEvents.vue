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
        <Calendar :events="calendarEvents" :startingYear="currentYear" :startingMonth="currentMonth" />
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

  const currentDate = new Date();
  const currentYear = ref(currentDate.getFullYear());
  const currentMonth = ref(currentDate.getMonth());

  const getEvents = async (): Promise<any> => {
    fetchingCalendarEvents.value = true;

    try {
      // ponder -> fetch only current months events instead of all?
      const events = await contentfulClient.getEntries({
        content_type: 'calendarEvent',
      });
      calendarEvents.value = events.items;
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      fetchingCalendarEvents.value = false
    }
  }

  onMounted(async () => {
    await getEvents();
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