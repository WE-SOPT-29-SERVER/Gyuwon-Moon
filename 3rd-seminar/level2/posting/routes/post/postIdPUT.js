const util = require("../../lib/util");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

const postings = require("../../dbMockup/postings")

/* 
update posting
METHOD : PUT
URI : localhost:3000/post/:id
REQUEST BODY : newTitle, newContent
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 업데이트된 Posting 정보
*/

module.exports = async (req, res) => {
    // request params, body에서 데이터 가져오기
    const { id } = req.params;
    const { newTitle, newContent } = req.body;

    // request params 확인 - 없다면 Null Value 반환
    if(!id) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE)
            )
    }
    
    // request body 확인 - 모두 없다면 Null Value 반환
    if(!newTitle && !newContent) {
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

    // 성공 - posting update success와 함께 업데이트된 유저 정보 반환
    let updatedPosting

    if(!newTitle) { // 내용만 수정한 경우
        updatedPosting = { ...existingPosting, content: newContent }
    } else if(!newContent) { // 제목만 수정한 경우
        updatedPosting = { ...existingPosting, title: newTitle }
    } else {
        updatedPosting = { ...existingPosting, title: newTitle, content: newContent }
    }

    res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMessage.POSTING_UPDATE_SUCCESS, updatedPosting)
    )
}