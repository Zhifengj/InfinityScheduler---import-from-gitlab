<template>

  <div class="body">
    <div class="container">
      <div class="info">
        <div class="read">All</div>
        <div class="unread">Unread</div>
      </div>
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
      display:inline-block;
      float:left;
      background-color: #a1d5f0;
      color: #000000;
      width:1700px;
      height:700px;
      font-family: Verdana;
  }

</style>
