hoistFunction();

function hoistFunction() {
    console.log(x)
    var x = "var";
    console.log(x)
}

// 실행 결과
// undefined
// var