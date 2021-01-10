<template>
    <div id="navigation">
      <div class="header">
          <div class="title">
            Infinity Scheduler
          </div>
          <div class="icon">
            <img src="./user-circle-regular.svg" width="35" height="35">
          </div>
          <div class="icon">
            <img src="./cogs-solid.svg" width="35" height="35">
          </div>
          <div class="icon">
            <img src="./bell-solid.svg" width="35" height="35">
          </div>
          <div class="icon">
            <img src="./calendar-alt-regular.svg" width="35" height="35">
          </div>
          <div class="icon">
            <a href="http://localhost:8080/?#/navigation">
              <img src="./home-solid.svg" width="35" height="35">
            </a>
          </div>
      </div>

        <div class="body">
          <div class="menu_container">
              <div>
                <button v-on:click="openList">Lists</button>
              </div>

              <div>
                <button v-on:click="openTask">Tasks</button>
              </div>
          </div>

          <div class="main_container">
            <div class="notes">
              <div class="note">
                <div>Remainning time: </div>
                <div class="counter">To be added...</div>
              </div>

              <div class="note">
                <div>The next thing is: </div>
                <div class="content">To be called from database</div>
            </div>
          </div>
        </div>

      </div>

    </div>
</template>

<script>
    export default {
        name: 'navigate',
        data() {
            return {
                //attributes for the vue go here (local)
            }
        },
        methods: {
            //local methods go here
            tryRegister() {
                alert(`${this.user_name} Register > m < !!!!!!!!!!!!`)
            }
        }
    }
</script>


<style scoped>
    #navigation {}

    .header {
      background-color: #0670bf;
    }

    .title {
        display:inline-block;
        padding: 15px;
        text-align: borderLeft;
        font-family: Verdana;
        font-size: 25px;
        color: black;
        font-style: italic;
        margin-left:10px;
    }

    .icon{
        display:inline-block;
        float:right;
        padding: 15px;
    }

    .icon:hover {
        background-color:white;
    }

    .body{
        width:100%;
        margin-top:40px;
    }

    .menu_container{
        display:inline-block;
        color: #000000;
        padding-bottom: 30px;
        padding-right: 30px;
        font-family: Verdana;
    }


    .main_container {
        display:inline-block;
        float:right;
        margin-right: 30px;
        background-color: #a1d5f0;
        color: #000000;
        width:1700px;
        height:700px;
        font-family: Verdana;
    }

    .notes{
      margin-top: 200px;
      text-align: center;
      vertical-align: middle;
    }

    .note{
      margin-top: 100px;
      margin-bottom: 100px;
      font-size:25px;
    }

    form {
        background-color: #a1d5f0;
    }

    p {
        background-color: #a1d5f0;
        margin-bottom: 0;
    }

    button {
        background-color: #a1d5f0;
        color: black;
        width:220px;
        height:50px;
        margin-bottom: 5px;
        margin-top: 5px;
        border: 2px solid black;
        transition: 0.5s ease-in-out;
        font-size: 20px;
        border-top-right-radius:50%;
        border-bottom-right-radius:50%;

    }

    button:hover {
        background-color: #ffffff;
        color: black;
        transition: 0.5s ease-in-out;
    }
</style>
