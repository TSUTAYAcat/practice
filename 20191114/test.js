class person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    show() {
        console.log(`${this.name}+"-"+${this.age}`);
    }
}
let a = new person("111", 2);
a.show();
