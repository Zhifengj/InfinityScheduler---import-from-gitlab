<template>
  <div>
      <div class="header">
          <div class="title">
              Infinity Scheduler
          </div>
          <button v-on:click="logout()">Logout</button>
      </div>

      <Tabs>
        <Tab title="home-solid.svg"><NavHome /></Tab>
        <Tab title="calendar-alt-regular.svg"><Calendar/></Tab>
        <Tab title="bell-solid.svg"><Notification></Tab>
        <Tab title="cogs-solid.svg"><Setting /></Tab>
        <Tab title="user-circle-regular.svg"></Tab>
      </Tabs>
  </div>

</template>

<script>

import Calendar from './Calendar'
import Tab from './Tab'
import Tabs from './Tabs'
import NavHome from './nav_home'
    import Setting from './Setting'
    import Notification from './Notification'

    export default {
        name: 'navigate',
        data() {
            return{
                checkEventMissedInterval: () => { }
            }
        },
        methods: {
            //local methods go here
            logout() {
                this.$store.dispatch("logout");
            }
        },
        components: {
           Calendar,
           Tab,
           Tabs,
           NavHome,
            Setting,
            Notification
        },
        mounted() {
            this.$store.dispatch("getNotifications")
            this.$store.dispatch("getNextTID");
            this.$store.dispatch("getEvents");
            
            this.checkEventMissedInterval = setInterval(() => {
                this.$store.commit("checkMissedEvent")
            }, 3000);
        }
        
    }
</script>


<style scoped>
  .header {
    background-color: #0670bf;
    border: 2px solid black;
    border-radius: 5px;
    border-bottom: none;
  }

  .title {
      display:inline-block;
      padding: 15px;
      text-align: borderLeft;
      font-family: Verdana;
      font-size: 25px;
      color: black;
      font-style: italic;
      margin-left:10px;
  }
</style>
