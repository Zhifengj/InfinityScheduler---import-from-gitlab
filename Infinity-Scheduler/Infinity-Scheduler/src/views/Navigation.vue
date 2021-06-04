<template>
    <div class="all">
        <div class="header">
            <div class="title">
                Infinity Scheduler (Beta 1)
            </div>
        </div>
        <transition name="modal">
            <div v-if="nextEvent" id="popup">
                <div class="overlay">
                    <div class="modal">
                        <h4>Will you attend {{nextEvent.Title}} at {{nextEvent.Start}}?</h4>

                        <button v-on:click="attend(true)">Yes</button>
                        <button v-on:click="attend(false)">No</button>

                    </div>
                    
                </div>
            </div>
        </transition>
        <Tabs>
            <Tab title="home-solid.svg"><NavHome /></Tab>
            <Tab title="calendar-alt-regular.svg"><Calendar /></Tab>
            <Tab title="bell-solid.svg"><Notification /></Tab>
            <Tab title="cogs-solid.svg"><Setting /></Tab>
            <Tab title="user-circle-regular.svg"><User /></Tab>
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
import DBUtil from '../DBUtil'

    export default {
        name: 'navigate',
        data() {
            return{
                checkEventMissedInterval: () => { },
                nextEvent: DBUtil.savedEvent,
                toggle: false
            }
        },
        methods: {
            attend: function (attend) {
               
                if (attend) {
                    DBUtil.savedEvent.completed = true
                } else {
                    this.$store.dispatch("reschedule", DBUtil.savedEvent);
                }
                DBUtil.savedEvent = null
            }
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
            this.$store.dispatch("getUserName");
            this.$store.dispatch("getUserProfileLink");
            this.checkEventMissedInterval = setInterval(() => {
                this.$store.commit("checkMissedEvent"),
                this.$store.dispatch("getUserProfileLink");
            }, 3000);
        },
        destroyed() {
            clearInterval(this.checkEventMissedInterval);
        }

    }
</script>


<style scoped>

  .all {
    transform:scale();
  }

  .header {
    background-color: #343148FF;
    border: 2px solid black;
    border-radius: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .title {
      display:inline-block;
      text-align: borderLeft;
      font-size: 38px;
      color: #F2EDD7FF;
      margin-left:10px;
      font-family: 'Pacifico', cursive;
  }

    .modal {
        width: 500px;
        margin: 0px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px 3px;
        transition: all 0.2s ease-in;
        font-family: Helvetica, Arial, sans-serif;
    }

    .fadeIn-enter {
        opacity: 0;
    }

    .fadeIn-leave-active {
        opacity: 0;
        transition: all 0.2s step-end;
    }

        .fadeIn-enter .modal,
        .fadeIn-leave-active.modal {
            transform: scale(1.1);
        }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #00000094;
        z-index: 999;
        transition: opacity 0.2s ease;
    }
</style>
