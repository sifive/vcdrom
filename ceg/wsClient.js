// const { OPEN } = require('ws');
let processMessage = require('./processMessage.js');

let websocket;

let wsClientInitialize = () => {
  websocket = new WebSocket('ws://' + location.host);
  websocket.onopen = () => {
    console.log('websocket opened wow :)' + websocket.url);
    websocket.send('iam ceg');
    // websocket.send(msg1);
  };
  websocket.onmessage = (msg) => {
    // on getting a message from FS
    console.log('Message from web socket server :) ): : ', msg.data.toString());
    // return the message
    processMessage.processMessages(msg.data.toString());
  };

  return websocket;
};

module.exports = { wsClientInitialize };

// -----works
// let processMessage = require('./processMessage');
// const websocket = new WebSocket('ws://' + location.host);

// let wsClientInitialize = (msg1) => {
//   websocket.onopen = () => {
//     console.log('websocket opened wow :)' + websocket.url);
//     websocket.send('iam ceg');
//     websocket.send(msg1);
//   };

//   websocket.onmessage = (msg) => {
//     // on getting a message from FS
//     console.log('Message from web socket server :) ): : ', msg.data.toString());
//     // return the message
//     processMessage.processMessages(msg.data.toString());
//   };
// };

// module.exports = { wsClientInitialize };
