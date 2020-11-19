import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        count: 0,
        events: [{
            id: '1',
            calendarId: '1',
            title: 'my schedule',
            category: 'time',
            dueDateClass: '',
            start: '2020-11-18T22:30:00+09:00',
            end: '2020-11-19T02:30:00+09:00'
        }],
        calView: "month",
        weekOptions: {},
        monthOptions: {},
        theme: {},
        timezoneOptions: []
            

    },
    mutations:{
        //functions that modify state should go here, and are called with $store.commit("<name>", <arg1>, etc...)
        //syncronous
        addEvent(state, e) {
            state.events.push(e)
           
        }
    },
    actions: {
        //can be async, called with $store.dispatch("<name>", <arg1>, etc...)
    }
})