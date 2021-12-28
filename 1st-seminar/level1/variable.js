// (1) 재선언

// var: 재선언 가능
var variableVar = "123";
var variableVar = "321"; // 같은 변수명 재선언 가능

console.log("variableVar", variableVar); // 321

// let: 재선언 불가
let variableLet = "123";
let variableLet = "321"; // Error 발생, 재선언 불가능

console.log("variableLet", variableLet);
// SyntaxError: Identifier 'variableLet' has already been declared

// const: 재선언 불가
const variableConst = "123";
const variableConst = "321"; // Error 발생, 재선언 불가능

console.log("variableConst", variableConst);
// SyntaxError: Identifier 'variableConst' has already been declared


// (2) 재할당

// var: 재할당 가능
var variableVar = "123";
variableVar = "321";

console.log("variableVar", variableVar); // 321

// let: 재할당 가능
var variableLet = "123";
variableLet = "321";

console.log("variableLet", variableLet); // 321

// const: 재할당 불가
var variableConst= "123";
variableConst = "321";

console.log("variableConst", variableConst); // Error


// (3) 초기화

// var or let: 초기화 값 필요 X
var someVar;
let someLet;


// const: 초기화 값 필요 O
const someConst; // Error
// 실행 전에는 에디터에서 에러 알 수 X -> ESLint 활용하자!