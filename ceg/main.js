//
// imports and requires
let buildGraph = require('./ceg');
let Client = require('./wsClient');
let Client1 = require('./client2');
let keyPress = require('./clickEvent');
// buildGraph.buildGraph();

console.log('this is the location', location.host);

// window.addEventListener(
//   'resize',
//   function (event) {
//     console.log('resizing');
//     Client.wsClient();
//   },
//   true
// );
keyPress.onBarClicks();
Client.wsClient();
// Client1.wsClient1();
