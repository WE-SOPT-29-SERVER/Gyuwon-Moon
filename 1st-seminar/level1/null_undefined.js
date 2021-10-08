let nothing = null;
console.log(`nothing : ${nothing}, type: ${typeof nothing}`); // object

let x;
console.log(`x: ${x}, type ${typeof x}`); // undefined


console.log(typeof 1) // number
console.log(typeof "str") // string
console.log(typeof true) // boolean
console.log(typeof undefined) // undefined
console.log(typeof Symbol()) // symbol
console.log(typeof null) // object (JS 버그)


console.log("null vs undefined");

// 동등 연산자
console.log("null == undefined", null == undefined) // true

// 일치 연산자
console.log("null === undefined", null === undefined) // false