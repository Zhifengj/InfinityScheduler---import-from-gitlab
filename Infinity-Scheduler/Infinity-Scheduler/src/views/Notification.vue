<template>

  <div class="body">
    <div class="container">

        <div class="info">
            <template v-for="event in events" >
                <div class="notif"  v-bind:key="event.id">
                   
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
            notifs: this.$store.state.notifs
        }
    },
    methods: {
        deletes: function(eid) {
            console.log(eid)
            this.$store.commit("deleteNotification", eid)
        }
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
      display:inline-block;
      float:left;
      background-color: #a1d5f0;
      color: #000000;
      width:1700px;
      height:700px;
      font-family: Verdana;
  }

  .notif {
      background-color:aqua;

  }

</style>
