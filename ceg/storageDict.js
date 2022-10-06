let storageDict = {};
let storageID = {};

let storeInto = (id, dataValue) => {
  storageDict[id] = dataValue;
  // console.log(storageDict);
};

let returnStorage = () => {
  return storageDict;
};

module.exports = { storeInto, returnStorage };
