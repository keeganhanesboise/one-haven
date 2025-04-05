<template>
  <SectionSlot>
    <div class="games-and-events-container">
      <div class="event-info-container">
        <div class="event-info-text">
          <h2>Games & Events</h2>
          <p v-html="gamesAndEventsInfo"/>
        </div>
        <div class="event-info-img">
          <img id="redD20" src="/img/playing-cards.svg" alt=""/>
        </div>
      </div>
      <div class="event-calendar-container">
        <div v-if="fetchingCalendarEvents" class="placeholder-calendar"></div>
        <Calendar v-else :events="calendarEvents" :startingYear="currentYear" :startingMonth="currentMonth" />
      </div>
    </div>
  </SectionSlot>
</template>

<script setup lang="ts">
  import { useContentful } from '~/composables/useContentful';
  import type { CalendarEventEntry } from '~/types/contentful';

  defineProps<{
    gamesAndEventsInfo: string;
  }>();

  let contentfulClient: any;
  const calendarEvents = ref<CalendarEventEntry[] | null>([]);
  const fetchingCalendarEvents = ref(false);

  const currentDate = new Date();
  const currentYear = ref(currentDate.getFullYear());
  const currentMonth = ref(currentDate.getMonth());

  const getEvents = async (): Promise<any> => {
    fetchingCalendarEvents.value = true;

    try {
      contentfulClient = useContentful();
      if (contentfulClient) {
        try {
          // ponder -> fetch only current months events instead of all?
          const events = await contentfulClient.getEntries({
            content_type: 'calendarEvent',
          });
          calendarEvents.value = events.items;
        } catch (error) {
          console.error('Error fetching events:', error);
          calendarEvents.value = null;
        }
      }
    } catch (error) {
      console.error('Failed to initialize Contentful client:', error);
      contentfulClient = null;
      calendarEvents.value = null;
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
    margin-top: 0;
  }
  p {
    color: white;
  }
  .games-and-events-container {
    display: flex;
    justify-content: center;
    height: 100%;
    gap: 50px;
  }
  .event-info-container {
    display: flex;
    flex-direction: column;
    width: 30%;
  }
  .event-info-img {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .event-calendar-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
  }
  .placeholder-calendar {
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

  @media (max-width: 991px) {
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

  @media (max-width: 768px) {
    .games-and-events-container {
      gap: 25px;
    }
  }
</style>