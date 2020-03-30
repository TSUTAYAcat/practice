const Mysql = require('mysql-pro');
const config = require('../config');

let db = new Mysql({
    mysql: { 
        host: config.db_host,
        port: config.db_port,
        user: config.db_user,
        password: config.db_pass,
        database: config.db_name
    }
});
db.excute = async (sql) => {
    let res;
    await db.startTransaction();
    if (typeof (sql) === "string") {
        res = await db.executeTransaction(sql);
    } else {
        sql.forEach(async e => {
            res = await db.executeTransaction(e);
        })
    }
    await db.stopTransaction();
    return res
}
module.exports = db;