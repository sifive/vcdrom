let buildGraph = require('./ceg');
let processMessage = require('./processMessage');

// let dataUrl1 = 'data/test_prime_20.json';
let dataUrl1 = 'FunctionTimingData data/test_prime_20_updated.json';

let sampleMessage =
  'FunctionTimingData /home/kevinm/sifive/ws-multitap/x390v10c1_prime/experiments/experiment_O2/.cache/iteration-json/test_prime.json';

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
    buildGraph.buildGraph(
      processMessage.processMessages(dataUrl1),
      currentWidth
    ); // bar built by its module function
    // buildGraph.buildGraph(dataUrl1);
    // buildGraph.buildGraph(dataUrl1, currentWidth);
    // buildGraph.buildGraph(dataUrl1, currentWidth);
  };
};

module.exports = { wsClient };
