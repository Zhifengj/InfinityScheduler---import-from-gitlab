<template>
    <div id="registation">
        <div class="registate">Infinity Scheduler (Beta 1)</div>
        <div class="registation_container">
            
            
            <form>

                <p>Username</p>
                <input type="text" id="user_name" v-model="user_name" required>
                <p>First Name</p>
                <input type="text" id="first_name" v-model="first_name" required>
                <p>Last Name</p>
                <input type="text" id="last_name" v-model="last_name" required>
                <p>E-mail Address</p>
                <input type="text" id="email" v-model="email" required>
                <p>Password</p>
                <input type="text" id="pas_word" v-model="pas_word" required>
                <p>Confirm Password</p>
                <input type="text" id="conf_word" v-model="conf_word" required>
                <p></p>
                <button type="submit" class="reg-button" v-on:click="tryRegister">Register</button>
                <div class="gobacklogin">
                    <router-link to="/" >Back</router-link>
                </div>
                <div v-if="this.$store.state.registerFailure">Your username is already in use</div>
                <div v-if="failed">Passwords do not match</div>
            </form>

        </div>

    </div>
</template>

<script>



    export default {
        name: 'register',
        data() {
            return {
                //attributes for the vue go here (local)
                user_name: "",
                first_name: "",
                last_name: "",
                email: "",
                pas_word: "",
                conf_word: "",
                failed: false
            }
        },
        methods: {
            //local methods go here
            tryRegister() {
                if (this.user_name != "" && this.pas_word != "" && this.pas_word == this.conf_word) {
                    let data = {
                        "username": this.user_name,
                        "password": this.pas_word,
                        "name": `${this.first_name} ${this.last_name}`
                    }
                    this.$store.dispatch("register", data)
                } else {
                    this.failed = true
                }

            }

        }


    }
</script>

<style scoped>

    #registation {
    }

    .registate {
        border: 2px solid black;
        padding: 10px;
        margin-bottom: 50px;
        text-align: center;
        font-family: 'Pacifico', cursive;
        font-size: 36px;
        background-color: #343148FF;
        color: #F2EDD7FF;
        text-shadow: 5px 5px 5px #333;
        font-style: italic;
    }

    .registation_container {
        display: flex;
        border: 2px solid black;
        height: 50%;
        width: 50%;
        margin-top: 150px;
        margin-left: auto;
        margin-right: auto;
        justify-content: center;
        align-items: center;
        text-align: left;
        background-color: #D7C49EFF;
        color: #D7C49EFF;
        padding-bottom: 50px;
        padding-right: 30px;
        padding-top:30px;
    }

    form {
        background-color: #D7C49EFF;
    }

    p {
        background-color: #D7C49EFF;
        margin-bottom: 0;
        color:black;
    }

    input {
        border: 2px solid black;
        width: 120%;
    }

    .reg-button {
        background-color: #A07855FF;
        color: white;
        width: 131%;
        border: 3px solid black;
        transition: 0.5s ease-in-out;
        font-size: 15px;
        margin-top: 5px;
    }

    .reg-button:hover {
        background-color: #ffffff;
        color: black;
        transition: 0.5s ease-in-out;
        font-size: 15px;
    }

    .gobacklogin {
        background-color: #A07855FF;
        color: white;
        width: 131%;
        text-align: center;
        border: 3px solid black;
        transition: 0.5s ease-in-out;
        font-size: 15px;
        margin-top: 5px;
    }
</style>
