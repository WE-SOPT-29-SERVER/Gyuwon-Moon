const dotenv = require('dotenv');
dotenv.config(); // '.env' 파일을 자동으로 인식해서 환경변수를 설정해줌

module.exports = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PASSWORD,
};