let checker = require('./updateAll.js');
let processMessages = (message) => {
  msgArray = message.split(' ')[1];

  console.log('this is the path', message.split(' ')[0]);

  if (message.split(' ')[0] === 'FunctionTimingData') {
    checker.updatePage();
  }
};

module.exports = { processMessages };

//TODO modify this process message for different cases like delete graph etc
