{
    let str: string = 'this is string'
    let num:number = 1
    let bool:boolean = true
}


// 
{
    const str: string = 'this is string'
    const num:number = 1
    const bool:boolean = true
}

// 在 TypeScript 中，字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型
 // TypeScript 存在三种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型
 // 'this is string' 字符串字面量类型是 'string' 类型的子类型
{
    let specifiedStr: 'this is string' = 'this is string'
    let str: string = 'any string'
    str = specifiedStr
    specifiedStr = str
}
// 字符串字面量类型
// 通过使用字面量类型的联合类型，可以限制函数的参数为指定的字面量类型集合
type Direction = 'up' | 'down'
function move(dir: Direction) {}
move('up')
move('right')

// Literal Widening 字面量类型的拓宽
// 所有通过 let 或 var 定义的变量、函数的形参、对象的非只读属性，如果满足制定了初始值且未显式添加
// 类型注解的条件，那么它们推断出来的类型就是指定的初始值字面量类型拓宽后的类型，这就是字面量类型拓宽
{
    let str = 'this is string'
    let strFun = (str = 'this is string') => str
    const specifiedStr = 'this is string'
    let str2 = specifiedStr
    let strFun2 = (str = specifiedStr) => str
}

// 字面量类型推断，let 声明根据属性值父类型推断出变量类型。const 声明字面量类型等于属性值