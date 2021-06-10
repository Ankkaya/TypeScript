const add = (a: number, b: number): number => {
    return a + b
}

// 返回值类型
function fn(): void { }

// TypeScript 函数类型中的 => 用来表示函数的定义，左侧是函数的参数类型，右侧是函数的返回值类型
type Adder = (a: number, b: number) => number
const add1: Adder = (a, b) => a + b

// 对象属性简写语法声明函数类型的属性
interface Entity {
    add: (a: number, b: number) => number
    del(a: number, b: number): number
}
const entity: Entity = {
    add: (a, b) => a + b,
    del(a, b) {
        return a - b
    }
}

// 可缺省和可推断的返回值类型
function computeTypes(one: string, two: number) {
    const nums = [one]
    const strs = [two]
    return {
        nums,
        strs
    }
}
// 参数类型
// 可选参数和默认参数
function log(x?: string) {
    console.log(x)
}
function log1(x: string | undefined) {
    console.log(x)
}
log()
log(undefined)
log1()
log1(undefined)

// ES6 支持函数默认参数, TypeScript 会根据函数默认参数的类型来推断函数类型
{
    function log(x = 'hello') {
        console.log(x)
    }
    log()
    log('hi')
    log(1)
}

// 默认参数类型必须是参数类型的子类型
{
    function log(x: number | string = 'hello') {
        console.log(x)
    }
}

// 剩余参数
{
    function sum(...nums: number[]) {
        return nums.reduce((a, b) => a + b, 0)
    }
    sum(1, 2)
    sum(1, 2, 3)
    sum(1, '2')
}
{
    function sum(...nums: (number | string)[]) {
        return nums.reduce<number>((a, b) => a + Number(b), 0)
    }
    sum('1', 2, 3)
}

// this
function say1(this: Window) {
    console.log(this.name)
}
say1() // window.say1()

function say2(this: Window, name: string) {
    console.log(this.name)
}
window.say = say
window.say('hi')
const obj = {
    say2
}
obj.say2('hi')
// 直接调用 say(), this 实际上应该指向全局变量 window, 但是因为 TypeScript 无法确定 say 函数被谁调用，所以 this
// 指向默认为 void
say2('captain')

// 定义对象的函数属性，实际调用 this 的指向与指定的 this 指向不同
// 显式注解函数中的 this 类型，它表面上占据第一个形参的位置，但并不意味着函数真的多了一个参数
// 因为 TypeScript 转译为 JavaScript 后，“伪形参” this 会被抹掉
interface Person {
    name: string,
    say(this: Person): void
}
const person: Person = {
    name: 'captain',
    say() {
        console.log(this.name)
    }
}

const fn3 = person.say
fn3()

// 限定类中 this 指向
class Component {
    onClick(this: Component) { }
}
const component = new Component()
interface UI {
    addClickListener(onClick: (this: void) => void): void
}
const ui: UI = {
    addClickListener() {}
}
ui.addClickListener(new Component().onClick)

// 链式调用
class Container {
    private val: number
    constructor(val: number) {
        this.val = val
    }
    map(cb: (x: number) => number): this {
        this.val = cb(this.val)
        return this
    }
    log(): this {
        console.log(this.val)
        return this
    }
}
const instance = new Container(1)
    .map((x) => x + 1)
    .log() // => 2
    .map((x) => x * 3)
    .log() // => 6

// 函数重载
// 函数重载列表各个函数必须是函数实现的子集
function convert(x: string): number;
function convert(x: number): string;
function convert(x: null): -1;
function convert(x: string | number | null): any {
    if (typeof x === 'string') {
        return Number(x)
    }
    if (typeof x === 'number') {
        return String(x)
    }
    return -1
}
const x1 = convert('1')
const x2 = convert(1)
const x3 = convert(null)

// 类型谓词 (is)
// 在添加返回值的地方，通过“参数名 + is + 类型”的格式明确表明参数的类型，进而引起类型缩小
function isString(m): m is string{
    return typeof m === 'string'
}
function isNumber(n: number) {
    return typeof n === 'number'
}
function operator(x: unknown) {
    if (isString(x)) {}
    if (isNumber(x)) {}
}