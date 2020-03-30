const pathlib = require("path") ;

module.exports={
    // basic
    port:8090,
    uploadDir:pathlib.resolve('www/upload'),
    wwwDir:pathlib.resolve('www'),
    // secret
    secret_key:['sadkasdkask','sdasdasdkaskd'],
    // database
    db_host: '127.0.0.1',
    db_port: '3306',
    db_user: 'root',
    db_pass: '',
    db_name: 'koa',
}