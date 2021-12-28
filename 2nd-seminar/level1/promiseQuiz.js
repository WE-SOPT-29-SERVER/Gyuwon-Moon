const members = require("./members")

const getOnline = members => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = members.filter(o => o.location === "online");
        resolve(data);
      }, 500);
    });
};
  
const getOffline = members => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = members.filter(o => o.location === "offline");
        resolve(data);
      }, 500);
    });
};
  
const getYB = members => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = members.filter(o => o.group === "YB");
        resolve(data);
      }, 500);
    });
};
  
const getOB = members => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = members.filter(o => o.group === "OB");
        resolve(data);
      }, 500);
    });
};

getOnline(members).then(getOB).then(console.log);
getYB(members).then(x => getOffline(x)).then(console.log);

// async & await
const asyncFunc1 = async members => {
    const onlineMembers = await getOnline(members);
    const onlineObMembers = await getOB(onlineMembers);
    console.log(onlineObMembers);
};
  
asyncFunc1(members);

const asyncFunc2 = async members => {
    const YbMembers = await getYB(members);
    const offlineYbMembers = await getOffline(YbMembers);
    console.log(offlineYbMembers);
};
  
asyncFunc2(members);