const fs = require("fs");
const crypto = require("crypto");

const password = fs.readFileSync('password.txt').toString();
const hashed = crypto.createHash("sha512").update(password).digest("base64");

fs.writeFileSync('hashed.txt', hashed);