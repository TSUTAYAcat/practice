const Uglifyjs = require("uglifyjs-webpack-plugin")
const merge = require("webpack-merge")
const baseConfig = require("./base.config")
module.exports = merge(baseConfig,{
    plugins:[
        // 压缩js
        new Uglifyjs()
    ],
})