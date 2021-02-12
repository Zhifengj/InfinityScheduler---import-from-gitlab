<template>
    <div id="calendar">
        <div id="cal-month">{{monthName}}</div>

        <select v-model="view" id="calViewSelect">
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
        </select>
        <div class="calContainer">
            <cal style="height: 800px;"
                 :schedules="events"
                 :view="view"
                 :taskView="taskView"
                 :scheduleView="scheduleView"
                 :theme="theme"
                 :week="weekOptions"
                 :month="monthOptions"
                 :timeZones="timeZoneOptions"
                 :disableDblClick="disableDblClick"
                 :isReadOnly="isReadOnly"
                 :template="template"
                 :useCreationPopup="useCreationPopup"
                 :useDetailPopup="useDetailPopup"
                 @beforeCreateSchedule="onBeforeCreateSchedule"
                 @beforeUpdateSchedule="onBeforeUpdateSchedule"
                 @beforeDeleteSchedule="onBeforeDeleteSchedule"
                 ref="calref" />
        </div>
       
    </div>
</template>

<script>
    import { Calendar } from '@toast-ui/vue-calendar'

    import 'tui-calendar/dist/tui-calendar.css';

    // If you use the default popups, use this.
    import 'tui-date-picker/dist/tui-date-picker.css';
    import 'tui-time-picker/dist/tui-time-picker.css';

  

    export default {
        name: 'calendar',
        data(){
            return {
                events: this.$store.state.events,
                view: "month",
                taskView: false,
                scheduleView: ['time'],
                theme: this.$store.state.theme,
                weekOptions: this.$store.state.weekOptions,
                monthOptions: this.$store.state.monthOptions,
                timeZoneOptions: this.$store.state.timeZoneOptions,
                disableDblClick: false,
                isReadOnly: false,
                template: {
                    milestone: function (schedule) {
                        return `<span style="color:red;">${schedule.title}</span>`;
                    },
                    milestoneTitle: function () {
                        return 'MILESTONE';
                    },
                },
                useCreationPopup: true,
                useDetailPopup: true,
                monthName: this.$store.state.monthNames[(new Date).getUTCMonth()]

            }
        },
        methods: {
            onBeforeCreateSchedule(e) {
                this.$store.commit("addEvent", e)
                //this.$refs.calref.invoke("createSchedules", [e])
            },
            onBeforeUpdateSchedule(e) {
                //update the store too
                this.$store.commit("updateEvent", e)
                this.$refs.calref.invoke("updateSchedule", e.schedule.id, e.schedule.calendarId, e.changes)
            },
            onBeforeDeleteSchedule(e) {
                //update the store too
                this.$store.dispatch("deleteEvent", e.schedule)
                this.$refs.calref.invoke("deleteSchedule", e.schedule.id, e.schedule.calendarId)
            },
            

        },
        components: {
            'cal': Calendar
        }


    }
</script>

<style>

   #calendar {
     margin-right: 300px;
     margin-left: 300px;
     margin-top: 50px;
     padding: 50px;
     border: 2px groove #329ea8;
     border-radius: 5px;
   }

    .inf-header {
        border: 2px solid black;
        padding: 10px;
        margin-bottom: 50px;
        text-align: center;
        font-family: Verdana;
        font-size: large;
        background-color: #0670bf;
        color: #ffffff;
        text-shadow: 5px 5px 5px #333;
        font-style: italic;
    }

    #cal-month {
        text-align: center;
        padding: 20px;
        font-size: large;
    }

</style>
