// 联合和交叉类型 Unions and Intersection Types
// 联合类型, 虽然 unknown 可以通过静态类型检测，这显然不符合预期，因为 size 应该是更明确的，即可能也只可能是 number 或 string
// 这两种可选类型
function formatPX(size: unknown) {
    if (typeof size === 'number') {
        return `${size}px`
    }
    if (typeof size === 'string') {
        return `${parseInt(size) || 0}px`
    }
    throw Error('仅支持 number 或者 string')
}
formatPX(13)
formatPX(null)
formatPX(true)

// 联合类型,添加字符串字面量类型 unit 参数
function formatPX2(size: number | string, unit: 'px' | 'em' | 'rem' | '%' = 'px') {

}
formatPX2(13, 'em')
formatPX2('13px', 'rem')
formatPX2(2, 'bem')
formatPX2(true)
formatPX2(null)

// 类型别名抽离联合类型，进一步联合
type ModernUnit = 'vh' | 'vw'
type Unit = 'px' | 'em' | 'rem'
type MessedUp = ModernUnit | Unit

// 接口类型联合起来表示更复杂的结构
// 在联合类型中，我们可以直接访问各个接口成员都拥有的属性、方法，且不会提示类型错误。但是，如果是个别成员特有的属性、
// 方法，我们就需要区分对待了，此时又要引入类型守卫来区分不同的成员类型
interface Bird {
    fly(): void
    layEggs(): void
}
interface Fish {
    swim(): void
    layEggs(): void
}
const getPet: () => Bird | Fish = () => {
    return {

    } as Bird | Fish
}
const Pet = getPet()
Pet.layEggs()
Pet.fly()
// 使用基于 in 操作符判断的类型守卫
// 因为 Pet 的类型既可能是 Bird 也可能是 Fish，
if (typeof Pet.fly === 'function') {
    Pet.fly()
}
if ('fly' in Pet) {
    Pet.fly()
}

// 交叉类型，在 TypeScript 中，我们可以使用“&”操作符来声明交叉类型
type Useless = string & number

// 合并接口类型
// 联合类型真正的用武之地就是将多个接口类型合并成一个类型，从而是实现等同接口继承的效果，
// 也就是所谓的合并接口类型
type IntersectionType = {id: number, name: string} & {age: number}
const mixed: IntersectionType = {
    id: 1,
    name: 'name',
    age: 18
}
// 合并接口同名属性类型不兼容，合并属性就是合并原子类型的交叉类型，即 never
type IntersectionTypeConfict = { id: number, name: string } & { age: number, name: number }
const minxedConflict:IntersectionTypeConfict = {
    id: 1,
    name: 2,
    age: 2
}
// 如果同名属性的类型兼容，比如一个 number，一个 number 的子类型、数字字面量类型，合并后的属性类型就是
// 两者中的子类型
type IntersectionTypeConfict2 = {id: number, name: 2} & {age: number, name: number}
let minxedConflict2: IntersectionTypeConfict2 = {
    id: 1,
    name: 2,
    age: 2
}
minxedConflict2 = {
    id: 1,
    name: 22,
    age: 2
}

// 合并联合类型, 提取所有联合类型的相同类型成员，合并联合类型理解为求交集
type UnionA = 'px' | 'em' | 'rem' | '%'
type UnionB = 'vh' | 'em' | 'rem' | 'pt'
type IntersectionUnion = UnionA & UnionB
const intersectionA: IntersectionUnion = 'em'
const intersectionB: IntersectionUnion = 'pt'
// 既然求交集，如果多个联合类型中没有相同的类型成员，交叉出来的类型自然然就是 never, 不能把任何类型的值赋予 IntersectionUnionE
type UnionC = 'em' | 'rem'
type UnionD = 'px' | 'pt'
type IntersectionUnionE = UnionC & UnionD
const intersectionE: IntersectionUnionE = 'any' as any

// 联合、交叉组合
// 类型缩减，如果将 string 远离类型和 string 字面量类型组合成联合类型，效果就是类型缩减成 string
// TypeScript 对这样场景做了缩减，它把字面量类型、枚举成员类型缩减掉，只保留原始类型、枚举类型等父类型
type URStr = 'string' | string
type URNum = 2 | number
type URBoolen = true | boolean
enum EnumUR {
    ONE,
    TWO
}
type URE = EnumUR.ONE | EnumUR
// 这种缩减极大地削弱了IDE自动提示的能力,类型被缩减为 string, 所有字符串字面量 balck、red 等无法自动提示出来
type BorderColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | string
// TypeScript 提供给父类型添加“&{}”让类型缩减被控制
type BorderColor2 = 'black' | 'red' | 'green' | 'yellow' | 'blue' | string & {}
let color: BorderColor2 = 'yellow'
// 当联合类型的成员是接口类型，如果满足其中一个接口的属性是另外一个接口属性的子集，这个属性也会类型缩减
type UnionInterce = | { age: '1'} | ({ age: '1' | '2', [key: string]: string })