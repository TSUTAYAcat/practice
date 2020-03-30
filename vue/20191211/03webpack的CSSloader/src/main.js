// 使用commonjs的模块化规范
const { sum, result } = require("./js/info")
console.log(sum(1, 2));
console.log(result);
// 使用ES6模块化规范
import yourName,{ msg as message, output } from "./js/output";
console.log(message);console.log(output("joy"));console.log(yourName)

require("./css/bgcolor.css")
