<template>
    <body onload="document.getElementById('defaultOpen').click();">
        <div class="body">
            <div class="tab">
                <button class="tablinks" v-on:click="openTab($event, 'TodoList')">TodoList</button>
                <button class="tablinks active" style="display:block" v-on:click="openTab($event, 'Events')" id="defaultOpen">Events</button>
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
                            <div id="clock">
                                <p id="date" class="date"></p>
                                <p id="time" class="time"></p>

                            </div>
                            <!-- countdown timer 
                            <div>Countdown to upcoming event: </div>
                            <div class="cdtime">
                                <p id="timer"> until next event</p>
                            </div>
                                -->
                        </div>
                        <div class="note">
                            <div>Upcoming Events: </div>
                            <div id="upcoming-events">
                                <table border='1' width='80%' style='border-collapse: collapse;'>
                                    <tr>
                                        <th>Title</th>
                                        <th>Body</th>
                                        <th>Location</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Completed</th>
                                    </tr>
                                    <tr v-for="event in eventData">
                                        <th>{{event.Title}}</th>
                                        <th>{{event.Body}}</th>
                                        <th>{{event.Location}}</th>
                                        <th>{{event.Start}}</th>
                                        <th>{{event.End}}</th>
                                        <th>{{event.Completed}}</th>

                                    </tr>

                                </table>
                            </div>



                        </div>
                    </div>
                </div>
            </div>

            <div id="Tasks" class="tabcontent">
                <h3>Tasks function coming soon...</h3>
            </div>
        </div>
    </body>
</template>

<script>
    
    import axios from 'axios'

    const SERVER_URL = "http://localhost:80"
    const PROD_SERVER_URL = "http://infinityscheduler.com"
    function getServerFuncURL(name, args = false) {
        if (args != false) {
            return `${SERVER_URL}/server/${name}.php?args=${encodeURIComponent(JSON.stringify(args))}`
        } else {
            return `${SERVER_URL}/server/${name}.php`
        }

    }
    
var v = {
    name: 'nav_home',
    data(){
        return {
            eventData: null,
            time: '',
            date: '',
            week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
          
        }
    },
    mounted() {
        
        axios
            .get(getServerFuncURL("getNextEvent"))
            .then(response => (this.eventData = response.data))
       setInterval(this.updateTime(), 1000);
       this.updateTime()
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
        zeroPadding: function (num, digit) {
            var zero = '';
            for (var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        updateTime: function () {
            var cd = new Date();
            this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
            this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()];
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

    //clock
    window.onload = setInterval(function () {
        var d = new Date();

        var date = d.getDate();

        var month = d.getMonth();
        var montharr = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        month = montharr[month];

        var year = d.getFullYear();

        var day = d.getDay();
        var dayarr = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
        day = dayarr[day];

        var hour = d.getHours();
        var min = d.getMinutes();
        var sec = d.getSeconds();

        document.getElementById("date").innerHTML = month + " " + date + " " + year + " " + day;
        document.getElementById("time").innerHTML = hour + ":" + min + ":" + sec;
    }, 1000);

    
    /*
     * countdown timer code
    //this will be time of next event
    var countDownDate = new Date("May 30, 2021 15:37:25").getTime();

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
    */
    export default v;

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

    p {
        margin: 0;
        padding: 0;
    }

    #clock {
        font-family: 'Share Tech Mono', monospace;
        color: #1E90FF;
        text-align: center;
        position: relative;
        margin-top: 100px;
        left: 50%;
        top: 75%;
        transform: translate(-50%, -50%);
        color: #1E90FF;
        text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
    }
    .time
     {
        letter-spacing: 0.05em;
        font-size: 80px;
        padding: 5px 0;
    }

    .date {
        letter-spacing: 0.1em;
        font-size: 24px;
    }

    .text {
        letter-spacing: 0.1em;
        font-size: 12px;
        padding: 20px 0 0;
    }

    .cdtime {
        position:relative;
    }
    

    
</style>
