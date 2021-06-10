// Interface 接口类型
function Study(language: { name:string; age: () => number }) {
    console.log(`ProgramLanguage ${language.name} created ${language.age()} years ago`)
}
Study({
    name: 'TypeScript',
    age: () => new Date().getFullYear() - 2012
})

// 定义接口
interface ProgramLanguage {
    name: string;
    age: () => number
}

function NewStudy(language: ProgramLanguage) {
    console.log(`ProgramLanguage ${language.name} created ${language.age()} years ago`)
}

let TypeScript: ProgramLanguage
TypeScript = {
    name: 'TypeScript',
    age: () => new Date().getFullYear() - 2012
}

// TypeScript = {}
// 可缺省属性
// 当属性被标注为可缺省后，它的类型就变成了显式指定的类型与 undefined 类型组成的联合类型
// age 属性变为 (() => number) | undefined
interface OptionalProgramLanguage {
    name: string,
    age?: () => number
}
let OptionalTypeScript: OptionalProgramLanguage = {
    name: 'TypeScript'
}

// 只读属性
interface ReadOnlyProgramLanguage {
    readonly name: string,
    readonly age: (() => number) | undefined
}
let ReadOnlyTypeScript: ReadOnlyProgramLanguage = {
    name: 'TypeScript',
    age: undefined
}
ReadOnlyTypeScript.name = 'JavaScript'

// 定义函数类型
interface StudyLanguage {
    (language: ProgramLanguage): void
}
let StudyInterface: StudyLanguage = language => console.log(`${language.name}${language.age()}`)

// 索引签名
// 使用索引签名处理对象映射结构，并通过“[索引名：类型]”的格式约束索引类型
interface LanguageRankInterface {
    [rank: number]: string
}
interface LanguageYearInterface {
    [rank: string]: number
}
let LanguageRankMap: LanguageRankInterface = {
    1: 'TypeScript',
    2: 'JavaScript',
    'WrongIndex': '2012'
}
let LanguageMap: LanguageYearInterface = {
    TypeScript: 2012,
    JavaScript: 1995,
    1: 1970
}

interface StringMap {
    age: number,
    name: string
    [prop: string]: number | string,
}

// 继承与实现
interface DynamicLanguage extends ProgramLanguage {
    rank: number
}
interface TypeSafeLanguage extends ProgramLanguage {
    typeChecker: string
}
interface TypeScriptLanguage extends DynamicLanguage, TypeSafeLanguage {
    name: 'TypeScript'
}