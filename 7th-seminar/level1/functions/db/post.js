const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllPosts = async (client) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "post" p
    WHERE is_deleted = FALSE
    `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

const getPostById = async (client, postId) => {
  const { rows } = await client.query( // 항상 배열
    `
    SELECT * FROM "post" p
    WHERE id = $1
      AND is_deleted = FALSE
    `,
    // client.query()의 두 번째 파라미터에는, 쿼리문에 집어넣고 싶은 변수들의 배열을 적습니다.
    // $1에는 배열의 첫번째 변수가, $2에는 배열의 두 번째 변수... 이런 식으로 쿼리문에 변수가 들어가게 됩니다!
    [postId],
  );
  // 위의 getAllPosts와는 달리, 이번에는 포스트 하나만 가져오고 싶기 때문에 rows[0]만 리턴해 줍니다.
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const updatePost = async (client, postId, title, content) => {
    // 1. 원래 객체를 먼저 불러옴
    const { rows: existingRows } = await client.query(
      `
      SELECT * FROM "post"
      WHERE id = $1
         AND is_deleted = FALSE
      `,
      [postId],
    );
  
    if (existingRows.length === 0) return false; //기존의 포스트 객체가 없는 경우
  
    // 2. 원래 객체와 새로운 객체 머지 -> lodash 사용
    // merge(새로운 객체, 기존 객체, 새로운 객체1, 새로운 객체2, ...)
    // { title, content }에서 content가 없는 경우 자동으로 content는 남기고 title만 새로운 값으로 갱신
    const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), { title, content });
  
    const { rows } = await client.query(
      `
      UPDATE "post" p
      SET title = $1, content = $2, updated_at = now()
      WHERE id = $3
      RETURNING * 
      `,
      [data.title, data.content, postId],
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
  };

  // soft delete
  const deletePost = async (client, postId) => {
    const { rows } = await client.query(
      `
      UPDATE "post" p
      SET is_deleted = TRUE, updated_at = now()
      WHERE id = $1
      RETURNING *
      `,
      [postId],
    );
  
    return convertSnakeToCamel.keysToCamel(rows[0]);
  };

  const addPost = async (client, userId, title, content) => {
      const { rows } = await client.query(
          `
          INSERT INTO "post"
          (user_id, title, content)
          VALUES
          ($1, $2, $3)
          RETURNING *
          `,
          [userId, title, content]
      );

      return convertSnakeToCamel.keysToCamel(rows[0]);
  }

module.exports = { getAllPosts, getPostById, updatePost, deletePost, addPost };