const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin  = require("html-webpack-plugin")
const Uglifyjs = require("uglifyjs-webpack-plugin")
module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve("./dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    resolve: {
        // alias：别名，使得每次导入vue vue所找的文件来自vue/dist/vue.esm.js，默认来自vue/dist/vue.runtime.js
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins:[
        // 添加版权的plugin
        new webpack.BannerPlugin("版权所有归Mr.Cat"),
        // 打包HTML
        new HtmlWebpackPlugin({
            template:"index.html"
        }),
        // 压缩js
        new Uglifyjs()
    ],
    devServer:{
        // 提供服务文件夹
        contentBase:"./dist",
        // 实时刷新
        inline :true,

    }
}