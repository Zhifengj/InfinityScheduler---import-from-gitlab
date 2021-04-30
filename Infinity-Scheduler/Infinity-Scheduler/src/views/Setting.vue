<template>
  <div class="body">
      <div class="setting">
        <h2> Setting </h2>
        <form >
          <label>Language: </label>
          <select>
            <option value="Chinese">Chinese</option>
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Japanese">Japanese</option>
            <option value="Korean">Korean</option>
            <option value="Russian">Russian</option>
            <option value="Spanish">Spanish</option>
            <option value="Italian">Italian</option>
          </select>
          <br><br>
          <label>Time OffSet: </label>
          <select @change="onChangeOffSet($event)">
            <option value="0">00:00</option>
            <option value="-1">-01:00</option>
            <option value="-2">-02:00</option>
            <option value="-3">-03:00</option>
            <option value="-4">-04:00</option>
            <option value="-5">-05:00</option>
            <option value="-6">-06:00</option>
            <option value="-7">-07:00</option>
            <option value="-8">-08:00</option>
            <option value="-9">-09:00</option>
            <option value="-10">-10:00</option>
            <option value="-11">-11:00</option>
            <option value="-12">-12:00</option>
            <option value="-13">-13:00</option>
            <option value="-14">-14:00</option>
            <option value="-15">-15:00</option>
            <option value="-16">-16:00</option>
            <option value="-17">-17:00</option>
            <option value="-18">-18:00</option>
            <option value="-19">-19:00</option>
            <option value="-20">-20:00</option>
            <option value="-21">-21:00</option>
            <option value="-22">-22:00</option>
            <option value="-23">-23:00</option>
            <option value="23">+23:00</option>
            <option value="22">+22:00</option>
            <option value="21">+21:00</option>
            <option value="20">+20:00</option>
            <option value="19">+19:00</option>
            <option value="18">+18:00</option>
            <option value="17">+17:00</option>
            <option value="16">+16:00</option>
            <option value="15">+15:00</option>
            <option value="14">+14:00</option>
            <option value="13">+13:00</option>
            <option value="12">+12:00</option>
            <option value="11">+11:00</option>
            <option value="10">+10:00</option>
            <option value="9">+09:00</option>
            <option value="8">+08:00</option>
            <option value="7">+07:00</option>
            <option value="6">+06:00</option>
            <option value="5">+05:00</option>
            <option value="4">+04:00</option>
            <option value="3">+03:00</option>
            <option value="2">+02:00</option>
            <option value="1">+01:00</option>
          </select>
          <br><br>
          <label>Background Color: </label>
          <select>
            <option value="#F0F8FF">AliceBlue</option>
            <option value="#00FFFF">Aqua</option>
            <option value="#DEB887">BurlyWood</option>
            <option value="#5F9EA0">CadatBlue</option>
            <option value="#00BFFF">DeepSkyBlue</option>
            <option value="#D3D3D3">LightGray</option>
          </select>
          <br><br>
        </form>
      </div>

      <div class="text">
          Reminder for Today
          <br>
          <br>
          Reminder for Tomorrow
          <br>
          <br>
          Friend Search Allowed
      </div>

      <div class="toggles">
          <Toggle id="first" />
          <br>
          <br>
          <Toggle id="second" />
          <br>
          <br>
          <Toggle id="third" />
      </div>


  </div>

</template>

<script>

import Toggle from './Toggle.vue'

export default {
    name: 'Setting',
    data(){
        return {
          currentState: false
        }
    },
    methods: {
      onChangeOffSet(event) {
        this.$store.commit("setTimeOffSet", event.target.value)
      }
    },
    components: {
      Toggle
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

  .setting {
    margin-left: 30%;
    font-size: 22px;
    padding-left: 50px;
    font-family: vidaloka;
    margin-top: 100px;
  }

  .text {
    display: inline-block;
    float: left;
    padding-left: 50px;
    margin-left: 30%;
    font-family:  vidaloka;
    font-size: 22px;
  }

  .toggles {
    display: inline-block;
    float: left;
    margin-left: 10%;
    font-family:  vidaloka;
    font-size: 22px;
  }
</style>
