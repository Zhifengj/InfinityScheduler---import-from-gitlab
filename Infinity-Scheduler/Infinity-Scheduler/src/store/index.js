import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        count: 0
    },
    mutations:{
        //functions that modify state should go here, and are called with $store.commit("<name>")
        //syncronous
    },
    actions: {
        //can be async, called with $store.dispatch("<name>")
    }
})