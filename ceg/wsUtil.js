let websocket;

function init(ws) {
  websocket = ws;
}

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
      if (callback != null) {
        callback();
      }
    } else {
      waitForSocketConnection(socket, callback);
    }
  }, 5); // wait 5 millisecond for the connection...
}

module.exports = { init, sendMessage };

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
