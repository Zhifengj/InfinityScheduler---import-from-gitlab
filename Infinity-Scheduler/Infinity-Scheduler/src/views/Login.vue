<template>
  <div id="login" :style="{'background-image':'url(login_background.jpg)'}">
    <div class="login-header">Infinity Scheduler</div>
`    <div >
      <div class="login-container">
         
          <form>
            
              <p>Username</p>

              <input type="text" id="uname" v-model="uname">
              <p>Password</p>
              <input type="password" id="pword" v-model="pword">
              <p></p>
              <button class="login-botton" v-on:click="tryLogin">Log In</button>
              <div class="regis">
                  <router-link to="/register">Register</router-link>
              </div>
          </form>
      </div>

    </div>`
  </div>
</template>

<script>
    export default {
        name: 'login',
        data(){
            return {
                //attributes for the vue go here (local)
                uname: "",
                pword: "",
                loginFailure: this.$store.state.loginFailure
            }
        },
        methods: {
            //local methods go here
            tryLogin() {
               
                this.$store.dispatch("auth", {
                    "uname": this.uname,
                    "pword": this.pword
                })
            }
        }
    }
</script>

<style scoped>

    #login {
        height: 950px;
    }

    .login-header {
        background-color: #0670bf;
        border: 2px solid black;
        border-radius: 5px;
        padding: 10px;
        text-align: center;
        font-family: Verdana;
        font-size: 30px;
        color: #ffffff;
        text-shadow: 5px 5px 5px #333;
        font-style: italic;
        border-radius: 5px;
    }

    .login-container {
        display: flex;
        border: 2px solid black;
        width:20%;
        height:40%;
        margin-left: 300px;
        margin-right: 500px;
        margin-top: 300px;
        justify-content: center;
        background-color: #0670bf;
        color: #ffffff;
        opacity: 0.9;
        padding-top: 15px;
        padding-bottom: 30px;
        border-radius: 8px;
    }

    form {
        background-color: #0670bf;
    }

    p {
        background-color: #0670bf;
        margin-bottom:10px;

    }

    input {
        border: 2px solid black;

    }

    .login-botton {
        background-color: #042269;
        color: white;
        width: 50%;
        height: 15%;
        border: 2px solid black;
        transition: 0.5s ease-in-out;
        border-radius: 5px;
        margin-top:10px;
    }

    .login-button:hover{
        background-color: #ffffff;
        color: black;
        transition: 0.5s ease-in-out;
    }

    .regis {
        display:inline-block;
        margin-left: 25px;
    }

    .bg {

    }


</style>
