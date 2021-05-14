<template>
    <div id="calendar">
        <div id="cal-month">{{monthName}}</div>

        <select v-model="view" id="calViewSelect">
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
        </select>
        <button class="button_add" v-on:click="toggle = !toggle">Add an event</button>
        <div class="calContainer">
            <cal style="height: 800px;"
                 :schedules="this.$store.state.events"
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
                 @clickSchedule="onClickSchedule"
                 ref="calref" />
        </div>
        <transition name="modal">
            <div v-show="toggle" id="popup">
                <div class="overlay">
                    <div class="modal">
                        <h4>Enter Title</h4>
                        <input type="text" v-model="title" placeholder="Enter event title here..." required><br />
                        <h4>Enter Location</h4>
                        <input v-model="location" placeholder="Enter event location here..."><br />
                        <h4>Start Time</h4>
                        <input type="datetime-local" v-model="sdate"><br /><br />
                        <h4>End Time</h4>
                        <input type="datetime-local" v-model="edate"><br /><br />
                        <h4>Mark Completed</h4>
                        <input type="checkbox" id="checkbox" v-model="completed">
                        <label for="checkbox">{{ completed }}</label><br /><br />
                        <button type="submit" v-on:click="saveEvent">Save event</button>
                        <button class="button_close_popup" v-on:click="closePopUp">Close </button>

                    </div>
                </div>
            </div>
        </transition>
        <transition name="modal">
            <div v-show="editToggle" id="epopup">
                <div class="overlay">
                    <div class="modal">
                        <h4>Edit Title</h4>
                        <input type="text" v-model="edittitle" placeholder="Enter event title here..." required><br />
                        <h4>Edit Location</h4>
                        <input v-model="location" placeholder="Enter event location here..."><br />
                        <h4>Start Time</h4>
                        <input type="datetime-local" v-model="sdate"><br /><br />
                        <h4>End Time</h4>
                        <input type="datetime-local" v-model="edate"><br /><br />
                        <h4>Mark Completed</h4>
                        <input type="checkbox" id="checkbox" v-model="completed">
                        <label for="checkbox">{{ completed }}</label><br /><br />
                        <button type="submit" v-on:click="editEvent">Edit event</button>
                        <button class="button_close_popup" v-on:click="closeEPopUp">Close </button>

                    </div>
                </div>
            </div>
        </transition>
        <transition name="modal">
            <div v-show="detailToggle" id="detailViewID">
                <div class="overlay">
                    <div class="modal">
                        <h4>Event Title: {{detailTitle}}</h4>

                        <h4>Edit Location: {{detailLocation}}</h4>

                        <h4>Start Time: {{detailsdate}}</h4>

                        <h4>End Time: {{detailedate}}</h4>

                        <h4>Completed: {{detailcompleted}}</h4>

                        <button type="submit" v-on:click="closeDPopUp(); openEditPopUp(); ">Edit event</button>
                        <button class="button_close_popup" v-on:click="closeDPopUp">Close </button>

                    </div>
                </div>
            </div>
        </transition>

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
                useCreationPopup: false,
                useDetailPopup: false,
                monthName: this.$store.state.monthNames[(new Date).getUTCMonth()],
                title: "",
                location: "",
                sdate: '',
                edate: '',
                completed: false,
                timesChanged: 0,
                toggle: false,
                editToggle: false,
                edittitle: "",
                editEventID: -1,
                detailToggle: false,
                detailTitle: "",
                detailLocation: "",
                detailsdate: '',
                detailedate: '',
                detailcompleted: false,



            }
        },
        methods: {
            saveEvent: function (e) {
                const title = this.title;
                const location = this.location;
                const sdate = this.sdate;
                const edate = this.edate;
                const com = this.completed;
                const timesChanged = this.timesChanged;
                var schedule = {
                    id: +new Date(),
                    title: title,
                    location: location,
                    isAllDay: true,
                    start: sdate,
                    end: edate,
                    category: 'allday',
                    completed: com,
                    timesChanged: timesChanged
                };
                console.log(schedule.start)
                this.$store.commit("addEvent", schedule)
                this.toggle = false;
            },
            editEvent: function (e) {
                const edittitle = this.edittitle;
                const location = this.location;
                const sdate = this.sdate;
                const edate = this.edate;
                const com = this.completed;
                const timesChanged = this.timesChanged;
                const evntID = this.editEventID;

                this.$store.commit("deleteEvent", {"id":evntID});

                var schedule = {
                    id: evntID,
                    title: edittitle,
                    location: location,
                    isAllDay: true,
                    start: sdate,
                    end: edate,
                    category: 'allday',
                    completed: com,
                    timesChanged: timesChanged
                };
                this.$store.commit("addEvent", schedule);
                //this.$store.commit("updateEvent", e)
                //this.$refs.calref.invoke("updateSchedule", e.schedule.id, e.schedule.calendarId, e.changes)
                this.closeEPopUp();
            },
            openPopUp() {
                this.toggle = true;
            },
            closePopUp: function() {
                this.toggle = false;
            },
            openEditPopUp: function () {
                //this.editEventID = e.schedule.id
                this.editToggle = true;
            },
            closeEPopUp: function () {
                this.editToggle = false;
            },
            openDetailview(e) {
                this.editEventID = e.schedule.id
                this.detailToggle = true;
            },
            closeDPopUp: function () {
                this.detailToggle = false;
            },



            onClickSchedule(e) {
                //console.log('clickSchedule', e);
                //console.log(this.$store.state.events)
                let eventObj = {};
                for (let i = 0; i < this.$store.state.events.length; i++) {
                    if (this.$store.state.events[i].id == e.schedule.id) {
                        eventObj = this.$store.state.events[i];
                    }
                }
                this.detailTitle = e.schedule.title;
                this.detailLocation = e.schedule.location;
                this.detailsdate = new Date(e.schedule.start);
                this.detailedate = new Date(e.schedule.end);
                this.detailcompleted = eventObj.completed;
                this.openDetailview(e);
                /*
                const willModify = confirm(`Title of event: ${e.schedule.title}\n When: ${(new Date(e.schedule.start))} \n to ${(new Date(e.schedule.end))} \n Completion Status: ${eventObj.completed}\n Location: ${e.schedule.location}\n Will you update schedule?`);
                if (willModify) {
                    this.openEditPopUp(e)
                }
                */
            },

            onBeforeCreateSchedule(e) {
                //console.log('beforeCreateSchedule', e)
                this.openPopUp()
                //const title = prompt('Schedule', 'Enter Title');

                //calendar.createSchedules([schedule]);
                //this.saveEvent(e)

                //console.log("aaaaaaaaaaaaaaaaa")
                e.guide.clearGuideElement();
                //this.$store.commit("addEvent", e)
                //this.$refs.calref.invoke("createSchedules", [e])
            },
            onBeforeUpdateSchedule(e) {
                //update the store too
                this.$store.commit("updateEvent", e)
                this.$refs.calref.invoke("updateSchedule", e.schedule.id, e.schedule.calendarId, e.changes)
            },
            onBeforeDeleteSchedule(e) {
                //update the store too
                this.$store.commit("deleteEvent", e.schedule)
                this.$refs.calref.invoke("deleteSchedule", e.schedule.id, e.schedule.calendarId)
            }



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
     border: 2px groove #A07855FF;
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

    .button_add {
        float: right;
    }

    .button_add {
        float: right;
    }

    .modal {
        width: 500px;
        margin: 0px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px 3px;
        transition: all 0.2s ease-in;
        font-family: Helvetica, Arial, sans-serif;
    }
    .fadeIn-enter {
        opacity: 0;
    }

    .fadeIn-leave-active {
        opacity: 0;
        transition: all 0.2s step-end;
    }

        .fadeIn-enter .modal,
        .fadeIn-leave-active.modal {
            transform: scale(1.1);
        }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #00000094;
        z-index: 999;
        transition: opacity 0.2s ease;
    }

</style>
