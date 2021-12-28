const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllUsers = async (client) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE is_deleted = FALSE
    `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

const getUserById = async (client, userId) => {
  const { rows } = await client.query( // 항상 배열
    `
    SELECT * FROM "user" u
    WHERE id = $1
      AND is_deleted = FALSE
    `,
    // client.query()의 두 번째 파라미터에는, 쿼리문에 집어넣고 싶은 변수들의 배열을 적습니다.
    // $1에는 배열의 첫번째 변수가, $2에는 배열의 두 번째 변수... 이런 식으로 쿼리문에 변수가 들어가게 됩니다!
    [userId],
  );
  // 위의 getAllUsers와는 달리, 이번에는 유저 하나만 가져오고 싶기 때문에 rows[0]만 리턴해 줍니다.
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const updateUser = async (client, userId, username, phone) => {
    // 1. 원래 객체를 먼저 불러옴
    const { rows: existingRows } = await client.query(
      `
      SELECT * FROM "user"
      WHERE id = $1
         AND is_deleted = FALSE
      `,
      [userId],
    );
  
    if (existingRows.length === 0) return false; //기존의 유저 객체가 없는 경우
  
    // 2. 원래 객체와 새로운 객체 머지 -> lodash 사용
    // merge(새로운 객체, 기존 객체, 새로운 객체1, 새로운 객체2, ...)
    // { username, phone }에서 phone이 없는 경우 자동으로 phone은 남기고 username만 새로운 값으로 갱신
    const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), { username, phone });
  
    const { rows } = await client.query(
      `
      UPDATE "user" u
      SET username = $1, phone = $2, updated_at = now()
      WHERE id = $3
      RETURNING * 
      `,
      [data.username, data.phone, userId],
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
  };

  // soft delete
  const deleteUser = async (client, userId) => {
    const { rows } = await client.query(
      `
      UPDATE "user" u
      SET is_deleted = TRUE, updated_at = now()
      WHERE id = $1
      RETURNING *
      `,
      [userId],
    );
  
    return convertSnakeToCamel.keysToCamel(rows[0]);
  };

  const addUser = async (client, email, username, phone, idFirebase) => {
    const { rows } = await client.query(
      `
      INSERT INTO "user"
      (email, username, phone, id_firebase)
      VALUES
      ($1, $2, $3, $4)
      RETURNING *
      `,
  
      [email, username, phone, idFirebase],
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
  };

  const getUserByIdFirebase = async (client, idFirebase) => {
    const { rows } = await client.query(
      `
      SELECT * FROM "user" u
      WHERE id_firebase = $1
        AND is_deleted = FALSE
      `,
      [idFirebase],
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
  };

// const getUserByEmail = async (client, email) => {
//   const { rows } = await client.query(
//     `
//     SELECT * FROM "user" u
//     WHERE email = $1
//       AND is_deleted = FALSE
//     `,
//     [email],
//   );
//   return convertSnakeToCamel.keysToCamel(rows[0]);
// };

module.exports = { getAllUsers, getUserById, updateUser, deleteUser, addUser, getUserByIdFirebase };