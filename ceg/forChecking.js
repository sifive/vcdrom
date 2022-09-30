let wsClient = require('./wsClient');
let callUS = (msgToDisplay) => {
  console.log('i am here inside calls');
  wsClient.wsClientInitialize(msgToDisplay);
};

module.exports = callUS;
