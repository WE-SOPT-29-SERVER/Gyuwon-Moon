// LEVEL 3

// members.js 데이터를 활용하여 랜덤으로 조 짜기
// 조건: OB, YB 비율 오차범위 최소한으로 유지

const members = require("./members") // 서버 파트 멤버들의 리스트

// 배열의 요소들을 랜덤으로 섞어주는 함수
const shuffleArray = (array) => {
    array.sort(()=> Math.random() - 0.5);
}

// YB 멤버들의 배열을 반환해주는 함수
const getYBmembers = (members) => {
    return members.filter(member => member.group === "YB")
}

// OB 멤버들의 배열을 반환해주는 함수
const getOBmembers = (members) => {
    return members.filter(member => member.group === "OB")
}

// members 배열의 사람들을 각 조당 {personNumber}명으로 분류해주는 함수
const buildTeam = (members, personNumber) => {
    
    // 1. 전체 팀 개수를 계산하기 ( 인원이 남는 경우 반올림 )
    const teamNumber = Math.ceil(members.length / personNumber)
    

    // 2. 전체 팀 개수만큼의 요소를 가지고 있는 2차원 배열 생성
    // [[],[],[], ... ,[]]
    const teams = []

    for(let i = 0; i < teamNumber; i++) {
        teams.push([])
    }


    // 3. YB, OB 멤버 각각의 리스트 얻기
    const YBMembers = getYBmembers(members)
    const OBMembers = getOBmembers(members)
    
    
    // 4. OB 멤버들을 먼저 teams 배열에 배치하기
    for(let i = 0; i < OBMembers.length; i++) {
        // 1조부터 차례차례 배치함
        // OB 인원이 전체 팀 개수를 넘는 경우, 다시 1조부터 차례차례 배치
        teams[i % teamNumber].push(OBMembers[i])
    }


    // 5. 남은 자리에 YB 멤버들 배치하기
    let j = 0
    
    for(let i = 0; i < YBMembers.length; i++) {
        // 해당 조가 모두 차면 다음 조로 이동
        if(teams[j].length === personNumber) j++
        
        teams[j].push(YBMembers[i])
    }

    return teams
}


// (1) 랜덤하게 조를 짜기 위해 members 배열 섞어줌
shuffleArray(members)

// (2) 각 조당 4명의 인원으로 팀빌딩
const teams = buildTeam(members, 4)

console.log(teams)

// O조: A, B, C, D 형태로 출력
for(let i = 0; i < teams.length; i++) {
    console.log(`${i+1}조: ${teams[i].map(obj => obj.name).join(", ")}`)
}