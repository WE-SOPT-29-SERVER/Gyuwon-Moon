const util = require("../../../lib/util");
const responseMessage = require("../../../constants/responseMessage");
const statusCode = require("../../../constants/statusCode");

const postings = require("../../../dbMockup/postings")

/* 
create posting
METHOD : POST
URI : localhost:3000/post
REQUEST BODY : title, content
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : All Posting Data
*/

module.exports = async (req, res) => {
    const { title, content } = req.body;

    //  request body가 잘못됐을 때
    if (!title || !content ) { 
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE)
        );
    }
    
    const newPosting = {
        id: postings.length + 1,
        title,
        content
    };

    res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMessage.CREATED_POSTING, newPosting)
    )
}