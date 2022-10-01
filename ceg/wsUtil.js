// * @websocket is a global variable holding the websocket object
let websocket;

function init(ws) {
  websocket = ws;
}

let sendMessage = (msg1) => {
  // Wait until the state of the socket is not ready and send the message when it is...
  // ?
  waitForSocketConnection(websocket, function () {
    console.log('message sent!!!');
    websocket.send(msg1);
  });
};

// ?
// Make the function wait until the connection is made...
let waitForSocketConnection = (socket, callback) => {
  setTimeout(function () {
    if (socket.readyState === 1) {
      if (callback != null) {
        callback();
      }
    } else {
      waitForSocketConnection(socket, callback);
    }
  }, 5); // wait 5 millisecond for the connection...
};

module.exports = { init, sendMessage };

// ? Fix is from here: https://stackoverflow.com/questions/13546424/how-to-wait-for-a-websockets-readystate-to-change
