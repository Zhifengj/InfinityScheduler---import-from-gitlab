import Vue from 'vue'
import Vuex from 'vuex'
import process from 'process'

import router from './../router'

//if we ever need to use TZdates, this is how to import it
import { Date as TZDate } from './../../node_modules/tui-calendar/src/js/common/timezone.js'
import  DBUtil  from './../DBUtil'

import axios from 'axios'
process.version = 'v14.0.1'




Vue.use(Vuex)




function getEventIdxById(events, id) {
    for (let e in events) {

        if (events[e].id == id) {
            return e
        }
    }
    return null
}




//unused function for reusing event ids.
function getNextEventID(state) {
    if (state.availableEventIds[state.availableEventIds.length-1] != -1) {
        let id = state.availableEventIds[state.availableEventIds.length - 1]
        state.availableEventIds.splice(state.availableEventIds.length - 1, 1)
        return id
    } else {
        state._nextEventId += 1
        return state._nextEventId
    }
    return 0
}





function convertToTimezone(date) {
    let formatter = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles" })
    return formatter.format(date)
} 

function calcRealDate(dayOfWeek, time) {
    let currentTime = new Date()

    let currYear = currentTime.getUTCFullYear() 
    let currMonth = currentTime.getUTCMonth()
    let currDay = currentTime.getUTCDate()

    currentTime = new Date(currYear, currMonth, currDay, 0, 0, 0, 1).getTime() //gets time of the start of the day

    let currentDay = new Date().getDay()

    let diffOfDays = Math.abs(currentDay - dayOfWeek - 7)

    let newTime = (currentTime + (time*1000) + (diffOfDays * 1000 * 60 * 60 * 24)) //convert to milliseconds
    return new Date(newTime)
}

function normalizeDate(date) {
    if (date instanceof TZDate) {
        return date.getUTCTime()
    }
    
    else if (typeof date == 'number') {
        return date
    } else if (typeof date == 'string') {
        return new Date(date)
    }
    else {
        
        return date.getTime()
    }
}


export default new Vuex.Store({
    state: {
        //-1 means that the next id is a new one
        availableEventIds: [-1],
        _nextEventId: 0,
        timeOffSet: 0,
        events: [],
        nextEvent : null,
        calView: "month",
        user_info: {
          username: '',
          profile_link: ''
        },
        weekOptions: {
            narrowWeekend: true,
            showTimezoneCollapseButton: true,
            timezonesCollapsed: false
        },
        monthOptions: {
            visibleWeeksCount: 6,
            startDayOfWeek: 1
        },
        theme: {
            'month.dayname.height': '30px',
            'month.dayname.borderLeft': '1px solid #ff0000',
            'month.dayname.textAlign': 'center',
            'week.today.color': '#333',
            'week.daygridLeft.width': '100px',
            'week.timegridLeft.width': '100px'

        },
        //TODO
        timezoneOptions: {
            zones: [
                {
                    timezoneName: 'Asia/Seoul',
                    displayLabel: 'GMT+09:00',
                    tooltip: 'Seoul'
                },
                {
                    timezoneName: 'America/New_York',
                    displayLabel: 'GMT-05:00',
                    tooltip: 'New York',
                }
            ],
            offsetCalculator: function (timezoneName, timestamp) {
                // matches 'getTimezoneOffset()' of Date API
                // e.g. +09:00 => -540, -04:00 => 240

                return 0
            },
        },

        monthNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"


        ],

        loginFailure: false,
        registerFailure: false,
        notifs: [],
        todoList: [],




    },
    mutations:{
        //functions that modify state should go here, and are called with $store.commit("<name>", <arg1>, etc...)
        //syncronous



        //adds an event e to the calendar
        addEvent(state, e) {

            let id = state._nextEventId

            e.calendarid = '0'
            e.id = `${id}`

            //might have to change this later
            e.category = 'time'
            e.lastupdated = new Date(Date.now())
            e.created = new Date(Date.now())

            //update with actual state
            e.state = 0
            //update with actual body text
            e.body = ""


            state.events.push(e)
            state._nextEventId += 1
            //update the database id if the id is new

            this.dispatch("updateLastEventID", id + 1)
            //post the event
            this.dispatch("postEvent", e)
        },

        setTimeOffSet(state, offSet) {
          state.timeOffSet = offSet
        },

        updateEvent(state, e) {

            let ev = getEventIdxById(state.events, e.schedule.id)

            state.events[ev].start = e.changes.start
            state.events[ev].end = e.changes.end
            state.events[ev].lastupdated = new Date(Date.now())
            state.events[ev].completed = e.changes.completed
            this.dispatch("updateEvent", state.events[ev])

        },
        deleteEvent(state, e) {
            state.availableEventIds.push(e.id)
            state.events.splice(getEventIdxById(state.events, e.id), 1)
            this.dispatch("deleteEvent", e)
        },

        auth(state, data) {

            state._nextEventId = data.NextTID


        },

        setEvents(state, events) {

            for (let e = 0; e < events.length; e++) {
                //local event names need to be in lowercase

                events[e].start = DBUtil.fromDBDate(events[e].start).getTime()
                events[e].end = DBUtil.fromDBDate(events[e].end).getTime()
                events[e].lastupdated = DBUtil.fromDBDate(events[e].lastupdated)
                events[e].created = DBUtil.fromDBDate(events[e].created)
                events[e].id = `${events[e].tid}`
                events[e].category = 'time'

            }

            state.events = events
        },
        setNotifications(state, notifs) {
            state.notifs = notifs
           
        },
        deleteNotification(state, id) {
            let idx = 0
            for (let i = 0; i < state.notifs.length; i++) {
                if (state.notifs[i].eventID == id) {
                    idx = i
                }
            }
            state.notifs.splice(idx, 1)
            this.dispatch("deleteNotification", {"TID": id})
        },
        addNotification(state, event) {
            state.notifs.push({ "eventID": event.id, "lastDate": event.start })
            //this.dispatch("postNotification", {"TID": event.id, "lastDate": toDBDate(new Date(event.start))})
        },

        checkMissedEvent(state) {
            let now = Date.now()
            for (let i = 0; i < state.events.length; i++) {
                if (!state.events.completed && state.events[i].start < now) {
                    this.commit("addNotification", state.events[i])
                    this.dispatch("reschedule", state.events[i])
                }
            }
        },

        updateUserName(state, username) {
          state.user_info.username = username;
        },

        updateUserProfileLink(state, profile_link) {
          state.user_info.profile_link = profile_link;
        },

        setTodo(state, todoList) {
            state.todoList = todoList;
        },

        addTodo(state, todoList) {
            state.todoList.push({ "Title": todoList.Title, "TID": todoList.TID })
        },

        deleteTodos(state, id) {
            let idx = 0
            for (let i = 0; i < state.todoList.length; i++) {
                if (state.todoList[i].todoID == id) {
                    idx = i
                }
            }
            
        },

    },
    actions: {
        //can be async, called with $store.dispatch("<name>", args, options)

        async reschedule(store, ev) {
            let dayTries = 0
            let timeTries = 0
            let dayShifts = 0

            let takenTimes = []
            for (let i = 0; i < store.state.events.length; i++) { //gets list of future events
                takenTimes.push([normalizeDate(store.state.events[i].start), normalizeDate(store.state.events[i].end)])
            }
            let eventLength = normalizeDate(ev.end) - normalizeDate(ev.start) //length of event being rescheduled 

            while (true) {

                let bestTime = await DBUtil.execDB("ai/getNthBestHourTimeslot", { CID: ev.cid, N: timeTries }) //gets the users preferred time of day for type of event
                bestTime = bestTime.Time
                let splitTime = bestTime.split(":")
                let hour = parseInt(splitTime[0])
                let min = parseInt(splitTime[1])
                let sec = parseInt(splitTime[2])
                bestTime = hour * 60 * 60 + min * 60 + sec

                let bestDay = await DBUtil.execDB("ai/getNthBestDayTimeslot", { CID: ev.cid, N: dayTries }) //gets the users preferred day of week for type of event
                bestDay = bestDay.Day
                let timePref = true
                let dayPref = true


                if (typeof (bestDay) != 'number') { //no preference for day of week, tries to reschedule for next day
                    dayPref = false
                    bestDay = new Date().getDay() + dayShifts
                    dayShifts++
                }

                if (typeof (bestTime) != 'number') { //no preference for time of day, tries to reschedule next available time on preferred day
                    timePref = false
                    let currentDate = new Date()
                    let dayDiff = Math.abs(currentDate.getDay() - bestDay - 7)
                    let timeOffset = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() + dayDiff).getTime()


                    for (let t = (7 * 60 * 60) + timeOffset; t < (21 * 60 * 60) + timeOffset; t += 60) {
                        for (let i = 0; i < takenTimes.length; i++) {
                            if (t >= takenTimes[i][0] && t <= takenTimes[i][1]) { //start time overlap
                                break
                            }
                            else if ((t + eventLength) >= takenTimes[i][0] && (t + eventLength) <= takenTimes[i][1]) { //endtime overlap
                                break
                            }
                            else if (((t >= takenTimes[i][0]) && (t + eventLength) <= takenTimes[i][1])) { //checks if new event would be scheduled inside of the takenTimes event
                                break
                            }
                            else if (((t <= takenTimes[i][0]) && (t + eventLength) >= takenTimes[i][1])) { //checks if event is encompassing takenTimes event, EX: takenTimes is from 4pm-5pm and candidate is 3pm-6pm
                                break
                            }
                            else { //no overlap
                                let e = {
                                    changes: { //schedules event
                                        start: DBUtil.toDBDate(new Date(t)),
                                        end: DBUtil.toDBDate(new Date(t + eventLength))

                                    },
                                    schedule: {
                                        id: ev.id
                                    }
                                }
                                DBUtil.sendNotification("Event Rescheduled", ev.title + " has been rescheduled for " + new Date(normalizeDate(ev.start)), function () { //pushes notification that event was scheduled
                                    window.open(DBUtil.getUseURL() + "/#?/navigation")

                                })
                                this.commit("updateEvent", e)
                                return
                            }
                        }
                    }
                    dayTries++
                    timeTries = 0
                }


                let candidateDate = calcRealDate(bestDay, bestTime) //start time of event at best day and time for event
                candidateDate = candidateDate.getTime()

                for (let i = 0; i < takenTimes.length; i++) {
                    if (candidateDate >= takenTimes[i][0] && candidateDate <= takenTimes[i][1]) { //start time overlap
                        timeTries++
                        break
                    }
                    else if ((candidateDate + eventLength) >= takenTimes[i][0] && (candidateDate + eventLength) <= takenTimes[i][1]) { //endtime overlap
                        timeTries++
                        break
                    }
                    else if (((candidateDate >= takenTimes[i][0]) && (candidateDate + eventLength) <= takenTimes[i][1])) { //checks if new event would be scheduled inside of the takenTimes event
                        timeTries++
                        break
                    }
                    else if (((candidateDate <= takenTimes[i][0]) && (candidateDate + eventLength) >= takenTimes[i][1])) { //checks if event is encompassing takenTimes event, EX: takenTimes is from 4pm-5pm and candidate is 3pm-6pm
                        timeTries++
                        break
                    }
                    else { //no overlap
                        let e = { //schedules event
                            changes: {
                                start: DBUtil.toDBDate(new Date(candidateDate)),
                                end: DBUtil.toDBDate(new Date(candidateDate + eventLength))

                            },
                            schedule: {
                                id: ev.id
                            }
                        }
                        DBUtil.sendNotification("Event Rescheduled", ev.title + " has been rescheduled for " + new Date(normalizeDate(ev.start)), function () { //pushes notification that event was scheduled
                            window.open(DBUtil.getUseURL() + "/#?/navigation")

                        })
                        this.commit("updateEvent", e)
                        return
                    }
                }
            }

        },

        async auth(store, ep) {

            const res = await DBUtil.execDB("auth", ep);

            if (res.hasOwnProperty("error")) {
                console.log("invalid login")
                store.state.loginFailure = true
            } else {

                store.state.loginFailure = false
                store.commit("auth", res)
                store.dispatch("getEvents")
                router.push("/navigation")
                router.go(0)

            }


        },


        async getEvents(store) {    
            const res = await DBUtil.execDB("getEvents");
            if (res.hasOwnProperty("error")) {
                console.log("Error: failed to get events")

            } else {

                //convert events from db to local
                for (let i = 0; i < res.length; i++) {
                    res[i] = DBUtil.fromDBEvent(res[i])
                }


                store.commit("setEvents", res)


            }

        },

        //DO NOT USE THIS TO ADD AN EVENT use addEvent instead
        async postEvent(store, e) {

            if (e.cid == null) {
                e.cid = 0
            }
            if (e.timesChanged == null) {
                e.timesChanged = 0
            }

            let payload = {
                id: e.id,
                calendarid: e.calendarId ? e.calendarId : 0,
                title: e.title,
                body: e.body,
                LID: 0,
                CID: e.cid,
                completed: e.completed ? 1 : 0,
                state: e.state,
                start: e.start,
                end: e.end,
                lastupdated: e.lastupdated, 
                created: e.created,
                timesChanged: e.timesChanged


            }
            payload.start = DBUtil.toDBDate(new Date(normalizeDate(e.start)))
            payload.end = DBUtil.toDBDate(new Date(normalizeDate(e.end)))
            payload.lastupdated = DBUtil.toDBDate(new Date(normalizeDate(e.lastupdated)))
            payload.created = DBUtil.toDBDate(new Date(normalizeDate(payload.created)))
         
           
           
            try {
                const response = await DBUtil.execDB("postEvent", payload);
                
                if (response.data.hasOwnProperty("error")) {

                    console.log("Failed to post event")
                }
            } catch (error) {
                console.error(error);
            }
        },

        async deleteEvent(store, event) {

            const res = await DBUtil.execDB("deleteEvent", {"TID": event.id })
            if (res.hasOwnProperty("error")) {

                console.log("Failed to delete event")
            } else {
                console.log(res)



            }
        },



        async updateEvent(store, event) {
            const res = await DBUtil.execDB("deleteEvent", { "TID": event.id })
            
            if (res.hasOwnProperty("error")) {

                console.log("Failed to delete event")
            } else {
                console.log(res)



            }
            store.dispatch("postEvent", event)
        },

        async updateLastEventID(store, id) {

            const res = await DBUtil.execDB("updateLastEventID", { "nextTID": id })

            if (res.hasOwnProperty("error")) {

                console.log("Failed to update event")
            } else {
                console.log(res)



            }
        },

        async register(store, data) {
            const res = await DBUtil.execDB("register", data);

            if (res.hasOwnProperty("error")) {
                console.log("Error: failed to register")
                store.state.registerFailure = true

            } else {

                store.dispatch("auth", {"uname": data["username"], "pword": data["password"]})


            }
        },

        async updateUserPassword(store, data) {
          const res = await DBUtil.execDB("updateUserPassword", data);

          if (res.hasOwnProperty("error"))
          {
              console.log("Failed to update password")
          }

        },

        async updateEmail(store, data) {
          const res = await DBUtil.execDB("updateEmail", data);

          if (res.hasOwnProperty("error"))
          {
              console.log("Failed to update email")
          }
        },

        async uploadProfileLink(store, data) {
          const res = await DBUtil.execDB("uploadProfileLink", data);

          console.log(res.data);
        },

        async logout(store) {
            await DBUtil.execDB("logout");
        },

        async getNextTID(store) {

            const res = await DBUtil.execDB("getNextTID")

            store.commit("auth", res)
        },

        async getNotifications(store) {

            const res = await DBUtil.execDB("getNotifications");
           
            if (res.hasOwnProperty("error")) {
                console.log("Error: failed to get notifications")

            } else {

                //convert events from db to local
                for (let i = 0; i < res.length; i++) {
                    res[i] = {
                        "eventID": res[i]["TID"],
                        "lastDate" : res[i]["LastDate"]
                    }
                }


                store.commit("setNotifications", res)
            }
        },

        async getUserName(store) {
          const res = await DBUtil.execDB("getUserName");
          store.commit("updateUserName", res.Name);
        },

        async getUserProfileLink(store) {
          const res = await DBUtil.execDB("getUserProfileLink");
          if(res.imagelink)
          {
            store.commit("updateUserProfileLink", res.imagelink);
          }
          else
          {
            store.commit("updateUserProfileLink", "");
          }
        },

        async postNotification(store, notif) {
            const res = await DBUtil.execDB("addNotification", notif)
           
            if (res.hasOwnProperty("error")) {

                console.log("Failed to update notification")
            } else {
                console.log(res)
            }
        },

        async deleteNotification(store, notif) {
            const res = await DBUtil.execDB("deleteNotification", notif)
            if (res.hasOwnProperty("error")) {

                console.log("Failed to delete notification")
            } else {
                console.log(res)



            }
        },
        async getTodo(store) {
            const res = await DBUtil.execDB("getTodo");
            if (res.hasOwnProperty("error")) {
                console.log("Error: failed to get events")

            } else {
                for (let i = 0; i < res.length; i++) {
                    res[i] = DBUtil.fromDBEvent(res[i])
                }
            }

        },
        async postTodo(store, todoList) {
            const res = await DBUtil.execDB("addToDo", todoList)
            
            if (res.hasOwnProperty("error")) {

                console.log("Failed to update todo")
            } else {
                console.log(res)
            }
        },

        async deleteTodo(store, id) {

            const res = await DBUtil.execDB("deleteToDo", id)
            if (res.hasOwnProperty("error")) {

                console.log("Failed to delete todo")
            } else {
                console.log(res)
            }
        },
    }
})
