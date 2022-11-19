'use strict';

const wsCursor = require('./wsCursors.js');

const {
  genKeyHandler,
  xOffsetUpdate,
  getX,
  getT,
  keyBindo
} = require('@wavedrom/doppler/lib');

let processMessages = (message, wso) => {
  console.log('Process msg: ', message);
  try {
    message = JSON.parse(message);

    // Call the function with the same name as the
    // message command
    // eslint-disable-next-line quotes
    try {
      eval(message.command)(wso, message);
    } catch (error) {
      console.error(error);
      console.error('no command handler function named: ', message.command);
    }
  } catch (error) {
    // Ignore non-JSON commands
    console.error('non-json command detected, and ignored: ', message);
  }
};

// eslint-disable-next-line no-unused-vars
let updateCursor = (wso, message) => {
  wsCursor.updateCursor(message);
};

// eslint-disable-next-line no-unused-vars
let close = (wso, message) => {
  window.close();
};

// eslint-disable-next-line no-unused-vars
let setTitle = (wso, message) => {
  window.document.title = message.title;
};

// eslint-disable-next-line no-unused-vars
let viewstate = (wso, message) => {
  const { pstate, render } = wso;
  pstate.xScale = Number(message.xScale);
  pstate.xOffset = Number(message.xOffset);
  render();
};

// eslint-disable-next-line no-unused-vars
let goto = (wso, message) => {
  const { sidebarWidth, width } = wso.pstate;
  const { pstate, render } = wso;

  let t = Number(message.time);
  wsCursor.setMouseCursorTo(t);

  let currentTime = getT(sidebarWidth, pstate);
  let x = getX(pstate, currentTime - t) + width / 2;

  xOffsetUpdate(pstate, x);
  render();
  pstate.xCursor = sidebarWidth + width / 2;
};

// eslint-disable-next-line no-unused-vars
let keyaction = (wso, message) => {
  genKeyHandler.executeKeyHandler(message.key, keyBindo, wso.pstate, wso.cm) &&
    wso.render();
};

module.exports = { processMessages };
