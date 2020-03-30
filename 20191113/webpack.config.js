const pathlib = require('path')
module.exports = {
    entry:'./src/1.js',
    output:{
        path:pathlib.resolve('./dest'),
        filename:'bundle.js'
    }
}