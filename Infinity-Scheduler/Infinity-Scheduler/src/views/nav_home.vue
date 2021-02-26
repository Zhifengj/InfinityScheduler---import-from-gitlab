<template>
    
    <div class="body">
        <div class="tab">
            <button class="tablinks" v-on:click="openTab($event, 'TodoList')">TodoList</button>
            <button class="tablinks" v-on:click="openTab($event, 'Events')" >Events</button>
            <button class="tablinks" v-on:click="openTab($event, 'Tasks')">Tasks</button>
        </div>

        <div id="TodoList" class="tabcontent">
            <div id="myDIV" class="header">
                <h2 style="margin:5px">My To Do List</h2>
                <input type="text" id="myInput" placeholder="Add some todos...">
                <span v-on:click="newElement" class="addBtn">Add</span>
            </div>

            <ul id="myUL">
               
            </ul>
        </div>

        <div id="Events" class="tabcontent">
            <div class="main_container">
                <div class="notes">
                    <div class="note">
                        <div>Countdown to upcoming event: </div>
                        <div class="time">
                            
                            <p id="timer"> until next event</p>
                        </div>

                    </div>
                    <div class="note">
                        <div>Upcoming Events: </div>
                        <div id="upcoming-events">
                            <table border='1' width='80%' style='border-collapse: collapse;'>
                                <tr>
                                    <th>Title</th>
                                    <th>Body</th>
                                    <th>Start</th>
                                    <th>End</th>
                                </tr>
                                <tr v-for="event in eventData">
                                    <th>{{event.Title}}</th>
                                    <th>{{event.Body}}</th>
                                    <th>{{event.Start}}</th>
                                    <th>{{event.End}}</th>
                                </tr>

                            </table>
                        </div>



                    </div>
                </div>
            </div>
        </div>

        <div id="Tasks" class="tabcontent">
            <h3>tasks</h3>
        </div>
    </div>

</template>

<script>
    
    import axios from 'axios'
    //document.getElementById("defaultTab").click();

    const SERVER_URL = "http://localhost:80"
    function getServerFuncURL(name, args = false) {
        if (args != false) {
            return `${SERVER_URL}/server/${name}.php?args=${encodeURIComponent(JSON.stringify(args))}`
        } else {
            return `${SERVER_URL}/server/${name}.php`
        }

    }
    
export default {
    name: 'nav_home',
    data(){
        return {
            eventData: null
        }
    },
    mounted() {
        
        axios
            .get(getServerFuncURL("getNextEvent"))
            .then(response => (this.eventData = response.data))
         
       //this.eventData = this.$store.dispatch("getUpcomingEvent");
    },
    methods: {
        openTab: function(evt, tabID) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tabID).style.display = "block";
            evt.currentTarget.className += " active";
        },
        newElement: function () {
         
            var li = document.createElement("li");
            var inputValue = document.getElementById("myInput").value;
            var t = document.createTextNode(inputValue);
            li.appendChild(t);
            if (inputValue === '') {
                alert("You must write something!");
            } else {
                document.getElementById("myUL").appendChild(li);
            }
            document.getElementById("myInput").value = "";

            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);
            var i;
            for (i = 0; i < close.length; i++) {
                close[i].onclick = function () {
                    var div = this.parentElement;
                    div.style.display = "none";
                }
            }

        },
    },
    components: {

    }
    }

    
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }

    var list = document.querySelector('ul');
    if (list) {
        list.addEventListener('click', function (ev) {
            if (ev.target.tagName === 'LI') {
                ev.target.classList.toggle('checked');
            }
        }, false);
    }
    

    //this will be time of next event
    
    var countDownDate = new Date("Feb 30, 2021 15:37:25").getTime();

    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="timer"
        document.getElementById("timer").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
    
    

</script>

<style>
    .tab {
        overflow: hidden;
        border: 1px solid #ccc;
        background-color: #66bef4;
    }
    .tab button {
      background-color: inherit;
      float: left;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 14px 16px;
      transition: 0.3s;
      font-size: 17px;
    }
    .tab button:hover {
      background-color: #ddd;
    }

    
    .tab button.active {
      background-color: #9cf466;
    }


    .tabcontent {
        display: none;
        padding: 6px 12px;
        border: 1px solid #ccc;
        border-top: none;
    }

    ul {
      margin: 0;
      padding: 0;
    }

    ul li {
      cursor: pointer;
      position: relative;
      padding: 12px 8px 12px 40px;
      list-style-type: none;
      background: #eee;
      font-size: 18px;
      transition: 0.2s;
  
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    ul li:nth-child(odd) {
      background: #f9f9f9;
    }

    ul li:hover {
      background: #ddd;
    }

    .close {
      position: absolute;
      right: 0;
      top: 0;
      padding: 12px 16px 12px 16px;
    }

    .close:hover {
      background-color: #f44336;
      color: white;
    }

    .header {
        background-color: #98AFC7;
        padding: 30px 40px;
        color: white;
        text-align: center;
    }

    .header:after {
      content: "";
      display: table;
      clear: both;
    }

    input {
      margin: 0;
      border: none;
      border-radius: 0;
      width: 50%;
      padding: 10px;
      float: left;
      font-size: 16px;
    }

    .addBtn {
      padding: 10px;
      width: 10%;
      background: #d9d9d9;
      color: #555;
      float: left;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      transition: 0.3s;
      border-radius: 0;
    }

    .addBtn:hover {
      background-color: #bbb;
    }

    
</style>
