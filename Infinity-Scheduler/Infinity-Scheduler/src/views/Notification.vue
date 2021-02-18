<template>

  <div class="body">
    <div class="container">
      <div class="info">
        <div class="read">Read</div>
        <div class="unread">Unread</div>
      </div>
      <div class="message">Read Notifications</div>
      <div class="message">Unread Notifications</div>
    </div>
  </div>

</template>

<script>
export default {
    name: 'Notification',
    data(){
        return {
        }
    },
    methods: {

    },
    components: {

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
      background-color: #a1d5f0;
      color: #000000;
      height:700px;
      font-family: Verdana;
      border: 2px groove #329ea8;
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
