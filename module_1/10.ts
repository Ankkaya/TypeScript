// 泛型 java 中泛型概念，泛型指的是类型参数化，即将原来某种具体的类型进行参数化
// 和定义函数参数一样，我们可以给泛型定义若干个类型参数，并在调用时给泛型传入明确的类型参数。
// 设计泛型的目的在于有效约束类型成员之间的关系，比如函数参数和返回值、类或者接口成员和方法之间的关系

// 泛型类型参数
function reflect(param: unknown) {
    return param
}

// <>语法给函数定义一个泛型参数 P，并指定 param 参数的类型为 P，
function reflect2<P>(param: P) {
    return param
}
const reflectStr = reflect2<string>('string')

// 使用泛型显式注解返回值的类型
function reflect3<P>(param: P):P {
    return param
}
const reflectNum = reflect3<number>(1)

// 调用泛型函数时受泛型约束的参数有传值，泛型参数的入参可以从参数的类型中进行推断，无需再显式指定类型
const reflectStr2 = reflect2('string')
const reflectNum2 = reflect3(1)

// 泛型可以约束参数属性、成员的类型，比如参数的类型可以是数组、对象
// 这里我们约束了 param 的类型是数组，数组的元素类型是泛型入参
function reflectArray<P>(param: P[]) {
    return param
}
const reflectArr = reflectArray([1, '1']) // reflectArray 是 (string | number)[]

// 泛型类
// 在类的定义中，我们还可以使用泛型用来约束构造函数、属性、方法的类型
class Memory<S> {
    store: S
    constructor(store: S) {
        this.store = store
    }
    set(store: S) {
        this.store = store
    }
    get() {
        return this.store
    }
}
const numMemory = new Memory<number>(1)
const getNumMemory = numMemory.get()
numMemory.set(2)
const strMemory = new Memory<string>('str')
const getStrMemory = strMemory.get()
strMemory.set('ankkaya')

// 泛型类型
// 类型本身可以被定义为拥有不明确的类型参数的泛型，并且可以接收明确类型作为入参，从而衍生出更具体的类型
const reflectFn: <P>(param: P) => P = reflect
type ReflectFunction = <P>(param: P) => P
interface IReflectFunction {
    <P>(param: P): P
}
const reflectFn2: ReflectFunction = reflect
const reflectFn3: IReflectFunction = reflect
const reflectFn2Return = reflectFn2('string')
const reflectFn3Return = reflectFn3(1)

// 在泛型定义中，我们甚至可以使用一些类型操作符进行运算表达，使得泛型可以根据入参的类型衍生出各异的类型
type StringOrNumberArray<E> = E extends string | number ? E[] : E
type StringArray = StringOrNumberArray<string>
type NumberArray = StringOrNumberArray<number>
type NeverGot = StringOrNumberArray<boolean>

