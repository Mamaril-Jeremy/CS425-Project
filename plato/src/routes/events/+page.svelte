<script>
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';
  import dayGrid from '@event-calendar/day-grid';
  import '@event-calendar/core/index.css'

  let plugins = [TimeGrid, dayGrid];
  let options = {
      view: 'dayGridMonth',
      height: '600px',
      selectBackgroundColor: 'white',
      headerToolbar: {start: 'title', center:'dayGridMonth, timeGridWeek, timeGridDay', end: 'today prev,next'},
      events: [
      ]
  };
</script>

<div class = Calender style="position: relative; top: 110px;">
  <Calendar {plugins} {options} />
</div>
