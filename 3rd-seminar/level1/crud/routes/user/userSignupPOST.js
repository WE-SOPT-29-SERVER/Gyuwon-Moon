const util = require("../../lib/util");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

const users = require("../../dbMockup/user")

module.exports = async (req, res) => {
        // const something = req.query
    
        // 클라이언트에서 보내온 email, password
        // const email = req.body.email;
        // const name = req.body.name;
        // const password = req.body.password;
    
        // destructuring assignment 
        // 비구조화 할당
        // 위 코드와 동일
        const { email, name, password } = req.body;
    
        // 이름도 자유롭게 변경 가능
        // const { email: myEmail, name: myName, password: myPassword } = req.body;
    
        //  request body가 잘못됐을 때
        if (!email || !name || !password) { // truthy-falsy
            // return res.status(400).send({ status: 400, message: "BAD REQUEST" })
            // return res.status(400).send(util.fail(400, "BAD REQUEST"));
            return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST, 
                    responseMessage.NULL_VALUE
                )
            );
            }
    
        // 해당 email을 가진 유저가 이미 있을 때
        const alreadyUser = users.filter(obj => obj.email === email).length > 0; //filter는 배열을 반환
        // 409: conflict
        if (alreadyUser) {
            // return res.status(409).send({ status: 409, message: "ALREADY EMAIL" });
            return res
            .status(statusCode.BAD_REQUEST)
            .send(
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
    
        res.status(statusCode.OK).send(
            util.success(statusCode.OK, responseMessage.CREATED_USER, newUser)
        )
}