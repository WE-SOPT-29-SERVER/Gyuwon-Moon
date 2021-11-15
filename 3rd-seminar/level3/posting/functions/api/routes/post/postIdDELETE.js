const util = require("../../../lib/util");
const responseMessage = require("../../../constants/responseMessage");
const statusCode = require("../../../constants/statusCode");

const postings = require("../../../dbMockup/postings")

/* 
delete posting
METHOD : DELETE
URI : localhost:3000/post/:id
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 삭제 후 게시글 정보
*/

module.exports = async (req, res) => {
    // request params에서 데이터 가져오기
    const { id } = req.params;

    // request data 확인 - 없다면 Null Value 반환
    if(!id) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE)
        )
    }

    // 존재하는 게시글인지 확인 - 없다면 No posting 반환
    const existingPosting = postings.filter(posting => posting.id === Number(id))[0]

    if(!existingPosting) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POSTING)
        )
    }

    // 성공 - posting delete success와 함께 삭제 후 유저 정보 반환
    const newPostings = postings.filter(posting => posting.id !== Number(id))

    res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMessage.POSTING_DELETE_SUCCESS, newPostings)
    )
}