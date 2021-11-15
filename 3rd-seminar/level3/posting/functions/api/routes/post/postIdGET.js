const util = require("../../../lib/util");
const responseMessage = require("../../../constants/responseMessage");
const statusCode = require("../../../constants/statusCode");

const postings = require("../../../dbMockup/postings")

/* 
get posting
METHOD : GET
URI : localhost:3000/post/:id
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 게시글 정보
*/

module.exports = async (req, res) => {
    // request params에서 데이터 가져오기
    const { id }  = req.params;

    if(!id) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE)
        );
    }

    // 존재하는 아이디인지 확인 - 없다면 No posting 반환
    const alreadyId = postings.filter(posting => posting.id === Number(id))[0]

    if(!alreadyId) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POSTING)
        )
    }

    // 성공 - read posting success와 함께 게시글 정보 반환
    const data = alreadyId

    res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMessage.READ_POSTING_SUCCESS, data)
    )
}