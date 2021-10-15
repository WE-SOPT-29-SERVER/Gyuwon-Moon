// Two functions that return promise
// '함수명: 인자'를 반환
let asyncFunc1 = msg => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`func1: ${msg}`);
    }, 1000);
  });
};

let asyncFunc2 = msg => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`func2: ${msg}`);
    }, 2000);
  });
};

// Promise
const promiseMain = () => {
  asyncFunc1("Hello")
    .then(result => {
      console.log(result);
      return asyncFunc2("world");
    })
    .then(result => {
      console.log(result);
    });
};

// Async & Await
const asyncMain = async () => {
  let result = await asyncFunc1("Hello");
  console.log(result);

  result = await asyncFunc2("world");
  console.log(result);
};

// 라면 함수
// async & await ver
const asyncRamen = async () => {
  const step1 = await ramenRecipe();
  const step2 = await boilWater(step1);
  const step3 = await putTheRamenAndSoupPowder(step2);
  const finish = await delayThreeMinutes(step3);
  console.log(finish);
};