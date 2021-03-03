<template>
  <div class = "all">
      <div class="header">
          <div class="title">
              Infinity Scheduler (Alpha)
          </div>
      </div>

      <Tabs>
        <Tab title="home-solid.svg"><NavHome/></Tab>
        <Tab title="calendar-alt-regular.svg"><Calendar/></Tab>
        <Tab title="bell-solid.svg"><Notification/></Tab>
        <Tab title="cogs-solid.svg"><Setting/></Tab>
        <Tab title="user-circle-regular.svg"><User/></Tab>
      </Tabs>
  </div>

</template>

<script>

import Calendar from './Calendar'
import Tab from './Tab'
import Tabs from './Tabs'
import NavHome from './nav_home'
import Setting from './Setting'
import User from './User'
import Notification from './Notification'

    export default {
        name: 'navigate',
        data() {
            return{
                checkEventMissedInterval: () => { }
            }
        },
        methods: {

        },
        components: {
           Calendar,
           Tab,
           Tabs,
           NavHome,
           Setting,
           User,
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

  .all {
    transform:scale();
  }

  .header {
    background-color: #0670bf;
    border: 2px solid black;
    border-radius: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .title {
      display:inline-block;
      text-align: borderLeft;
      font-size: 35px;
      color: black;
      margin-left:10px;
      font-family: Acme;
  }
</style>
