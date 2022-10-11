let s = require('./storageDict.js');
let widthDict = {};
let exeKey = 'executions';
let startTime = 'entryTime';
let y = 'duration';
let currentMax = 0;
let currentArray = {};
let i = 0;

let updateCurrentMax = (aNumber) => {
  currentMax = aNumber;
};

let calculateWidth = (id, dataValue, dataUrl) => {
  let totalTime;
  // console.log('this is data', dataValue);
  widthDict[id] = dataValue;

  // process the last duration to calculate
  obj = dataValue;
  last = obj[Object.keys(obj).length - 1];
  totalTime = last[startTime] + last[y];
  console.log('total time for each graph', totalTime);

  if (totalTime > currentMax) {
    currentMax = totalTime;
  }
  console.log('current max!@', currentMax);
  percentageF = totalTime / currentMax;
  // //! ------remove this code later--------------------

  // percentage = percentage - i;
  // i = i + 0.2;

  // //! ------------xxxxxxx----------------------------------
  store = [percentageF, dataUrl];
  currentArray[id] = store;
};

let returnW = () => {
  return currentArray;
};

module.exports = { returnW, calculateWidth, updateCurrentMax };
