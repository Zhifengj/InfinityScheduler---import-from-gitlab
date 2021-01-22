<template>
  <div class="body">
    <div class="menu_container">
        <div>
          <button>Lists</button>
        </div>

        <div>
          <button>Tasks</button>
        </div>
    </div>

    <div class="main_container">
      <div class="notes">
        <div class="note">
          <div>Remainning time: </div>
          <div>To be added...</div>
        </div>

      <div class="note">
        <div>The next thing is: </div>
        <div>To be called from database</div>
     </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
    name: 'nav_home',
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
    display: block;
    margin-top: 200px;
    text-align: center;
    vertical-align: middle;
  }

  .note{
    margin-top: 100px;
    margin-bottom: 100px;
    font-size:25px;
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
