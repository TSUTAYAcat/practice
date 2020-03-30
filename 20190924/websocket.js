const http = require('http');
const io = require('socket.io')
const url = require('url');
const fs = require('fs');
const zlib = require('zlib');

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true); // pathname:路径, query:传参
    switch (pathname) {
        case '/websocket.html':
            //获取静态文件
            let rs = fs.createReadStream(`www${pathname}`);
            const gz = zlib.createGzip();
            res.setHeader('content-encoding','gzip');
            rs.pipe(gz).pipe(res);
            // console.log(pathname)
            rs.on('error',err=>{
                console.log(err)
                res.writeHead("404");
                res.write("Not Found");
                res.end;
            })
            break;
        default:
            break;
    }
});
server.listen(8080);

const wsServer = io.listen(server);
let sockArr = []
wsServer.on('connection', sock => {
    sockArr.push(sock)
    // 断开连接 删除sock
    sock.on('disconnect',()=>{
        let n = sockArr.indexOf(sock);
        if(n!==-1){
            sockArr.splice(n,1)
        }
    })
    sock.on('msg', str => {
        // console.log(str)
        sockArr.forEach(e => {
            if (e !== sock) {
                e.emit('msg', str)
            }
        })
    });
})

