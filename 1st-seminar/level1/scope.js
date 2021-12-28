//함수가 없는 경우는 파일 전체를 함수라고 보면 됨

// (1) Function Scope
// if문(block) 밖에서 접근 가능

// var
if (true) {
    var x = "var";
}

console.log(`var: ${x}`); // var: var


// 해당 function 벗어나면 접근 불가
function colorFunction () {
    if (true) {
        var color = "blue";
        console.log(color) // blue
    }
    console.log(color); // blue
}

colorFunction();
console.log(color); // Error, 출력 X


// (2) Block Scope
// if문(block) 밖에서 접근 불가능

// let or const
if (true) {
    let y = "let"
    const z = "const"

    console.log(`let: ${y}`); // let: let
    console.log(`const: ${z}`); // const: const
}

console.log(`let: ${y}`); // Error, 출력 x
console.log(`const: ${z}`); // Error, 출력 x


// for문 Scope 예시

const arr = [1, 2, 3]

for(var i = 0; i < arr.length; i++) {

}

const arr2 = [4, 5, 6]

// var는 function scope이므로, 위 for문의 i값이 영향을 미침
for(var i = 0; i < arr.length; i++) {
    
}


const arr3 = [1, 2, 3]

for(let i = 0; i < arr.length; i++) {

}

const arr4 = [4, 5, 6]

// let은 block scope이므로, 위 for문의 i값과 독립적
for(let i = 0; i < arr.length; i++) {
    
}