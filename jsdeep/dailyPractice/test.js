// async function async1() {
//     console.log("a");
//     await async2();
//     console.log("b");
//   }
//   async function async2() {
//     console.log('c');
//   }
//   async1();
//   new Promise(function (resolve) {
//     console.log("d");
//     resolve();
//   }).then(function () {
//     console.log("e");
//   });
// new Promise(resolve => {
//     resolve(1);
//     Promise.resolve().then(() => console.log(2));
//     console.log(4)
// }).then(t => console.log(t));
// console.log(3);

// new Promise(r=>{r(
//     new Promise(r=>{r(1)})
// )}).then(e=>{console.log(1)}).then(e=>{console.log(2)})

// new Promise(r=>{r(
//    r(0)
// )}).then(e=>{console.log(10)}).then(e=>{console.log(20)})
// 10 20  1 2

function Person(name) {
  
    this.name = name; // Person {name: "why"}
    return {}
}

var p = new Person("why");
console.log(p);