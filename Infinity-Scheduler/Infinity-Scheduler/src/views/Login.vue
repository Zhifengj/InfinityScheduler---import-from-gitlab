<template>
  <div id="login">
    <div class="inf-header">Infinity Scheduler</div>
    <div class="login-container">
        <form>
            <p>Username</p>
            <input type="text" id="uname" v-model="uname">
            <p>Password</p>
            <input type="password" id="pword" v-model="pword">
            <p></p>
            <button v-on:click="tryLogin">Log In</button>
        </form>
      
    </div>   
  </div>
</template>

<script>
   

    export default {
        name: 'login',
        data(){
            return {
                //attributes for the vue go here (local)
                uname: "",
                pword: ""
            }
        },
        methods: {
            //local methods go here
            tryLogin() {
                alert(`dologin for ${this.uname}, ${this.pword}`)
               
                
            }
            
        }
        
        
    }
</script>

<style>
  
    #login {
      
    }

    .inf-header {
        border: 2px solid black;
        padding: 10px;
        margin-bottom: 50px;
        text-align: center;
        font-family: Verdana;
        font-size: large;
        background-color: #0670bf;
        color: #ffffff;
        text-shadow: 5px 5px 5px #333;
        font-style: italic;
    }

    .login-container {
        display: flex;
        border: 2px solid black;
        height: 200px;
        width: 20%;
        margin-left: auto;
        margin-right: auto;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: #0670bf;
        color: #ffffff;
    }

    form {
        background-color: #0670bf;
    }

    p {
        background-color: #0670bf;
       
    }

    input {
        border: 2px solid black;
       
    }

    button {
        background-color: #042269;
        color: white;
        width: 100%;
        border: 3px solid black;
        transition: 0.5s ease-in-out;
    }

    button:hover{
        background-color: #ffffff;
        color: black;
        transition: 0.5s ease-in-out;
    }

</style>
