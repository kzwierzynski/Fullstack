class Greeter {
    constructor(public name: string) { }
    greet() {
        return "Hello " + this.name;
    }
};

var greeter = new Greeter("World");

var greeting = greeter.greet();

console.log(greeting);