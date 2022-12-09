'use strict';

const processMessage = require('./processMessage.js');

const wsCursor = require('./wsCursors.js');
const wsStages = require('./wsStages.js');

let websocket;

var wso = {};
var firstRender = true;

let init = () => {
  websocket = new WebSocket('ws://' + location.host);
  wso.websocket = websocket;

  websocket.onopen = () => {
    websocket.send('iam pv2');
  };

  websocket.onmessage = (msg) => {
    // on getting a message from FS
    processMessage.processMessages(msg.data.toString(), wso);
  };

  websocket.onclose = () => {
    window.close();
  };

  window.addEventListener('beforeunload', () => {
    const content = wso.cm.view.state.doc.toString().replaceAll('\n', '<br>');
    websocket.send(
      JSON.stringify({
        command: 'saveWaveql',
        content: content
      })
    );

    websocket.send(
      JSON.stringify({
        command: 'windowstate',
        windowOuterWidth: window.outerWidth,
        windowOuterHeight: window.outerHeight,
        windowX: window.screenLeft,
        windowY: window.screenTop
      })
    );

    console.log(wso.pstate);
    websocket.send(
      JSON.stringify({
        command: 'viewstate',
        xScale: wso.pstate.xScale,
        xOffset: wso.pstate.xOffset
      })
    );
  });

  //waitForSocketConnection(websocket);

  return websocket;
};

function waitForSocketConnection(socket, callback) {
  setTimeout(function () {
    if (socket != undefined && socket.readyState === 1) {
      if (callback != null) {
        callback();
      }
    } else {
      waitForSocketConnection(socket, callback);
    }
  }, 10); // wait a bit longer for the connection...
}

const setup = (stuffWeNeed) => {
  wso = stuffWeNeed;
  wso.websocket = websocket;
  wsCursor.init(websocket, wso);
  wso.container.addEventListener('click', wsCursor.cursorClickHandler());
  wso.container.addEventListener(
    'click',
    wsStages.instClickHandler(websocket, wso)
  );
};

const renderPlugin = (desc, pstate /* , els */) => {
  if (firstRender && websocket != null && websocket.readyState) {
    firstRender = false;
    websocket.send(
      JSON.stringify({
        command: 'onfirstrender'
      })
    );
  }
};

const keyPlugin = (key /*, event */) => {
  console.log('wsKeyPlugin', key);
  websocket.send(
    JSON.stringify({
      command: 'keyAction',
      key: key
    })
  );
};

const help = () => {
  websocket.send(
    JSON.stringify({
      command: 'openHelp'
    })
  );
};

module.exports = {
  init,
  waitForSocketConnection,
  setup,
  renderPlugin,
  keyPlugin,
  help
};
