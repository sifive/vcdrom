// main js file
// imports and requires
// TODO clean up names of variables and functions---[]

let Client = require('./wsClient.js');

const wsutil = require('./wsUtil.js');

wsutil.init(Client.wsClientInitialize());

wsutil.sendMessage('C: hello test message for FS :)-test123334566');
