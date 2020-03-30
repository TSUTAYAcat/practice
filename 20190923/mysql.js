const http = require('http');
const fs = require('fs');
const url = require('url');
const zlib = require('zlib');
const mysql = require('mysql');

let db = mysql.createConnection({ host: 'localhost', user: "root", password: "", port: "3306", database: "test" })

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    const { username, password } = query;
    switch (pathname) {
        case '/login':
            if (username === '') {
                res.write('{"err":1,"msg":"username can\'t be null"}');
                res.end();
            } else if (password === '') {
                res.write('{"err":1,"msg":"password can\'t be null"}');
                res.end();
            } else if (!/^\w{4,16}$/.test(username)) {
                res.write('{"err":1,"msg":"username is invaild"}');
                res.end();
            } else if (/^['|"]$/.test(password)) {
                res.write('{"err":1,"msg":"password is invaild"}');
                res.end();
            } else {
                db.query(`select * from user where username = '${username}' and password = '${password}'`, (err, data) => {
                    if (err) {
                        console.log(err)
                        res.write('{"err":1,"msg":"database error"}');
                        res.end();
                    } else {
                        if (data.length > 0) {
                            res.write('{"err":0,"msg":"success"}');
                            res.end();
                        } else {
                            res.write('{"err":1,"msg":"user or password is wrong"}');
                            res.end();
                        }
                    }
                })
            };
            break;
        case '/res':
            if (username === '') {
                res.write('{"err":1,"msg":"username can\'t be null"}');
                res.end();
            } else if (password === '') {
                res.write('{"err":1,"msg":"password can\'t be null"}');
                res.end();
            } else if (!/^\w{4,16}$/.test(username)) {
                res.write('{"err":1,"msg":"username is invaild"}');
                res.end();
            } else if (/^['|"]$/.test(password)) {
                res.write('{"err":1,"msg":"password is invaild"}');
                res.end();
            } else {
                db.query(`select * from user where username = '${username}'`, (err, data) => {
                    if (err) {
                        console.log(err)
                        res.write('{"err":1,"msg":"database error"}');
                        res.end();
                    } else {
                        if (data.length > 0) {
                            res.write('{"err":1,"msg":"user exsits"}');
                            res.end();
                        } else {
                            db.query(`insert into user(username,password) values('${username}','${password}')`, (err, data) => {
                                if (err) {
                                    console.log(err)
                                    res.write('{"err":1,"msg":"database error"}');
                                    res.end();
                                } else {
                                    res.write('{"err":0,"msg":"success"}');
                                    res.end();
                                }
                            })
                        }
                    }
                })
            };
            break;
        default:
            // 获取静态文件
            let rs = fs.createReadStream(`www${pathname}`);
            const gz = zlib.createGzip();
            res.setHeader('content-encoding', 'gzip')
            rs.pipe(gz).pipe(res);
            rs.on('error', err => {
                res.writeHead('404');
                res.write('Not Found');
                res.end();
            });
            break;
    }
});

server.listen(8080)