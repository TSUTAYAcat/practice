/*
 * @Author: your name
 * @Date: 2020-06-07 11:20:47
 * @LastEditTime: 2020-06-07 12:26:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study/jsdeep/http.js
 */
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    const { query } = url.parse(req.url, true);
    const { keywords } = query
    let data = []
    if (keywords) {
        for (let i = 0; i < 5; i++) {
            data.push(`${keywords}${i}`)
        }
    }
    data = JSON.stringify(data)
    res.write(data);
    res.end();
})
server.listen(8091)
