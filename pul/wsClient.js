let processMessage = require('./processMessage');



let wsClient = () => {
  const websocket = new WebSocket('ws://' + location.host);

  websocket.onopen = () => {
    console.log('websocket opened wow :)' + websocket.url);
    websocket.send('iam ceg');
  };

  websocket.onmessage = (msg) => {
    // on getting a message from FS

    console.log('Message from web socket server :) : ', msg.data.toString());

    var currentWidth = window.innerWidth;
    console.log('this is the current width', currentWidth);

    // this is where the ceg module builds its graph, so presumably that could work for pul too

    /* Here's what's in ceg (for comparison):
    buildGraph.buildGraph(
      processMessage.processMessages(dataUrl1),
      currentWidth
    ); // bar built by its module function
    */

    // buildGraph.buildGraph(dataUrl1);
    // buildGraph.buildGraph(dataUrl1, currentWidth);
    // buildGraph.buildGraph(dataUrl1, currentWidth);
  };
};

module.exports = { wsClient };
