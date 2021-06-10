// 类类型，如何高效使用类型化的面向对象编程
class Dog {
    name: string;
    constructor(name: string) {
        this.name = name
    }
    bark() {
        console.log('Woof! Woof!')
    }
}

const dog = new Dog('Q')
dog.bark()

// 继承
class Animal {
    type = 'Animal'
    say(name: string) {
        console.log(`I'm ${name}!`)
    }
}
class Dog1 extends Animal {
    bark() {
        console.log('Woof! Woof!')
    }
}
const dog1 = new Dog1()
dog1.bark()
dog1.say('Q')
dog1.type

// 类型访问修饰符
// private 声明的变量和方法只能在当前类中访问
class User {
    name: string
    private age: number = 12
    constructor(firstName: string) {
        this.name = firstName;
        this.age
    }
}
const user = new User('tony')
console.log(user.age)
// protected 声明的变量和方法可以在父类和子类中访问
class School {
    name: string
    protected address: string = '07号'
    constructor(name: string) {
        this.name = name
    }
}

class HighSchool extends School {
    constructor(name: string) {
        super(name)
    }
    getAddress() {
        return this.address
    }
}

const school = new HighSchool('zhbit')
school.getAddress()
console.log(school.address)
// readonly 只读修饰符，被声明的属性无法更改
