
import axios from 'axios'

class DBUTil {
    static isProd = false

    static SERVER_URL = "http://localhost:80"
    static PROD_SERVER_URL = "http://infinityscheduler.com"

    static savedEvent = null

    static getServerFuncURL(name, args = false) {
        let surl =  this.isProd ?  this.PROD_SERVER_URL : this.SERVER_URL

        if (args != false) {
            return `${surl}/server/${name}.php?args=${encodeURIComponent(JSON.stringify(args))}`
        } else {
            return `${surl}/server/${name}.php`
        }

    }

    static getUseURL() {
        return this.isProd ? this.PROD_SERVER_URL : this.SERVER_URL 
    }

    //adds the 0 in front of 1 digit numbers
    static datePad(s) {
        let ps = `${s}`
        if (ps.length == 1) {
            ps = `0${ps}`
        }
        return ps
    }

    //takes a date objects and translates it to the string format YYYY-MM-DD HH:mm:SS in UTC time
    //database strings must be in this format
    static toDBDate(date) {


        return `${date.getUTCFullYear()}-${this.datePad(date.getUTCMonth() + 1)}-${this.datePad(date.getUTCDate())} ${this.datePad(date.getUTCHours())}:${this.datePad(date.getUTCMinutes())}:${this.datePad(date.getUTCSeconds())}`
    }

    //returns a date object from a string in the form YYYY-MM-DD HH:mm:SS
    static fromDBDate(date) {
        let year = parseInt(date.substring(0, 4))
        let month = parseInt(date.substring(5, 7)) - 1
        let day = parseInt(date.substring(8, 10))
        let hour = parseInt(date.substring(11, 13))
        let minute = parseInt(date.substring(14, 16))
        let d = new Date(Date.UTC(year, month, day, hour, minute))

        return d

    }

    //converts a dbevent to a local event
    static fromDBEvent(event) {
        let keys = Object.keys(event);
        let n = keys.length;
        let nevent = {}
        while (n--) {

            nevent[keys[n].toLowerCase()] = event[keys[n]];
        }
        return nevent
    }

    //executes a database function and returns the result. Console.logs the error if there is one
    static async execDB(func, args) {
        try {

            const response = await axios.get(this.getServerFuncURL(func, args));

            if (response.data.hasOwnProperty("redirect")) {
                window.location.href = response.data["redirect"]

            }
            return response.data

        } catch (error) {
            console.error(error);
            return error
        }
    }

    static sendNotification(title, body, onclick) {
        if (!('Notification' in window)) {
            console.log("This browser does not support notifications.");
        } else {
            if (Notification.permission === 'default' || Notification.permission === 'denied') {
                Notification.requestPermission(function (permission) {

                });
            } else {
                let n = new Notification(title, { "body": body })
                n.onclick = onclick
            }


        }
    }

}

export default DBUTil
