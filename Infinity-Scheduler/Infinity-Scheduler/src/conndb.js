const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'Test',
    password: 'cs461is',
    database: 'Infinity',
    connectionLimit: 500
});


async function selectalldb() {
    let conn;
    try {
        conn = await pool.getConnection();
        //rows = await conn.query("INSERT INTO users VALUES (4,'test3', '44')");
        rows = await conn.query("SELECT * from users");
        console.log(rows);

    } catch (err) {
        throw err;
    } finally {
        if (conn)
            conn.release();
    }

}

async function insertdb(id, uname, pword) {
    let conn;
    try {
        conn = await pool.getConnection();
        rows = await conn.query("INSERT INTO users VALUES (?, ?, ?)", [id, uname, pword]);
        console.log(rows);

    } catch (err) {
        throw err;
    } finally {
        if (conn)
            conn.release();
    }
}


selectalldb();
//insertdb(5, "hello", "testing");
