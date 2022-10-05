// main js file
// imports and requires

globalThis.NumberOfFlexBoxes = 1;

let scroll = require('./onScroll.js');

let Client = require('./wsClient.js');

const wsUtil = require('./wsUtil.js');

let buildHtml = require('./buildMainPage.js');

scroll.onScroll();

wsUtil.init(Client.wsClientInitialize());

wsUtil.sendMessage('C: hello test message for FS :)-test123334566');

buildHtml.buildPage();
