let arrayNumber: number[] = [1, 2, 3]
let arrayString: string[] = ['tom', 'mark']
let arrayNumber2: Array<number> = [1, 2, 3]
let arrayString2: Array<string> = ['toms', 'alice']
// 元组 （Tuple）元组最重要的特性是限制数组元素个数和类型，特别适合用来实现多值返回

// any 指的是一个任意类型，官方提供的一种绕过静态检测的方法
// any 在 JavaScript 往 TypeScript 迁移的过程中，可以选择性添加和忽略某些 JavaScript 模块的静态检测，直至完全替换 JavaScript
// 过渡使用 any，失去类型检测意义
let anything: any = {}
anything.doAnything()
anything = 1
anything = 'mark'
let num: number = anything

// unknown 描述类型不确定的变量，比如用在 if else 条件分支场景
// 任意类型的值可以赋值给 unknown 值只能赋值给 unknown 和 any
let result: unknown
// let unknown_num: number = result 异常 ts(2322)
let unknown_anything: any = result
// 类型缩小手段
if (typeof result === 'number') {
    result.toFixed()
}

// void 没有返回值的函数。如果该函数没有返回值，那它的类型就是 void
// void 类型变量不能再赋值给除 any 和 unknown 之外的任何类型变量
function showVoid(): void {}
// let void_num:number = showVoid 异常 ts(2322)
let void_unknown: unknown = showVoid
let void_any: any = showVoid

// undefined 和 null TypeScript 中值和类型关键字同名的唯二例外

// never 表示永远不会发生值的类型
// never 是所有类型的子类型，可以赋值给其他所有类型。反过来，除了 never 自身外，其他所有类型都不能为 never 类型赋值
// 基于 never 特性的有意思实例，never 作为接口类型下的属性类型，用来禁止写接口下的特定属性
function ThrowError(msg: string): never {
    throw Error(msg)
}
// let Unreachable: never = 1
// let never_number: number = Unreachable
// let never_string: string = Unreachable
const props: {
    id: number,
    name?: never
} = {
    id: 1
}
// props.name = 'ankkaya' 

// object 

// 类型断言
// 非空断言
const arrayNumber3: number[] = [1, 2, 3, 4]
const greaterThan2: number = <number>arrayNumber3.find(num => num > 2)
let mayNullOrUndefinedOrString: null | undefined | string
// 在恒为 false 的类型守卫条件判断下，变量的类型将缩小为 never （never 是所有其它类型的子类型，所以类型缩小为 never，而不是变成 never）
mayNullOrUndefinedOrString = undefined
// if (typeof mayNullOrUndefinedOrString === 'string') {
//     mayNullOrUndefinedOrString.toString()
// }
mayNullOrUndefinedOrString!.toString()
// mayNullOrUndefinedOrString.toString()
