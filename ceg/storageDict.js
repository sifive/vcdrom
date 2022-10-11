let storageDict = {};
let storageID = {};

let storeInto = (id, dataValue) => {
  storageDict[id] = dataValue;
  // process the last duration to calculate

  // console.log(storageDict);
};

let returnStorage = () => {
  return storageDict;
};

module.exports = { storeInto, returnStorage };
