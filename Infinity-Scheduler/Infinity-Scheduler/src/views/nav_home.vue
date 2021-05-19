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
                    <p>
                        <input v-model="newTodo">
                        <button class="addBtn" @click="addTodo">Add Todo</button>
                    </p>
                </div>

                <div v-for="(toDo, n) in todoList">
                    <p class="myTodoList">
                        <span class="todo">{{ toDo }}</span>
                        <button class="closeBtn" @click="removeTodo(n)">Remove</button>
                    </p>
                </div>
            </div>

            <div id="Events" class="tabcontent">
                <div class="main_container">
                    <div class="notes">
                        <div class="note">
                            <div id="clock">
                                <p id="date" class="date"></p>
                                <p id="time" class="time"></p>
                            </div>

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
                                        <th>Time left</th>
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
                <h3>tasks function coming soon...</h3>
            </div>
        </div>
        </body>
</template>

<script>

    import axios from 'axios'
    //document.getElementById("defaultTab").click();

    const SERVER_URL = "http://localhost:80";
    const PROD_SERVER_URL = "http://infinityscheduler.com";
    function getServerFuncURL(name, args = false) {
        if (args != false) {
            return `${SERVER_URL}/server/${name}.php?args=${encodeURIComponent(JSON.stringify(args))}`
        } else {
            return `${SERVER_URL}/server/${name}.php`
        }

    }

    export default {
        name: 'nav_home',
        data() {
 
            return {
                eventData: null,
                time: '',
                date: '',
                week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
                countdown: '1010-20-20',
                todoList: [],
                newTodo: null,
               // todoList: this.$store.state.todoList,

            }
        },
        mounted() {

            axios
                .get(getServerFuncURL("getNextEvent"))
                .then(response => (this.eventData = response.data))

            //this.eventData = this.$store.dispatch("getUpcomingEvent");

            if (localStorage.getItem('todoList')) {
                try {
                    this.todoList = JSON.parse(localStorage.getItem('todoList'));
                } catch (e) {
                    localStorage.removeItem('todoList');
                }
            }
        },
        methods: {
            openTab: function (evt, tabID) {
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
                //get todo from database here.
                var inputValue = document.getElementById("myInput").value;
                
                var t = document.createTextNode(inputValue);
                li.appendChild(t);
                if (inputValue === '') {
                    alert("You must write something!");
                } else {
                    document.getElementById("myUL").appendChild(li);
                }
                console.log(inputValue);
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

            addTodo: function () {
                //var input = document.getElementById("myInput").value;
                //console.log(input);
                //this.$store.commit("addTodo", input);

                if (!this.newTodo) {
                    return;
                }

                this.todoList.push(this.newTodo);
                this.newTodo = '';
                this.saveTodo();
            },
            removeTodo(x) {
                this.todoList.splice(x, 1);
                this.saveTodo();
            },
            saveTodo() {
                const parsed = JSON.stringify(this.todoList);
                localStorage.setItem('todoList', parsed);
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


    //var temp = this.eventData;
    //console.log(temp);
    /*
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
    */



</script>

<style>
    .tab {
        overflow: hidden;
        border: 1px solid #ccc;
        background-color: #D7C49EFF;
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
                background-color: #A07855FF;
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

    .myTodoList > span:nth-child(odd) {
        background-color: lightcyan;
        font-size:medium;
        border-radius: 10px;
        width: 100px;
        padding: 10px;
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
    .closeBtn {
        border-radius: 25px;
        background-color: lightcoral;
        border: none;
        color: black;
        padding: 5px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
        margin: 4px 2px;
        cursor: pointer;
    }

    p {
        margin: 0;
        padding: 0;
    }

    #clock {
        font-family: 'Share Tech Mono', monospace;
        text-align: center;
        position: relative;
        margin-top: 100px;
        left: 50%;
        top: 75%;
        transform: translate(-50%, -50%);
        color: #A07855FF;
        text-shadow: 0 0 20px rgba(158, 134, 123, 1), 0 0 20px rgba(158, 134, 123, 0);
    }

    .time {
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
        position: relative;
    }
</style>
