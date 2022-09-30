// main js file
// imports and requires
let Client = require('./wsClient.js');

const wsutil = require('./wsUtil.js');

wsutil.init(Client.wsClientInitialize());

wsutil.sendMessage('C: hello test message for FS :)-test123334566');

//? testing client like Kevin ws-endpoint
// let newClient = require('./newClient.js');
// newClient.ws.openws('opening test678292');
// newClient.ws.sendcmd('test223345');
// newClient.ws.getmsg();
