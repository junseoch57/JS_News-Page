// try catch
let weight = 60;
try{
    // 소스코드를 쓴다
    // 이 안에서 에러 발생하면
    noona

    if(weight<30){
        throw new Error("당신은 너무 말랐어") // throw : 에러를 강제로 발생시킴
    }

}catch(error){ //매개변수는 error로
    // catch가 에러를 잡아준다
    console.log("내가 잡은 에러는", error.message); // 내가 잡은 에러는 noona is not defined
}

// 에러를 핸들링 하고 싶으면 소스코드를 try안에 쓸 것