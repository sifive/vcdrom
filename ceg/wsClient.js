// const { OPEN } = require('ws');
let processMessage = require('./processMessage.js');

let websocket;

function sendMessage(msg1) {
  // Wait until the state of the socket is not ready and send the message when it is...
  waitForSocketConnection(websocket, function () {
    console.log('message sent!!!');
    websocket.send(msg1);
  });
}

// Make the function wait until the connection is made...
function waitForSocketConnection(socket, callback) {
  setTimeout(function () {
    if (socket.readyState === 1) {
      console.log('Connection is made');
      if (callback != null) {
        callback();
      }
    } else {
      console.log('wait for connection...');
      waitForSocketConnection(socket, callback);
    }
  }, 5); // wait 5 milisecond for the connection...
}

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
};

module.exports = { wsClientInitialize, sendMessage };

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
