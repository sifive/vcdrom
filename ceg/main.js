// main js file
// imports and requires

globalThis.NumberOfFlexBoxes = 1;

let scroll = require('./onScroll.js');

let Client = require('./wsClient.js');

const wsUtil = require('./wsUtil.js');

let resizer = require('./resizingGraph.js');

let buildHtml = require('./buildMainPage.js');

scroll.onScroll();

wsUtil.init(Client.wsClientInitialize());

// buildHtml.buildPage();
resizer.resizeGraphs();

// export FS_ROOTDIR=~/dev-root
// export FS_WS=~/Desktop/fs-runtime
