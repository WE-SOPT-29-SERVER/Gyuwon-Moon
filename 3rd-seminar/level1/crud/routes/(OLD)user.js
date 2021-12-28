const express = require("express");
const router = express.Router();

const util = require("../lib/util");
const responseMessage = require("../constants/responseMessage");
const statusCode = require("../constants/statusCode");

const users = require("../dbMockup/user")

/* 
sign up
METHOD : POST
URI : localhost:3000/user/signup
REQUEST BODY : name, password, email
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : All User Data
*/

// router.METHOD("path", (req, res) => { ...  }); 
router.post("/signup", async (req, res) => {
    // const email = req.body.email;
    // const name = req.body.name;
    // const password = req.body.password;

    // 비구조화 할당 (Destructuring Assignment), 위 코드와 동일
    const { email, name, password } = req.body;

    // 이름도 자유롭게 변경 가능
    // const { email: myEmail, name: myName, password: myPassword } = req.body;

    //  request data 확인 - 네 개 중 하나라도 없다면 Bad Request 반환
    if (!email || !name || !password) { // truthy-falsy
        // return res.status(400).send({ status: 400, message: "BAD REQUEST" })
        // return res.status(400).send(util.fail(400, "BAD REQUEST"));
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(
                statusCode.BAD_REQUEST, 
                responseMessage.NULL_VALUE
            )
        );
    }

    // 해당 email을 가진 유저가 이미 있을 경우 Already Email 반환
    // filter는 주어진 조건을 만족하는 새로운 배열을 반환
    const alreadyUser = users.filter(obj => obj.email === email).length > 0;
    if (alreadyUser) { // 409: conflict
        // return res.status(409).send({ status: 409, message: "ALREADY EMAIL" });
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(
                statusCode.BAD_REQUEST, 
                responseMessage.ALREADY_EMAIL
            )
        );
    }
    
    const newUser = {
        id: users.length + 1,
        name,
        password,
        email,
    };

    users.push(newUser)

    res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMessage.CREATED_USER, newUser)
    )
});


/* 
login
METHOD : POST
URI : localhost:3000/user/login
REQUEST BODY : email, password
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 비밀번호를 제외한 User 정보
*/

router.post("/login", async (req, res) => {
    // request body에서 데이터 가져오기
    const { email, password } = req.body;

    // request data 확인 - 없다면 Null Value 반환
    if (!email || !password) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE)
        );
    }

    // 존재하는 유저인지 확인 - 없다면 No user 반환
    const user = users.filter(user => user.email === email)[0];
    
    if (!user) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER)
        );
    }
    
    // 비밀번호 확인 - 틀렸다면 Missmatch password 반환
    if(user.password !== password) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW)
        );
    }

    // 성공 - login success와 함께 비밀번호를 제외한 유저 정보 반환
    const data = {
        id: user.id,
        email: user.email,
        name: user.name,
    };

    res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, data)
    )

});


/* 
get profile
METHOD : GET
URI : localhost:3000/user/profile/:id
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 비밀번호를 제외한 User 정보
*/

router.get("/profile/:id", async (req, res) => {
    // request params에서 데이터 가져오기
    const { id }  = req.params;

    if(!id) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE)
        );
    }
    
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    const alreadyId = users.filter(user => user.id === Number(id))[0]

    if(!alreadyId) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER)
        )
    }

    // 성공 - read profile success와 함께 비밀번호를 제외한 유저 정보 반환
    const data = {
        id: id,
        email: alreadyId.email,
        name: alreadyId.name
    }

    res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMessage.READ_PROFILE_SUCCESS, data)
    )
})


/* 
update profile
METHOD : PUT
URI : localhost:3000/user/:id
REQUEST BODY : newName
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 업데이트된 User 정보
*/

router.put("/:id", async (req, res) => {
    // request params, body에서 데이터 가져오기
    const { id } = req.params;
    const { newName } = req.body;

    // request data 확인 - 없다면 Null Value 반환
    if(!id || !newName) {
        return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
    }

    // 존재하는 유저인지 확인 - 없다면 No user 반환
    const existingUser = users.filter(user => user.id === Number(id))[0]

    if(!existingUser) {
        return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER))
    }

    // 성공 - user update success와 함께 업데이트된 유저 정보 반환
    const updatedUser = { ...existingUser, name: newName }

    res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMessage.USER_UPDATE_SUCCESS, updatedUser)
    )
})


/* 
delete user
METHOD : DELETE
URI : localhost:3000/user/:id
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 삭제 후 유저 정보
*/

router.delete("/:id", async (req, res) => {
    // request params에서 데이터 가져오기
    const { id } = req.params;

    // request data 확인 - 없다면 Null Value 반환
    if(!id) {
        return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
    }

    // 존재하는 유저인지 확인 - 없다면 No user 반환
    const existingUser = users.filter(user => user.id === Number(id))[0]

    if(!existingUser) {
        return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER))
    }

    // 성공 - user delete success와 함께 삭제 후 유저 정보 반환
    const newUsers = users.filter(user => user.id !== Number(id))

    res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMessage.USER_DELETE_SUCCESS, newUsers)
    )
})

module.exports = router;