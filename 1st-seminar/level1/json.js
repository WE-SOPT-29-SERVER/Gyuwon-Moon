// JSON은 JS에서 객체를 표현하는 '형식'임
// -> 조금더 확장해서, JSON 확장자를 가진 파일을 만들 수 있음


// JSON 방식으로 작성된 JS객체임
/* -------------------- */
/*   1. JSON 객체 실습    */
/* -------------------- */

const sopt = {
    name: "WE SOPT",
    slogan: "우리가 SOPT입니다",
    part: ["plan", "design", "android", "iOS", "server", "web"],
    number: 199,
    printName: function () {
      console.log("name : ", this.name);
    },
    printNum: function () {
      console.log("number : ", this.number);
    },
  };
  
  console.log("typeof sopt : " + typeof sopt); // object
  
  // + 와 , 의 차이가 무엇인지 직접 작성하면서 알아보세요 ~.~
  console.log("sopt : " + sopt); // sopt: [object object]
  console.log("sopt : ", sopt); // sopt: { name: 'WE SOPT', ... }
  console.log("sopt :" + JSON.stringify(sopt));
  
  sopt.printName();
  sopt.number = 190;
  sopt.printNum();
  
  /* -------------------- */
  /*   2. JSON 배열 실습    */
  /* -------------------- */
  
  const dogs = [
    { name: "식빵", family: "웰시코기", age: 1, weight: 2.14 },
    { name: "콩콩", family: "포메라니안", age: 3, weight: 2.5 },
    { name: "두팔", family: "푸들", age: 7, weight: 3.1 },
  ];
  
  console.log("dogs : " + dogs);
  console.log("dogs : ", dogs);
  console.log("dogs :" + JSON.stringify(dogs));
  
  dogs.forEach(dog =>
    console.log(
      dog.name +
        "이는 종이 " +
        dog.family +
        "이고, 나이가 " +
        dog.age +
        "세입니다 ~",
    ),
  );