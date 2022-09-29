// main js file
// imports and requires
let Client = require('./wsClient');
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

Client.wsClientInitialize();
