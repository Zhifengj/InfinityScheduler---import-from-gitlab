<template>
    <div id="calendar">
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
             />
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
                events: this.$store.events,
                view: this.$store.calView,
                taskView: true,
                scheduleView: ['time'],
                theme: this.$store.theme,
                weekOptions: this.$store.weekOptions,
                monthOptions: this.$store.monthOptions,
                timeZoneOptions: this.$store.timeZoneOptions,
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
                useDetailPopup: false,

            }
        },
        methods: {
            onBeforeCreateSchedule(e) {
                this.$store.commit("addEvent", e)
            },
        },
        components: {
            'cal': Calendar
        }


    }
</script>

<style>
  
   

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

    
</style>
