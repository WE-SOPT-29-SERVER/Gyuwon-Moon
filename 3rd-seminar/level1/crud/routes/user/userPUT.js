const util = require("../../lib/util");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

const users = require("../../dbMockup/user")

module.exports = async (req, res) => {
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
}