<script>
  //This code was imported from a github repository. All code was inputed by Richard Cao
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';
  import dayGrid from '@event-calendar/day-grid';
  import '@event-calendar/core/index.css'

  let plugins = [TimeGrid, dayGrid];
  let options = {
      view: 'dayGridMonth',
      height: '600px',
      allDaySlot: false,
      selectBackgroundColor: 'white',
      headerToolbar: {start: 'title', center:'dayGridMonth, timeGridWeek, timeGridDay', end: 'today,prev,next'},
      events: [
      ]
  };
</script>

<body>
  <div class = Calendar style="position: absolute; top: 110px; width : 800px; display: flex; align-items: center;" >
    <Calendar {plugins} {options} />
  </div>
</body>

<style>
  body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
