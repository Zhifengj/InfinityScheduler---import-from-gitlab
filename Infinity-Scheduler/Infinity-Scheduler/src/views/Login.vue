<template>
  <div id="login" :style="{'background-image':'url(login_bg.jpg)'}">
     <div class="login-header">Infinity Scheduler (Beta)</div>
`    <div >
         <div class="login-container">
             

             <form class="login_windows">
                 <p class="username_text">Username:</p>
                 <input type="text" id="uname" v-model="uname">
                 <br><br><br>
                 <p class="password_text">Password:</p>
                 <input type="password" id="pword" v-model="pword">
                 <br><br><br>
                 <button class="login-botton" v-on:click="tryLogin">Log In</button>
                 <div class="regis">
                     <router-link to="/register" tag="button">Register</router-link>
                 </div>
                 <div v-if="this.$store.state.loginFailure">Invalid username or password</div>

             </form>
             
         </div>

    </div>
  </div>
</template>

<script>
import router from "../router";

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
            },

        },
        mounted() {
            this.$store.dispatch("auth");


        }
    }
</script>

<style scoped>

    #login {
        height: 980px;
        width: 100%;
        background-size: 100% 980px;
        background-repeat: no-repeat;
    }

    .login-header {
        background-color: #343148FF;
        border: 2px solid black;
        border-radius: 5px;
        padding: 10px;
        text-align: center;
        font-size: 38px;
        color: #ffffff;
        text-shadow: 5px 5px 5px #333;
        font-family: 'Pacifico', cursive;
        border-radius: 5px;
    }



    .login_windows {
        border: 2px solid black;
        width:25%;
        height:50%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 300px;
        justify-content: center;
        align-items: center;
        background-color: #D7C49EFF;
        color: black;
        opacity: 0.65;
        padding-bottom: 30px;
        border-radius: 10px;
        padding: 20px;
        padding-bottom: 30px;
    }


    form {
        background-color: #D7C49EFF;
    }

    p {
        background-color: #D7C49EFF;
        margin-bottom:10px;
    }

    input {
        border: 2px solid black;
    }

    .login-botton {
        background-color: #A07855FF;
        color: white;
        width: 37%;
        height: 15%;
        border: 2px solid black;
        transition: 0.5s ease-in-out;
        border-radius: 5px;
        margin-top:10px;
        margin-left: 100px;
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

    .username_text{
      margin-left: 100px;
    }

    .password_text{
      margin-left: 100px;
    }

    #uname{
      padding:5px;
      margin-left: 100px;
    }

    #pword{
      padding:5px;
      margin-left: 100px;
    }



</style>
