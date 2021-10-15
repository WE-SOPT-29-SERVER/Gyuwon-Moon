// 파일 경로
// './' === 현재 파일과 같은 위치
// '/'=== 루트 경로
// .과 / 둘다 없음 === 내장 모듈( 경로지정X )

const sum = require("./sum") // .js 안 붙임
const calculator = require("./calculator")

const result = sum(1, 3);
console.log("sum result: ", result)


console.log("add result: ", calculator.add(1, 3))
console.log("subtract result: ", calculator.subtract(1, 3))
console.log("multiply result: ", calculator.multiply(1, 3))
console.log("divide result: ", calculator.divide(1, 3))