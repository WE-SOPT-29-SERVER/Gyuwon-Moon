SELECT * FROM "user";

-- "user" 데이터의 개수
SELECT COUNT(*) FROM "user";

-- 둘의 차이를 비교해보세요~
SELECT username FROM "user" ORDER BY username;
SELECT username FROM "user" ORDER BY username DESC;
SELECT username, email FROM "user" WHERE id=5;

-- INSERT 의 두 가지 방법 비교해보기
INSERT INTO "user" (username, id_firebase, email, phone) VALUES ('Anne', 'sA75idsd34E', 'Anne@sopt.org', '010-738-8304');
-- 필수 데이터를 다 넣어주었을 때에만 가능
INSERT INTO "user" VALUES ('22', 'Conan@sopt.org', 'h43Dgbg68fDF23', 'Conan', '010-766-2514');

-- 특정 id를 갖고 있는 사용자의 이름 바꾸기
UPDATE "user" SET username='gngsn' WHERE id=3;
SELECT * FROM "user" WHERE id=3;

-- 특정 id를 갖고 있는 사용자를 지우기
DELETE FROM "user" WHERE id=3;
SELECT * FROM "user" WHERE id=3;