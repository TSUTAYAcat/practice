var fs = require("fs");
fs.readFile("./a.file", "utf8", function (err,data) {
    if (err) {
        console.log(err)
        return
    } else {
        console.log(data)
    }
})
