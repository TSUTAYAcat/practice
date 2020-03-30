const http = require('http');
const fs = require('fs')

let pipeTest = http.createServer((req,res)=>{
    let rs = fs.createReadStream(`www${req.url}`);
    let ws = fs.createWriteStream(`www/1a.html`)
    rs.pipe(ws);
    rs.on("error",err=>{
        res.write("404");
        res.write("Not Found");
        res.end();
    })
    ws.on('finish',data=>{
        res.end();
    })
})

pipeTest.listen(8080)