const util = require("../../lib/util");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

const users = require("../../dbMockup/user")

module.exports = async (req, res) => {
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
}