let processMessage = require('./processMessage');

let wsClientInitialize = () => {
  const websocket = new WebSocket('ws://' + location.host);

  websocket.onopen = () => {
    console.log('websocket opened wow :)' + websocket.url);
    websocket.send('iam ceg');
  };

  websocket.onmessage = (msg) => {
    // on getting a message from FS
    console.log('Message from web socket server :) ): : ', msg.data.toString());
    // return the message
    processMessage.processMessages(msg.data.toString());
  };
};

module.exports = { wsClientInitialize };
