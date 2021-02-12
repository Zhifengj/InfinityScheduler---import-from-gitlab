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




function getServerFuncURL(name, args = {}) {
    
    return `${SERVER_URL}/server/${name}.php?args=${encodeURIComponent(JSON.stringify(args))}`
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
        console.log(response)
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
        _nextEventId: -1,
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
        UID: -1,
        loginFailure: false
      



    },
    mutations:{
        //functions that modify state should go here, and are called with $store.commit("<name>", <arg1>, etc...)
        //syncronous
       


        //adds an event e to the calendar
        addEvent(state, e) {
            let id = getNextEventID(state)
           console.log(e)
            e.calendarId = '0'
            e.id = `${id}`
            console.log(state)
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
            state.nextEventId += 1
            //update the database id if the id is new
            if (id == state._nextEventId) {
                this.dispatch("updateLastEventID", id)
            }
            
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
            console.log(`Authed! ${data.UID}`)
            state.UID = data.UID
            state._nextEventId = data.NextTID
           
        },

        setEvents(state, events) {
            console.log("before", events)
            for (let e = 0; e < events.length; e++) {
                //local event names need to be in lowercase
                console.log("comp: ", events[e].start, fromDBDate(events[e].start))
                events[e].start = fromDBDate(events[e].start).getTime()
                events[e].end = fromDBDate(events[e].end).getTime()
                events[e].lastupdated = fromDBDate(events[e].lastupdated)
                events[e].created = fromDBDate(events[e].created)
                events[e].id = `${events[e].tid}`
                events[e].category = 'time'
  
            }
            console.log(events)
            state.events = events
        }
    },
    actions: {
        //can be async, called with $store.dispatch("<name>", args, options)

        async auth(store, ep) {
            const res = await execDB("auth", ep);
            console.log(res)
            if (res.hasOwnProperty("error")) {

                store.state.loginFailure = true
            } else {

                store.state.loginFailure = false
                store.commit("auth", res)
                store.dispatch("getEvents")
                //router.push("/navigation")
                //router.go(0)

            }
           
           
        },

        async getEvents(store) {    
            const res = await execDB("getEvents", { "UID": store.state.UID })
            if (res.hasOwnProperty("error")) {

                console.log("Failed to retreive events")
            } else {
                console.log(res)
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
                UID: store.state.UID,
                LID: 0,
                completed: e.completed ? 1 : 0,
                state: e.state


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
            console.log("start", payload.start)

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
            
            const res = await execDB("deleteEvent", { "UID": store.state.UID, "TID": event.id })
            if (res.hasOwnProperty("error")) {

                console.log("Failed to delete event")
            } else {
                console.log(res)
               


            }
        },



        async updateEvent(store, event) {
            store.dispatch("deleteEvent", event)
            store.dispatch("postEvent", event)
        },

        async updateLastEventID(store, id) {
            const res = await execDB("updateLastEventID", { "nextTID": id, "UID": store.state.UID })
            if (res.hasOwnProperty("error")) {

                console.log("Failed to delete event")
            } else {
                console.log(res)
                


            }
        }
    }
})
