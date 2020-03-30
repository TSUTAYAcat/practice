var fs = require("fs");
fs.writeFile("./a.file", "需要写入的数据", function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("写入成功")
    }
})
