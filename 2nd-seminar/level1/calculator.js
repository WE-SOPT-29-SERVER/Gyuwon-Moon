const calculator = {
    "add": function (a, b) {
        return a + b;
    },
    "subtract": function (a, b) {
        return a - b;
    },
    "multiply": function (a, b) {
        return a * b;
    },
    "divide": function (a, b) {
        return a / b;
    },
}

// ------다른 방법---------
const add = () => {};
const subtract = () => {};
const multiply = () => {};
const divide = () => {};

// JS 객체 정의시 key와 value의 이름이 같으면 value 생략 가능
const calculator = {
    add, // 원래는 add: add 형태로 key-value 쌍이어야함
    subtract,
    multiply,
    divide,
};

module.exports = calculator;