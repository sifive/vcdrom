'use strict';

const { getT } = require('../../doppler/lib');
const _ = require('lodash');

const curText = 'cursor';

const findExistingClickCursor = () => {
  const { cm } = wso;
  let doc = cm.getView().state.doc;
  let lines = doc.lines;

  for (let ln = 0; ln < lines; ln++) {
    let line = doc.line(ln + 1).text;
    if (line.startsWith('@') && line.endsWith(curText)) {
      let matches = line.match(cursorColorRegex);
      return {
        line: doc.line(ln + 1),
        color: matches.groups.color
      };
    }
  }
  return null;
};

const findLastCursor = () => {
  const { cm } = wso;
  let doc = cm.getView().state.doc;
  let lines = doc.lines;

  for (let ln = lines; ln > 0; ln--) {
    let line = doc.line(ln).text;
    if (line.startsWith('@')) {
      return doc.line(ln + 1).from;
    }
  }
  return -1;
};

let lastCursorColor = 'g';
let websocket;
let wso;

const init = (ws, o) => {
  websocket = ws;
  wso = o;
};

const findInsertionPoint = () => {
  /*
   * Try to insert after the last existing cursor
   */
  let from = -1;

  let insertAt = findLastCursor();
  if (insertAt > -1) {
    from = insertAt;
  }

  if (from == -1) {
    /*
     * Try to insert at the top of DIZ block
     */
    let insertAt = wso.cm.getView().state.doc.toString().indexOf('(DIZ');
    if (insertAt > -1) {
      from = insertAt;
    }
  }

  if (from == -1) {
    /*
     * Last resort, insert to the top of the doc
     */
    from = 0;
  }

  return from;
};

const cursorClickHandler = () => (event) => {
  const x = wso.pstate.xCursor;
  const time = getT(x, wso.pstate);

  let from = -1;
  let to = -1;
  let lineFeed = '';

  let obj = findExistingClickCursor();
  if (obj != null) {
    /*
     * Replace the existing cursor
     */
    from = obj.line.from;
    to = obj.line.to;

    if (obj.color != undefined) {
      lastCursorColor = obj.color;
    }
  }

  if (from == -1) {
    from = findInsertionPoint();
    if (from > -1) {
      to = from;
      lineFeed = '\n';
    }
  }

  if (from > -1) {
    const ccText =
      '@' +
      String(time) +
      'ns ' +
      ':' +
      lastCursorColor +
      ' ' +
      curText +
      lineFeed;
    wso.cm.getView().dispatch({
      changes: { from: from, to: to, insert: ccText }
    });
  }
};

let timeoutId = null;
let previousCursors = [];
const cursorRegex = /^@(?<time>\d+)(?<unit>[a-z]+)(?:\s+:(?<label>.*))*/;
const cursorColorRegex =
  /^@(?<time>\d+)(?<unit>[a-z]+)(?:\s+:(?<color>(\w)+)\s+(?<label>(\w| )+))*/;

const cursorUpdateListener = (e) => {
  if (timeoutId != null) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    timeoutId = null;

    let doc = e.state.doc;
    let lines = doc.lines;

    let cursors = [];

    // Gather all the cursor markers, except the click cursor.
    for (let ln = 0; ln < lines; ln++) {
      let line = doc.line(ln + 1).text;
      if (line.startsWith('@') && !line.endsWith(curText)) {
        let matches = line.match(cursorRegex);
        if (matches != null) {
          cursors.push({
            time: matches.groups.time,
            unit: matches.groups.unit,
            label: matches.groups.label
          });
        }
      }
    }
    cursors.sort();

    let sendUpdate = false;

    // First the "easy and quick" test
    sendUpdate = cursors.length != previousCursors.length;

    if (!sendUpdate) {
      // Compare to see if there are any changes
      sendUpdate = !_.isEqual(cursors, previousCursors);
    }

    if (sendUpdate) {
      let msg = JSON.stringify({
        command: 'cursorsUpdate',
        cursors: cursors
      });
      console.log('cursorsUpdate', msg);
      websocket.send(msg);
      previousCursors = cursors;
    }
  }, 750);
};

const findCursor = (cursor) => {
  const { cm } = wso;
  let doc = cm.getView().state.doc;
  let lines = doc.lines;

  for (let ln = 0; ln < lines; ln++) {
    let line = doc.line(ln + 1).text;
    if (line.startsWith('@')) {
      console.log('testing', line);
      let matches = line.match(cursorRegex);
      if (
        matches.groups.time == String(cursor.time) &&
        matches.groups.unit == cursor.unit &&
        matches.groups.label == cursor.label
      ) {
        return doc.line(ln + 1);
      }
    }
  }
  return null;
};

const updateCursor = (message) => {
  console.log('updateCursor', message);
  let start;
  let end;

  if (message.from == null) {
    start = findInsertionPoint();
    end = start;
  } else {
    let line = findCursor(message.from);
    if (line == null) {
      return;
    }
    start = line.from;
    end = line.to;
  }

  let to = message.to;
  const ccText = '@' + String(to.time) + to.unit + ' :' + to.label;

  wso.cm.getView().dispatch({
    changes: { from: start, to: end, insert: ccText }
  });
};

module.exports = {
  init,
  cursorUpdateListener,
  cursorClickHandler,
  updateCursor
};
