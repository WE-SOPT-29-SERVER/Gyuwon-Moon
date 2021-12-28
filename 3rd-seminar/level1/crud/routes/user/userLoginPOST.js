const util = require("../../lib/util");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

const users = require("../../dbMockup/user")

module.exports = async (req, res) => {
    const { email, password } = req.body;

    //  request data 확인
    if (!email || !password) {
        return res
        .status(statusCode.BAD_REQUEST)
        .send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE)
        );
    }

    // 존재하는 유저인지 확인
    const user = users.filter(user => user.email === email)[0];
    
    if (!user) {
        return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }
    
    if(user.password !== password) {
        return res
        .status(statusCode.BAD_REQUEST)
        .send(
            util.fail(
                statusCode.BAD_REQUEST,
                responseMessage.MISS_MATCH_PW
            )
        );
    }

    const data = {
        id: user.id,
        email: user.email,
        name: user.name,
    };

    res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, data)
    )

}