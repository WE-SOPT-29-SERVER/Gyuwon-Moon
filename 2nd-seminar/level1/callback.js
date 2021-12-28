// 비동기식 callback [setTimeout]
console.log("Hello");

setTimeout(function () {
  console.log("Bye");
}, 3000);

console.log("Hello again");


//  동기식 callback
function print() {
  console.log("print");
}

function printImmediately(print) {
  print();
}

printImmediately(print);


// callback 함수의 문제점 - callback hell
function cook(callback, timeout) {
  setTimeout(callback, timeout);
}

cook(function () {
  cook(function ramenRecipe() {
    console.log("[라면 진행상황");
    cook(function boilWater() {
      console.log("[라면] - 1. 물 끓이기 완료");
      cook(function putTheRamenAndSoupPowder() {
        console.log("[라면] -  2. 라면과 스프 넣기 완료, 앞으로 3분 간 끓이기");
        cook(function delayThreeMinutes() {
          console.log("[라면] - 3. 3분 간 대기 완료, 라면 완성");
        }, 3000);
      }, 500);
    }, 2000);
  }, 1000);
}, 0);