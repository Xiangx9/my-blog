interface Person {
    readonly id: number; //readonly 定义只读属性
    name: string;
    age?: number;  // 可选属性§
    admin:Boolean;
    [propName: string]: any; //任意属性
}
 
let tom: Person = {
    id: 991020,
    name: 'Tom',
    admin:true,
    gender: '新增'
};

tom.go = '添加';

console.log(tom);


let fibonacci: any[] = [1, 1, 2, 3, 5];
// let fibonacci: Array<number> = [1, 1, 2, 3, 5];
console.log(fibonacci);

interface Person1 {
    readonly id: number; //readonly 定义只读属性
    name: string;
    age?: number;  // 可选属性§
    admin:Boolean;
    [propName: string]: any; //任意属性
}

let tom1: any[number] = [25,'22',33];
console.log(tom1);

function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 'x'); // ['x', 'x', 'x']





















