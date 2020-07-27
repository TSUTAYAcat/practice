let path = require('path');
let fs = require('fs');
let vm = require('vm');

function require_(path_) {
    // 验证路径
    // 没有扩展名的话 加上.js 和.json 验证路径
    // 如果不存在报错  否则返回文件路径
    let pathName = Module.resolvePathName(path_)
    // 如果缓存里有 直接返回缓存数据
    if (Module.cache[pathName]) return Module.cache[pathName].exports
    // 创建一个module对象 保存pathName 还有最后要导出数据 初始状态是个空对象
    let module = new Module(pathName)
    // 如果是js文件 读取js文件内容 用函数包裹起来 放入vm沙盒 然后执行 最终会保存导出数据在exports
    // 如果是json 文件则会保存JSON.parse之后的数据放到exports中
    module.load()
    // 缓存数据 
    Module.cache[pathName] = module
    // 返回导出数据
    return module.exports

}
function Module(pathName) {
    this.pathName = pathName
    this.exports = {}
}
Module.extesions = ['.js', '.json']
Module.extesion = {}
Module.cache = {}
Module.resolvePathName = function (path_) {
    // 获取绝对路径
    let pathName = path.resolve(path_)
    // 获取文件扩展名
    let extName = path.extname(pathName)
    if (extName.length) {             //有扩展名 验证当前路径文件是否存在 不存在报错 
        try {
            fs.accessSync(pathName)
            return pathName
        } catch (error) {
            throw new Error('传入路径不存在')
        }
    } else {                        //无扩展名 挨个加入扩展名（.js .json）验证是否存在 不存在报错
        for (let i = 0; i < Module.extesions.length; i++) {
            try {
                fs.accessSync(pathName + Module.extesions[i])
                return pathName + v
            } catch (error) {
                if (i === Module.extesions.length - 1) {
                    throw new Error('传入路径不存在')
                }
            }
        }
    }
}
Module.prototype.load = function () {
    let extName = path.extname(this.pathName)
    if (extName === '.js') {
        // 读取文件内容 
        let content = fs.readFileSync(this.pathName, 'utf8')
        // 包裹成一个函数 外面加个括号 这种感觉 (function(){  'content'  })
        let script = '(function (module,require_) {' + content + '})'
        // 放到vm沙盒中 这个沙盒能访问global 但是访问不了外界作用域 避免变量污染
        let fn = vm.runInThisContext(script)
        // 执行沙盒返回出来的函数 传入this 作为第一个参数 require_ 作为第二个参数 
        fn.call(this, this, require_)
    } else if (extName === '.json') {
        let content = fs.readFileSync(this.pathName, 'utf8')
        let obj = JSON.parse(content)
        this.exports = obj
    }
}


// const data = require_('./test.js')
// console.log(data, data.b());

// const dataj = require_('./tes.json')
// console.log(dataj);