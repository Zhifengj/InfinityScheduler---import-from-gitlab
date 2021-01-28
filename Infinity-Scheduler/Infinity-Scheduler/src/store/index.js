import Vue from 'vue'
import Vuex from 'vuex'
import process from 'process'
import axios from 'axios'
import router from './../router'
process.version = 'v14.0.1'
//import mariadb from 'mariadb'


Vue.use(Vuex)


const SERVER_URL = "http://localhost:80"


function getServerFuncURL(name, args = {}) {
    
    return `${SERVER_URL}/server/${name}.php?args=${encodeURIComponent(JSON.stringify(args))}`
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

            e.calendarId = '0'
            e.id = `${state.nextEventId}`
            //might have to change this later
            e.category = 'time'
            state.events.push(e)
            state.nextEventId += 1

        },

        updateEvent(state, e) {

            state.events[state.events.indexOf(e)].start = e.changes.start
            state.events[state.events.indexOf(e)].end = e.changes.end

        },
        deleteEvent(state, e) {
            state.events.splice(state.events.indexOf(e), 1)
        }
    },
    actions: {
        //can be async, called with $store.dispatch("<name>", args, options)

        async auth(state, ep) {
            
            try {
                const response = await axios.get(getServerFuncURL("auth", ep));
                
                if (response.data.hasOwnProperty("error")) {
                   
                    state.loginFailure = true
                } else {
                    
                    state.loginFailure = false
                    state.UID = response.data[0]
                    router.push("/calendar")
                    router.go(0)
                }
               
            } catch (error) {
                console.error(error);
            }
           
        },

        async getTasks(state) {
            try {
                const response = await axios.get(getServerFuncURL("getEvents", { "UID": state.UID }));

                if (response.data.hasOwnProperty("error")) {

                    console.log("Failed to retreive tasks")
                } else {
                    events = response.data
                    
                }

            } catch (error) {
                console.error(error);
            }
        }
    }
})
