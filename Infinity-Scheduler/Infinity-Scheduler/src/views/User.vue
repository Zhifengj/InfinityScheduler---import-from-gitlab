<template>
  <div class="body">

      <div class="pro">
        <img id = "profile" src="user_temp.png" alt="icon" />
        <br>
        <button class = "change_profile_button">Change Profile</button>
        <br>
        <button class = "out" v-on:click="logout()">Logout</button>
      </div>
      <div class = "vertical_line"></div>
        <div class = "name_container">Tom</div>
        <form class = "func">
          <div>Change Password</div>
          <br>
          <div>Switch Account</div>
        </form>

  </div>

</template>

<script>

export default {
    name: 'User',
    data(){
        return {
        }
    },
    methods: {
      //local methods go here
      logout() {
          this.$store.dispatch("logout");
      }
    },
    components: {

    }

}

</script>

<style scoped>
  .body{
      width:100%;
      display:inline-block;
      float:auto;
      background-color: #a1d5f0;
      color: #000000;
      width:100%;
      height:700px;
      font-family: Verdana;
      padding: 30px;
  }



  .pro {
    display: inline-block;
    float: left;
  }

  .vertical_line{
    display: inline;
    float: left;
    border-left: 3px solid #bdbfbe;
    height: 500px;
    margin-left: 50px;
    margin-top: 100px;
  }

  #profile {
    width: 120px;
    height: 120px;
    margin-left: 200px;
    margin-top: 100px;
  }

  .change_profile_button{
    width: 120px;
    margin-left: 200px;
    border: 2px groove #329ea8;
    border-radius: 5px;
    font-size: 15px;
    font-family: vidaloka;
  }

  .change_profile_button:hover{
      background-color: #ffffff;
      color: black;
      transition: 0.5s ease-in-out;
  }

  .name_container{
    margin-left: 450px;
    margin-top: 100px;
    font-size: 35px;
    font-family: Noto Serif;
    margin-bottom: 20px;
    width: 400px;
  }

  .func {
    margin-left: 450px;
    margin-top: 30px;
    font-size: 20px;
    font-family: Noto Serif;
    margin-bottom: 20px;
  }

  .out {
    width: 120px;
    margin-left: 200px;
    margin-top: 330px;
    border: 2px groove #329ea8;
    border-radius: 5px;
    font-size: 15px;
    font-family: vidaloka;
  }




</style>
