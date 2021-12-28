const num = 1
const str = '1'

// 동등 연산자: 값만 비교
// == equal
// != not equal

console.log(num == str); // true

// 타입 캐스팅
// 숫자 == 문자 -> 문자 == 문자
// 1 == "1" -> "1" == "1"
console.log(num + str); // 11 ("1"+"1")
console.log(typeof (num + str)); // string

console.log(Number(num) + Number(str)); // 2
console.log(typeof(Number(num) + Number(str))); // number

// 일치 연산자: 값 & 타입 비교
// === equal
// !== not equal

console.log(num === str); // false