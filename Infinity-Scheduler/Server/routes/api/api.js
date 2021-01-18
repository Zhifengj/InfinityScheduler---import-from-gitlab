import express from "express"
import mysql from "mysql"

const router = express.Router();



const HOST = "ns2.giowm1215.siteground.biz"
const USER = "urkmnjh23juah"
const PASSWORD = "isr00td@t@"
const DBNAME = "dbzsjyjqfinn66"

var connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DBNAME
});


connection.connect();

function execute(query, func) {
 

   

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        func(results)
    });

   

};



// Get Posts
router.get('/auth', async (req, res) => {
    if (req.uname.includes(";") || req.pword.includes(";"){

    }
    else {
        execute(`select UID from User where Username=\"${req.uname}\" and Password=\"${req.pword}\"`, (results) => {
            res.send(JSON.stringify({
                "UID" : results[0]

            }))

        })
    }

});





export default router