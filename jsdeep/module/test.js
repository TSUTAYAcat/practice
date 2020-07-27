let a = 1
let b = () => {
    console.log(a);
    return 'LOST'
}
module.exports = { a, b }
