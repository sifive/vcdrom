let checker = require('./checkForGraphs.js');
let processMessages = (message) => {
  msgArray = message.split(' ')[1];

  // return msgArray;
  console.log('this is the path', message);
  // console.log('true');
  checker.checkDom();

  // buildGraph.buildGraph(msgArray, window.innerWidth);
};

module.exports = { processMessages };

//TODO modify this process message for different cases like delete graph etc
