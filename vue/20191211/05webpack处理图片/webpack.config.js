const path = require("path")
module.exports = {
    entry: path.resolve("./src/main.js"),
    output: {
        path: path.resolve("dist"),
        filename: "bundle.js",
        publicPath:"dist/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 20000, // 限制20000字节以下base64，以上使用file-loader打包成文件
                            name: 'img/[name][hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['es2015']
                  }
                }
              }
        ]
    }
}