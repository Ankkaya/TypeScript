// enum 也是一种比较特殊的类型，因为它兼具值和类型于一体，有点类似 class (在定义 class 结构时，其实我们也自动定义了 class 实例的类型)
{
    enum Day {
        SUNDAY,
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY
    }
}
// JavaScript 转译后的结果
{
    var Day2 = void 0;
    (function (Day2) {
        Day2[Day2["SUNDAY"] = 0] = "SUNDAY";
        Day2[Day2["MONDAY"] = 1] = "MONDAY";
        Day2[Day2["TUSEDAY"] = 2] = "TUSEDAY";
        Day2[Day2["WEDNESDAY"] = 3] = "WEDNESDAY";
        Day2[Day2["THURSDAY"] = 4] = "THURSDAY";
        Day2[Day2["FRIDAY"] = 5] = "FRIDAY";
        Day2[Day2["SATURDAY"] = 6] = "SATURDAY";
    })(Day2 || (Day2 = {}))
}

// 数字枚举
// 字符串枚举, 定义值是字符串字面量的枚举称之为字符换枚举
{
    enum Day {
        SUNDAY = 'SUNDAY',
        MONDAY = 'MONDAY'
    }
}
// 转义后
{
    var Day = void 0;
    (function (Day) {
        Day['SUNDAY'] = 'SUNDAY'
        Day['MONDAY'] = 'MONDAY'
    })
}

// 异构枚举
{
    enum Day {
        SUNDAY = 'SUNDAY',
        MONDAY = 2
    }
}

// 常量成员和计算（值）成员
enum FileAccess {
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // 计算成员
    G = '213'.length
}

// 枚举成员类型和联合枚举
enum Day3 {
    SUNDAY,
    MONDAY
}
enum MyDay {
    SUNDAY,
    MONDAY = Day3.MONDAY
}
const mondayIsDay: Day3.MONDAY = Day3.MONDAY
const mondayIsSunday = MyDay.SUNDAY
const mondayIsMyDay2: MyDay.MONDAY = MyDay.MONDAY

// 如果枚举仅有一个成员且是字面量成员，那么这个成员的类型等于枚举类型
enum Day4 {
    MONDAY
}
export const mondayIsDay2: Day4 = Day4.MONDAY
export const mondayIsDay3: Day4.MONDAY = mondayIsDay2 as Day4

// 永远不会成立的条件(Dead Code)
enum Day5 {
    SUNDAY,
    MONDAY
}
const work = (x: Day5) => {
    if (x !== Day5.SUNDAY || x !== Day5.MONDAY) {}
}

// 类型推断、类型缩小
enum Day6 {
    SUNDAY,
    MONDAY
}
let SUNDAY = Day6.SUNDAY
const SUNDAY2 = Day6.SUNDAY
const work = (x: Day6) => {
    if (x === Day6.SUNDAY) {
        x // 类型缩小为 Day.SUNDAY
    }
}

// 常量枚举(const enums)
const enum Day7 {
    SUNDAY,
    MONDAY
}
const work7 = (d: Day7) => {
    switch (d) {
        case Day7.SUNDAY:
            return 'take a rest'
        case Day7.MONDAY:
            return 'work hard'
    }
}
// 外部枚举 ❓
declare enum Day7 {
    SUNDAY,
    MONDAY
}
const work8 = (x: Day7) => {
    if (x === Day7.SUNDAY) {
        x;
    }
}