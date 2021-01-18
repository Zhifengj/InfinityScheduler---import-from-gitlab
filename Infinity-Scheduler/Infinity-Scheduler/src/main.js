import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js'
import store from './store/index.js'
import conn from './db.js'

conn()

Vue.config.productionTip = true;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
