<script>
    import { onMount } from 'svelte';
    import { Calendar } from '@fullcalendar/core';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import interactionPlugin from '@fullcalendar/interaction';

    let calendar;

    onMount(() => {
        const calendarEl = document.getElementById('calendar');
        calendar = new Calendar(calendarEl, {
            plugins: [interactionPlugin, dayGridPlugin],
            initialView: 'dayGridMonth',
            editable: true,
            events: [
                // March 2024
                { title: 'Deadline to apply for May graduation', start: new Date(2024, 2, 1) },
                { title: 'Final day to receive a 50% refund if completely withdrawing from the University', start: new Date(2024, 2, 1) },
                { title: 'Summer Session registration starts', start: new Date(2024, 2, 18) },
                { title: 'Final fee payment due for those on a payment plan', start: new Date(2024, 2, 19) },
                { title: 'Spring Break (campus open; no classes)', start: new Date(2024, 2, 23), end: new Date(2024, 2, 31) },

                // April 2024
                { title: 'Fall semester enrollment begins', start: new Date(2024, 3, 1) },
                { title: 'Final day to drop classes and receive a "W"', start: new Date(2024, 3, 2) },
                { title: 'Final day to change from credit to audit', start: new Date(2024, 3, 2) },
                { title: 'No dropping of individual classes after this deadline', start: new Date(2024, 3, 2) },

                // May 2024
                { title: 'Prep Day', start: new Date(2024, 4, 8) },
                { title: 'Finals week begins', start: new Date(2024, 4, 9) },
                // { title: 'Final day for submitting thesis/dissertation and notice of completion with Graduate School for May graduation', start: TBA },
                { title: 'Instruction ends', start: new Date(2024, 4, 15) },
                { title: 'On-campus residence hall move-out (11 a.m.)', start: new Date(2024, 4, 16) },
                { title: 'Commencement', start: new Date(2024, 4, 16), end: new Date(2024, 4, 18) },
                { title: 'Faculty to post final grades in MyNEVADA by 5 p.m.', start: new Date(2024, 4, 20) },
                { title: 'Spring semester ends, last day faculty on campus for spring semester', start: new Date(2024, 4, 20) },

                // Summer 2024 academic calendar - May 2024
                { title: 'Mini and Regular session fees due; final day to pay Mini and Regular Session fees without incurring late payment fees', start: new Date(2024, 4, 17) },
                { title: 'First Summer payment due for students on a payment plan', start: new Date(2024, 4, 17) },
                { title: 'Mini and Regular Session classes begin', start: new Date(2024, 4, 20) },
                { title: 'Final day to add Mini Session classes', start: new Date(2024, 4, 21) },
                { title: 'Final day to receive a 100% refund for Mini Session', start: new Date(2024, 4, 21) },
                { title: 'Final day to change a Mini Session class from letter grade to S/U or S/U to letter grade or audit to credit', start: new Date(2024, 4, 21) },
                { title: 'Final day to drop Mini Session classes and receive a 50% refund', start: new Date(2024, 4, 22) },
                { title: 'Memorial Day (campus closed; no classes)', start: new Date(2024, 4, 27) },
                { title: 'Final day to add Regular Session classes', start: new Date(2024, 4, 30) },
                { title: 'Final day to receive a 100% refund for Regular Session classes', start: new Date(2024, 4, 30) },
                { title: 'Final day to withdraw from a Mini Session class and receive a "W"', start: new Date(2024, 4, 30) },
                { title: 'Final day to change a Mini Session class from credit to audit', start: new Date(2024, 4, 30) },

                // June 2024
                { title: 'Deadline for August graduation applications', start: new Date(2024, 5, 1) },
                { title: 'Final day to drop Regular Session classes and receive a 50% refund', start: new Date(2024, 5, 1) },
                { title: 'Mini Session instruction ends', start: new Date(2024, 5, 8) },
                { title: 'First Session fees due; final day to pay First Session fees without incurring late payment fees', start: new Date(2024, 5, 8) },
                { title: 'Mini Session grades due', start: new Date(2024, 5, 10) },
                { title: 'First Session classes begin', start: new Date(2024, 5, 10) },
                { title: 'Final day to receive a 100% refund for First Session classes', start: new Date(2024, 5, 12) },
                { title: 'Final day to add First Session classes', start: new Date(2024, 5, 12) },
                { title: 'Final day to change a First Session class from letter grade to S/U or S/U to letter grade or audit to credit', start: new Date(2024, 5, 12) },
                { title: 'Final day to drop First Session classes and receive a 50% refund', start: new Date(2024, 5, 14) },
                { title: 'Juneteenth (campus closed; no classes)', start: new Date(2024, 5, 19) },
                { title: 'Second Summer payment due for students on a payment plan', start: new Date(2024, 5, 17) },
                { title: 'Final day to withdraw from First Session classes and receive a "W"', start: new Date(2024, 5, 28) },
                { title: 'Final day to change a First Session class from credit to audit', start: new Date(2024, 5, 28) },

                // July 2024
                { title: 'Independence Day (campus closed; no classes)', start: new Date(2024, 6, 4) },
                { title: 'Final day to withdraw from a Regular Session class and receive a "W"', start: new Date(2024, 6, 11) },
                { title: 'First Session instruction ends', start: new Date(2024, 6, 12) },
                { title: 'Second Session fees due; final day to pay all Second Session fees without incurring late payment fees', start: new Date(2024, 6, 12) },
                { title: 'First Session grades due', start: new Date(2024, 6, 15) },
                { title: 'Second Session classes begin', start: new Date(2024, 6, 15) },
                { title: 'Final day to receive a 100% refund for Second Session classes', start: new Date(2024, 6, 17) },
                { title: 'Final day to add Second Session classes', start: new Date(2024, 6, 17) },
                { title: 'Final day to change a Second Session class from letter grade to S/U or S/U to letter grade or audit to credit', start: new Date(2024, 6, 17) },
                { title: 'Final Summer payment due for students on a payment plan', start: new Date(2024, 6, 17) },
                { title: 'Final day to drop Second Session classes and receive a 50% refund', start: new Date(2024, 6, 19) },

                // August 2024
                { title: 'Final day to change a Second Session class from credit to audit', start: new Date(2024, 7, 1) },
                { title: 'Final day to withdraw from Second Session classes and receive a "W"', start: new Date(2024, 7, 1) },
                // { title: 'Deadline for submitting thesis/dissertation and Notice of Completion with Graduate School for August graduation', start: TBA },
                { title: 'Second Session and Regular Session instruction ends', start: new Date(2024, 7, 14) },
                { title: 'Final grades for all Summer term classes due by 5 p.m. in MyNEVADA', start: new Date(2024, 7, 16) },

                // September 2024
                { title: 'Labor Day (campus closed; no classes)', start: new Date(2024, 8, 2) },
                { title: 'Final day to receive a 100% refund if dropping individual classes or completely withdrawing from the University', start: new Date(2024, 8, 5) },
                { title: 'Final day to change from a letter grade to S/U or S/U to a letter grade or audit', start: new Date(2024, 8, 5) },
                { title: 'Final day to add or swap classes with permission from instructor', start: new Date(2024, 8, 5) },
                { title: 'No refunds after this date unless completely withdrawing from the University; 50% refund for complete withdrawal begins', start: new Date(2024, 8, 5) },
                { title: 'Second fee payment due for those on payment plan', start: new Date(2024, 8, 23) },

                // October 2024
                { title: 'Deadline to apply for December graduation', start: new Date(2024, 9, 1) },
                { title: 'Final day to receive a 50% refund if completely withdrawing from the University', start: new Date(2024, 9, 4) },
                { title: 'Final fee payment due for those on payment plan', start: new Date(2024, 9, 23) },
                { title: 'Nevada Day (campus closed; no classes)', start: new Date(2024, 9, 25) },
                { title: 'Final day to drop classes and receive a "W"', start: new Date(2024, 9, 30) },
                { title: 'Final day to change from credit to audit', start: new Date(2024, 9, 30) },
                { title: 'No dropping of individual classes after this deadline', start: new Date(2024, 9, 30) },

                // November 2024
                { title: 'Veteran\'s Day (campus closed; no classes)', start: new Date(2024, 10, 11) },
                { title: 'Thanksgiving Day (campus closed; no classes)', start: new Date(2024, 10, 28) },
                { title: 'Family Day (campus closed; no classes)', start: new Date(2024, 10, 29) },

                // December 2024
                { title: 'Final day for submitting thesis/dissertation and notice of completion with Graduate School for December graduation', start: new Date(2024, 11, 6) },
                { title: 'Commencement', start: new Date(2024, 11, 7) },
                { title: 'Prep Day', start: new Date(2024, 11, 11) },
                { title: 'Finals week begins', start: new Date(2024, 11, 12) }
            ],
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }
        });
        calendar.render();
        window.addEventListener('resize', () => {
            calendar.updateSize();
        });
    });
</script>

<style>
    #calendar {
        height: 80vh;
        width: 80%;
        margin: 100px 20px 0px; 
    }
</style>

<div id="calendar"></div>
<div><button>Add Event</button></div>
<div><button>Remove Event</button></div>

