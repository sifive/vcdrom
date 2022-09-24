let buildGraph = require('./ceg');
let dataUrl1 = 'data/test_prime_20.json';
let wsClient = () => {
  console.log('this is the web socket connection');

  // hostUrl = 'http://127.0.0.1:59316/cegIndex.html';

  const websocket = new WebSocket('ws://' + location.host);

  websocket.onopen = () => {
    console.log('websocket opened wow :)' + websocket.url);
    websocket.send('this is a test message');
  };

  websocket.onmessage = (msg) => {
    // on getting a message from FS

    console.log(
      'Message from c2 to c1 :X: & bar being built ',
      msg.data.toString()
    );
    buildGraph.buildGraph(dataUrl1); // bar built by its module function
    // buildGraph.buildGraph(dataUrl1);
  };
};

module.exports = { wsClient };
