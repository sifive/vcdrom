let processMessage = require('./processMessage');

const ws = (function () {
  const websocket = new WebSocket('ws://' + location.host);

  var publicApi = {};

  websocket.onopen = () => {
    // console.log('websocket: ' + websocket.url);
    console.log('websocket opened wow :)' + websocket.url);
    publicApi.sendmsg('i am ceg client');
  };

  websocket.onmessage = (msg) => {
    const cmd = msg.data.toString().trim();

    processMessage.processMessages(msg.data.toString());
    // TODO alter this part once we start getting more commands within the message

    console.log('This is the message we get : ' + cmd);
    if (!cmd.includes('<cmd>')) {
      processCommand(cmd);
      return;
    }
    const cmdArray = cmd.split('<cmd>');
    cmdArray.forEach((c) => {
      processCommand(c.trim());
    });
  };

  const processCommand = (cmd) => {
    const cmdArray = cmd.split(' ');

    console.log('Command: ' + cmdArray);
    // switch (cmdArray[0]) {
    //   case 'set-render':
    //     pstate.doRender = cmdArray[1] === 'true';
    //     if (pstate.doRender) {
    //       render();
    //       refreshCursor(cursor, pstate, true);
    //     }
    //     return;
    // }
  };

  publicApi.sendmsg = (cmd) => {
    if (websocket !== null) {
      websocket.send(cmd);
    }
  };

  publicApi.sendcmd = (cmd) => {
    if (websocket !== null) {
      websocket.send(cmd.join(' '));
    }
  };

  return publicApi;
})();

module.exports = ws;
