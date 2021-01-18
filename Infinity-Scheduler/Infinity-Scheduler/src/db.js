var mysql = require('mysql');


const HOST = "ns2.giowm1215.siteground.biz"
const USER = "urkmnjh23juah"
const PASSWORD = "isr00td@t@"
const DBNAME = "dbzsjyjqfinn66"



function conn() {
    var connection = mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DBNAME
    });

    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });

    connection.end();

};

conn()


