import Vue from 'vue'
import Vuex from 'vuex'
import process from 'process'
import axios from 'axios'
import router from './../router'

import { Date as TZDate } from './../../node_modules/tui-calendar/src/js/common/timezone.js'
import { exec } from 'child_process'


process.version = 'v14.0.1'
//import mariadb from 'mariadb'


Vue.use(Vuex)
console.log("TZDate:", TZDate)


const SERVER_URL = "http://localhost:80"
const PROD_SERVER_URL = "http://infinityscheduler.com"




function getServerFuncURL(name, args = false) {
    if (args != false) {
        return `${SERVER_URL}/server/${name}.php?args=${encodeURIComponent(JSON.stringify(args))}`
    } else {
        return `${SERVER_URL}/server/${name}.php`
    }
     
}


function getEventIdxById(events, id) {
    for (let e in events) {
       
        if (events[e].id === id) {
            return e
        }
    }
    return null
}

//adds the 0 in front of 1 digit numbers
function datePad(s) {
    let ps = `${s}`
    if (ps.length == 1) {
        ps = `0${ps}`
    }
    return ps
}

function toDBDate(date) {
    
   
    return `${date.getUTCFullYear()}-${datePad(date.getUTCMonth()+1)}-${datePad(date.getUTCDate())} ${datePad(date.getUTCHours())}:${datePad(date.getUTCMinutes())}:${datePad(date.getUTCSeconds())}`
}

function fromDBDate(date) {
    let year = parseInt(date.substring(0, 4))
    let month = parseInt(date.substring(5,7))-1
    let day = parseInt(date.substring(8, 10))
    let hour = parseInt(date.substring(11, 13))
    let minute = parseInt(date.substring(14, 16))
    let d = new Date(Date.UTC(year, month, day, hour, minute))
   
    return d

}

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

//executes a database function and returns the result. Console.logs the error if there is one
async function execDB(func, args) {
    try {

        const response = await axios.get(getServerFuncURL(func, args));
      
        if (response.data.hasOwnProperty("redirect")){
            window.location.href = response.data["redirect"]
            
        }
        return response.data

    } catch (error) {
        console.error(error);
        return error
    }
}

//converts a dbevent to a local event
function fromDBEvent(event) {
    let keys = Object.keys(event);
    let n = keys.length;
    let nevent = {}
    while (n--) {

        nevent[keys[n].toLowerCase()] = event[keys[n]];
    }
    return nevent
}

function convertToTimezone(date) {
    let formatter = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles" })
    return formatter.format(date)
}


export default new Vuex.Store({
    state: {
        //-1 means that the next id is a new one
        availableEventIds: [-1],
        _nextEventId: 0,
        events: [],
        calView: "month",
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
        notifs: []
      



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
            e.completed = false
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

       

        updateEvent(state, e) {

            let ev = getEventIdxById(state.events, e.schedule.id)
           
            state.events[ev].start = e.changes.start
            state.events[ev].end = e.changes.end
            state.events[ev].lastupdated = new Date(Date.now())
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
               
                events[e].start = fromDBDate(events[e].start).getTime()
                events[e].end = fromDBDate(events[e].end).getTime()
                events[e].lastupdated = fromDBDate(events[e].lastupdated)
                events[e].created = fromDBDate(events[e].created)
                events[e].id = `${events[e].tid}`
                events[e].category = 'time'
  
            }
            
            state.events = events
        },
        setNotifications(state, notifs) {
            state.notifs = notifs
            console.log(state.notifs)
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
                    this.commit("reschedule", state.events[i])
                }
            }
        },

        reschedule(state, ev) {
            //TODO: INTEGRATE WITH AI
            let week = 1000 * 60 * 60 * 24 * 7
            let e = {
                changes: {
                    start: toDBDate(new Date(ev.start + week)),
                    end: toDBDate(new Date(ev.end + week))

                },
                schedule: {
                    id : ev.id
                }
            }
          
           

            this.commit("updateEvent", e)
        }
    },
    actions: {
        //can be async, called with $store.dispatch("<name>", args, options)

        async auth(store, ep) {
            const res = await execDB("auth", ep);
            
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
            const res = await execDB("getEvents");
            if (res.hasOwnProperty("error")) {
                console.log("Error: failed to get events")
                
            } else {
                
                //convert events from db to local
                for (let i = 0; i < res.length; i++) {
                    res[i] = fromDBEvent(res[i])
                }


                store.commit("setEvents", res)


            }
           
        },
  
        //DO NOT USE THIS TO ADD AN EVENT use addEvent instead
        async postEvent(store, e) {
            
            let payload = {
                id: e.id,
                calendarid: e.calendarId ? e.calendarId : 0,
                title: e.title,
                body: e.body,
                LID: 0,
                completed: e.completed ? 1 : 0,
                state: e.state,
                start: e.start,
                end: e.end,
                lastUpdated: e.lastupdated,
                created: e.created


            }
           
            if (typeof e.start !== "string") {
                payload.start = toDBDate(e.start.toDate())
            }
            if (typeof e.end !== "string") {
                payload.end = toDBDate(e.end.toDate())
            }
            if (typeof e.lastUpdated !== "string") {
                payload.lastupdated = toDBDate(e.lastupdated)
            }
            if (typeof e.created !== "string") {
                payload.created = toDBDate(e.created)
            }
           
            console.log(e)
            try {
                const response = await axios.get(getServerFuncURL("postEvent", payload));
                console.log(response)
                if (response.data.hasOwnProperty("error")) {

                    console.log("Failed to post event")
                } 
            } catch (error) {
                console.error(error);
            }
        },

        async deleteEvent(store, event) {
            
            const res = await execDB("deleteEvent", {"TID": event.id })
            if (res.hasOwnProperty("error")) {

                console.log("Failed to delete event")
            } else {
                console.log(res)
               


            }
        },



        async updateEvent(store, event) {
            const res = await execDB("deleteEvent", { "TID": event.id })
            console.log("del:", res)
            if (res.hasOwnProperty("error")) {

                console.log("Failed to delete event")
            } else {
                console.log(res)



            }
            store.dispatch("postEvent", event)
        },

        async updateLastEventID(store, id) {
            
            const res = await execDB("updateLastEventID", { "nextTID": id })
            
            if (res.hasOwnProperty("error")) {

                console.log("Failed to update event")
            } else {
                console.log(res)
                


            }
        },

        async register(store, data) {
            const res = await execDB("register", data);
            if (res.hasOwnProperty("error")) {
                console.log("Error: failed to get events")

            } else {

                store.dispatch("auth", {"uname": data["username"], "pword": data["password"]})


            }
        },
        async logout(store) {
            await execDB("logout");
        },

        async getNextTID(store) {
           
            const res = await execDB("getNextTID")
           
            store.commit("auth", res)
        },

        async getNotifications(store) {
            console.log("RUN!")
            const res = await execDB("getNotifications");
            console.log(res)
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

        async postNotification(store, notif) {
            const res = await execDB("addNotification", notif)
            console.log(res)
            if (res.hasOwnProperty("error")) {

                console.log("Failed to update notification")
            } else {
                console.log(res)



            }
        },

        async deleteNotification(store, notif) {
            const res = await execDB("deleteNotification", notif)
            if (res.hasOwnProperty("error")) {

                console.log("Failed to delete notification")
            } else {
                console.log(res)



            }
        }
    }
})
