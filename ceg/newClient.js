let processMessage = require('./processMessage');

const ws = (function () {
  const websocket = new WebSocket('ws://' + location.host);

  var publicApi = {};

  // websocket.onopen = () => {
  //   // console.log('websocket: ' + websocket.url);
  //   console.log('websocket opened wow :)' + websocket.url);
  //   publicApi.sendmsg('i am ceg client');
  // };

  // websocket.onmessage = (msg) => {
  //   console.log('i am running');
  //   const cmd = msg.data.toString().trim();
  //   processMessage.processMessages(msg.data.toString());
  //   // processMessage.processMessages(msg.data.toString());
  //   // // TODO alter this part once we start getting more commands within the message

  //   // console.log('This is the message we get : ' + cmd);
  //   // if (!cmd.includes('<cmd>')) {
  //   //   processCommand(cmd);
  //   //   return;
  //   // }
  //   // const cmdArray = cmd.split('<cmd>');
  //   // cmdArray.forEach((c) => {
  //   //   processCommand(c.trim());
  //   // });

  //   // send message
  // };

  // const processCommand = (cmd) => {
  //   const cmdArray = cmd.split(' ');

  //   console.log('Command: ' + cmdArray);
  //   // switch (cmdArray[0]) {
  //   //   case 'set-render':
  //   //     pstate.doRender = cmdArray[1] === 'true';
  //   //     if (pstate.doRender) {
  //   //       render();
  //   //       refreshCursor(cursor, pstate, true);
  //   //     }
  //   //     return;
  //   // }
  // };

  publicApi.openws = (cmd) => {
    websocket.onopen = () => {
      if (websocket !== null) {
        console.log(cmd);
        websocket.send(cmd);
      }
    };
  };

  publicApi.sendmsg = (cmd) => {
    if (websocket !== null) {
      console.log(cmd);
      websocket.send(cmd);
    }
  };

  publicApi.getmsg = () => {
    websocket.onmessage = (msg) => {
      console.log('i am running');
      const cmd = msg.data.toString().trim();
      processMessage.processMessages(msg.data.toString());
      // processMessage.processMessages(msg.data.toString());
      // // TODO alter this part once we start getting more commands within the message

      // console.log('This is the message we get : ' + cmd);
      // if (!cmd.includes('<cmd>')) {
      //   processCommand(cmd);
      //   return;
      // }
      // const cmdArray = cmd.split('<cmd>');
      // cmdArray.forEach((c) => {
      //   processCommand(c.trim());
      // });

      // send message
    };
  };

  publicApi.sendcmd = (cmd) => {
    websocket.onopen = () => {
      if (websocket !== null) {
        console.log(cmd);
        websocket.send(cmd);
      }
    };
  };

  return publicApi;
})();

module.exports = { ws };
