// 이렇게도
const func = () => {/** logic */};
module.exports = func;
  
// 이렇게도 가능
const object = {
    key: value,
    key2: value,
    method: function () {
        //...
    },
};
module.exports = object

// const moduleName = require("file path")