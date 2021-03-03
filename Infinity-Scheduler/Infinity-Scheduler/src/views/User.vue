<template>
  <div class="body">
      <div class="change_pass" v-show='change_pas'>
        <div class="pass_container">
          <label> New Password: </label>
          <br>
          <br>
          <input type="text" placeholder="New Password..." />
          <br>
          <br>
          <label> Comfirm New Password: </label>
          <br>
          <br>
          <input type="text" placeholder="Comfirm New Password..." />
          <br>
          <br>
          <br>
          <br>
          <button @click='change_pas = false'> Submit </button>
          <button @click='change_pas = false' class="sec_but"> Cancel </button>
        </div>
      </div>

      <div class="change_pass" v-show='change_email'>
        <div class="pass_container">
          <label> Current Password: </label>
          <br>
          <br>
          <input type="text" placeholder="Current Password..." />
          <br>
          <br>
          <label> New Email Address: </label>
          <br>
          <br>
          <input type="text" placeholder="New Email Address..." />
          <br>
          <br>
          <br>
          <br>
          <button @click='change_email = false'> Submit </button>
          <button @click='change_email = false' class="sec_but"> Cancel </button>
        </div>
      </div>

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
          <button class = "change_pass_button" @click='change_pas = true'>Change Password</button>
          <br>
          <button class = "change_pass_button" @click='change_email = true'>Change Email Address</button>
        </form>
  </div>

</template>

<script>

export default {
    name: 'User',
    data(){
        return {
          change_pas: false,
          change_email: false
        }
    },
    methods: {
      //local methods go here
      logout() {
          this.$router.push({name: 'Login'});
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

 .change_pass_button {
   border: none;
   background-color: inherit;
   font-size: inherit;
   font-family: inherit;
   padding: 0;
   cursor: pointer;
   outline: none;
   margin-bottom: 10px;
 }

 .change_pass {
   position: absolute;
   left: 25%;
   top: 30%;
   min-height: 40%;
   min-width: 50%;
   background-color: white;
   border-radius: 10px;
   box-shadow: 5px 5px 5px rgb(50, 50, 50);
   padding-top: 20px;
 }

 .pass_container {
   padding-top: 50px;
   width: 50%;
   margin-left: 25%;
 }

 .change_pass input {
   width: 95%;
   border: 2px solid black;
   border-radius: 5px;
   margin-bottom: 20px;
 }

 .change_pass label {
   width: 100%;
 }

 .change_pass button {
   width: 160px;
   height: 40px;
   font-size: inherit;
   font-family: inherit;
   float: left;
 }

 .change_pass .sec_but {
   float: right;
 }

</style>
