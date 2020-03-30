class person {
    private name:string;
    private age:number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    show (){
        console.log(`${this.name}+"-"+${this.age}`)
    }
}

let a:person = new person("111",2);
a.show();