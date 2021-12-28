const num1 = 1;
const num2 = 2;

const str = "2";

// 2 -> "2"

const bool = true;


// true == 1
// false == 0 (1이 아님)

console.log(num1 == bool) // true
// 1 -> true

console.log(num2 == bool) // false, 값이 다름
// 2 -> false


// Truthy or Falsy한 값
// -> Boolean으로 타입캐스팅해서 값 존재 여부를 간편하게 검사할 수 있음

// 예시
const post = await postsGet()
if(!post){

}


//Truthy
// 대충 true다 (이런 느낌)
// ex) true, 10, -41, '문자'
console.log(Boolean(true)) // true, 정수임
console.log(Boolean(10)) // true
console.log(Boolean(-41)) // true
console.log(Boolean('문자')) // true
console.log(Boolean({})) // 빈 객체, true (객체 타입이기 때문에)
console.log(Boolean([])) // 빈 배열, true (객체 타입이기 때문에)


//Falsy
// 대충 false다
// ex) false, 0, null, undefined, ''(빈스트링)
console.log(Boolean(0)) // false
console.log(Boolean(undefined)) // false
console.log(Boolean(null)) // false
console.log(Boolean("")) // false
console.log(Boolean(false)) // false



// postgresql
// 쿼리문 짤 때 undefined 쓰지 말기
const query1 = 
`
    UPDATE post
    SET name = ${null} // NULL
    WHERE id = 1
`

const query2 = 
`
    UPDATE post
    SET name = ${undefined} // Error or 기존값
    WHERE id = 1
`