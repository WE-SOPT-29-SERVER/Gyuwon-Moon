const util = require("../../../lib/util");
const responseMessage = require("../../../constants/responseMessage");
const statusCode = require("../../../constants/statusCode");

const postings = require("../../../dbMockup/postings")

/* 
get postings
METHOD : GET
URI : localhost:3000/post
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : All Postings Data
*/

module.exports = async (req, res) => {
    const data = postings

    res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMessage.READ_ALL_POSTING_SUCCESS, data)
    )
}