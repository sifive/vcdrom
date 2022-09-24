//
// imports and requires
let buildGraph = require('./ceg');
let Client = require('./wsClient');
let Client1 = require('./client2');
// buildGraph.buildGraph();

console.log('this is the location', location.host);

Client.wsClient();
// Client1.wsClient1();
