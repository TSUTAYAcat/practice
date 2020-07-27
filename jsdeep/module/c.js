let path = require('path');
let fs = require('fs');
let vm = require('vm');

function Module(pathAllName) {
    this.id = pathAllName
    this.exports = {}
}
Module.extension = {}
Module.extension[`.js`] = function (module) {
    let content = fs.readFileSync(module.id, 'utf8')
    let script = ` (function(module) { 
         ${content}  
        })`
    let fn = vm.runInThisContext(script)
    fn(module)

}
Module.prototype.load = function () {
    let extname = path.extname(this.id)
    Module.extension[extname](this)
}

function requ(pathName) {
    let pathAllName = path.resolve(pathName)
    try {
        fs.accessSync(pathAllName)
    } catch (error) {
        throw new Error('不存在当前路径')
    }
    let module = new Module(pathAllName)
    module.load()
    return module.exports
}

let d = requ('./d.js')
console.log(d);