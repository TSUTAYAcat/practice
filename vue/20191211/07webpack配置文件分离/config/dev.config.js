const merge = require("webpack-merge")
const baseConfig = require("./base.config")
module.exports = merge(baseConfig, {
    devServer: {
        // 提供服务文件夹
        contentBase: "./dist",
        // 实时刷新
        inline: true,

    }
})