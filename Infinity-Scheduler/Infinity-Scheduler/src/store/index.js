import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        nextEventId: 2,
        events: [{
            id: '1',
            calendarId: '0',
            title: 'my schedule',
            category: 'time',
            dueDateClass: '',
            start: '2020-11-18T22:30:00+09:00',
            end: '2020-11-19T02:30:00+09:00'
        }],
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
        timezoneOptions: []
            

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
           
        }
    },
    actions: {
        //can be async, called with $store.dispatch("<name>", <arg1>, etc...)
    }
})