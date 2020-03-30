const path = require("path")
module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // cssloader只负责将css文件加载
                // styleloader负责将样式添加到dom中
                // css与style必须style在前面 ，因为加载从右向左，必须先找到css才能加载样式到dom
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    },
}