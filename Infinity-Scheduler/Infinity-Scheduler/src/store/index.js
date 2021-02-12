import Vue from 'vue'
import Vuex from 'vuex'
import process from 'process'
import axios from 'axios'
import router from './../router'
import { Date as TZDate } from './../../node_modules/tui-calendar/src/js/common/timezone.js'

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
    console.log(date)
   
    return `${date.getUTCFullYear()}-${datePad(date.getUTCMonth() + 1)}-${datePad(date.getUTCDate()-1)} ${datePad(date.getUTCHours())}:${datePad(date.getUTCMinutes())}:${datePad(date.getUTCSeconds())}`
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


export default new Vuex.Store({
    state: {
        nextEventId: 0,
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
        timezoneOptions: [],
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
           console.log(e)
            e.calendarId = '0'
            e.id = `${state.nextEventId}`
            //might have to change this later
            e.category = 'time'
            e.lastUpdated = new TZDate(Date.now())
            e.created = new TZDate(Date.now())
            e.completed = false
            //update with actual state
            e.state = 0
            //update with actual body text
            e.body = ""
            

            state.events.push(e)
            state.nextEventId += 1
            this.dispatch("postEvent", e)
        },

       

        updateEvent(state, e) {

            let ev = getEventIdxById(state.events, e.schedule.id)
           
            state.events[ev].start = e.changes.start
            state.events[ev].end = e.changes.end
            state.events[ev].lastUpdated = new Date(Date.now())
            
        },
        deleteEvent(state, e) {
            state.events.splice(getEventIdxById(state.events, e.id), 1)
        },

        auth(state, UID) {
            console.log(`Authed! ${UID}`)
            state.UID = UID
        },

        setEvents(state, events) {
           
            for (let e = 0; e < events.length; e++) {
                //local event names need to be in lowercase
                events[e].start = new Date(events[e].Start).getTime()
                events[e].end = new Date(events[e].End).getTime()
                events[e].lastUpdated = new Date(events[e].LastUpdated).getTime()
                events[e].created = new Date(events[e].Created).getTime()
                events[e].id = `${events[e].TID}`
                events[e].category = 'time'
                events[e].title = events[e].Title
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
                store.commit("auth", res.UID)
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
                store.commit("setEvents", res)


            }
           
        },
  
        //DO NOT USE THIS TO ADD AN EVENT use addEvent instead
        async postEvent(store, e) {
            
            let payload = {
                id: e.id,
                calendarid: e.calendarId,
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
                payload.lastupdated = toDBDate(e.lastUpdated.toDate())
            }
            if (typeof e.created !== "string") {
                payload.created = toDBDate(e.created.toDate())
            }
           

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
                store.commit("deleteEvent", event)


            }
        }
    }
})
