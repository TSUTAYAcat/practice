// 使用commonjs的模块化规范
const { sum, result } = require("./info")
console.log(sum(1, 2));
console.log(result);
// 使用ES6模块化规范
import yourName,{ msg as message, output } from "./output";
console.log(message);console.log(output("joy"));console.log(yourName)
