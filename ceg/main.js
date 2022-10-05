// main js file
// imports and requires

globalThis.NumberOfFlexBoxes = 1;

let Client = require('./wsClient.js');

const wsUtil = require('./wsUtil.js');

let buildHtml = require('./buildMainPage.js');

wsUtil.init(Client.wsClientInitialize());

wsUtil.sendMessage('C: hello test message for FS :)-test123334566');

buildHtml.buildPage();
