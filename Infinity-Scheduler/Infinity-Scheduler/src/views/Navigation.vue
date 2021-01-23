<template>
  <div>
      <div class="header">
          <div class="title">
            Infinity Scheduler
          </div>
      </div>

      <Tabs>
        <Tab title="Home"><NavHome /></Tab>
        <Tab title="Calendar"><Calendar/></Tab>
        <Tab title="Notification">Hello From Notification</Tab>
        <Tab title="Setting">Hello From Setting</Tab>
        <Tab title="User">Hello From User</Tab>
      </Tabs>
  </div>

</template>

<script>

import Calendar from './Calendar'
import Tab from './Tab'
import Tabs from './Tabs'
import NavHome from './nav_home'

    export default {
        name: 'navigate',
        data() {
            return{

            }
        },
        methods: {
            //local methods go here

        },
        components: {
           Calendar,
           Tab,
           Tabs,
           NavHome
        }
    }
</script>


<style scoped>
  .header {
    background-color: #0670bf;
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
