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
      <div class="event-calendar-container">
        <Calendar :events="calendarEvents" />
      </div>
    </div>
  </SectionSlot>
</template>

<script setup lang="ts">
  const calendarEvents = ref([
    { date: 5, month: 2, year: 2025, eventTitle: 'Game Night' },
    { date: 14, month: 2, year: 2025, eventTitle: 'Special Event' },
    { date: 25, month: 2, year: 2025, eventTitle: 'Board Game Tournament' },
  ])
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