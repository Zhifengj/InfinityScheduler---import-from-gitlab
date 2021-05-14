<template>

    <div class="body">
       
      
        <div class="container">

            <div class="info">
                <template v-for="event in events">
                    <div class="notif" v-bind:key="event.id">

                        "{{event.title}}" was missed! Rescheduled for {{new Date(event.start)}}
                        <button v-bind:key="event.id" v-on:click="deletes(event.id)">ok</button>
                    </div>
                    <hr :key="event.id">
                </template>

            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Notification',
    data(){
        return {
            notifs: this.$store.state.notifs,
           
        }
    },
    methods: {
        deletes: function(eid) {
            console.log(eid)
            this.$store.commit("deleteNotification", eid)
        },
        
    },
    components: {

    },
    computed: {
        events: function () {
            let es = []

            for (let i in this.$store.state.notifs) {
                for (let e in this.$store.state.events) {
                    if (this.$store.state.notifs[i].eventID == this.$store.state.events[e].id) {
                        es.push(this.$store.state.events[e])
                    }
                }
            }
            return es
        }
    }



}
</script>

<style>
  .body{
      width:100%;
      margin-top:40px;
  }


  .container {
      margin-left: 10%;
      margin-right: 10%;
      width: auto;
      min-width: 80%;
      display:inline-block;
      float:left;
      background-color: #D7C49EFF;
      color: #000000;
      height:700px;
      font-family: Verdana;
      border: 2px groove #A07855FF;
      border-radius: 5px;
  }

  .read {
    margin: 5px;
    padding: 5px;
    margin-left: 22%;
    display: block;
    float: left;
    border: 2px groove #329ea8;
    border-bottom: none;
    border-radius: 5px;
  }

  .unread {
    margin: 5px;
    padding: 5px;
    display: block;
    float: left;
    margin-left: 44%;
    border: 2px groove #329ea8;
    border-bottom: none;
    border-radius: 5px;
  }

  .message {
    margin-left: 1%;
    width: 48%;
    height: 600px;
    display:inline-block;
    float:left;
    background-color: #a1d5f0;
    color: #000000;
    font-family: Verdana;
    border: 2px groove #329ea8;
    border-radius: 5px;
  }


   

</style>
