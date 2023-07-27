'use strict';

const { getT } = require('@wavedrom/doppler/lib');
const _ = require('lodash');

let websocket;
let wso;

const init = (ws, o) => {
  websocket = ws;
  wso = o;
};

// Click Cursor is: @<time><unit>.x
const clickCursorRegex = /@(?<time>\d+)(?<unit>[a-z]+).x/;
const curRegex = /@(?<time>\d+)(?<unit>[a-z]+)(?:\.{1}(?<color>\w))*/;

const findExistingClickCursor = () => {
  let doc = wso.cm.view.state.doc;
  let lines = doc.lines;

  for (let ln = 0; ln < lines; ln++) {
    let line = doc.line(ln + 1).text;
    if (line.startsWith('@')) {
      let matches = line.match(clickCursorRegex);
      if (matches != null) {
        return doc.line(ln + 1);
      }
    }
  }
  return null;
};

const findLastCursor = () => {
  const { cm } = wso;
  let doc = cm.view.state.doc;
  let lines = doc.lines;

  for (let ln = lines; ln > 0; ln--) {
    let line = doc.line(ln).text;
    if (line.startsWith('@')) {
      return doc.line(ln + 1).from;
    }
  }
  return -1;
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

  /*
   * If that fails, try to insert at the top of DIZ block
   */
  if (from == -1) {
    let insertAt = wso.cm.view.state.doc.toString().indexOf('(DIZ');
    if (insertAt > -1) {
      from = insertAt;
    }
  }

  /*
   * If that fails, just insert at the top of the doc
   */
  if (from == -1) {
    from = 0;
  }

  return from;
};

const setMouseCursorTo = (time) => {
  let from = -1;
  let to = -1;
  let lineFeed = '';

  let line = findExistingClickCursor();
  if (line != null) {
    /*
     * Replace the existing cursor
     */
    from = line.from;
    to = line.to;
  }

  if (from == -1) {
    from = findInsertionPoint();
    if (from > -1) {
      to = from;
      lineFeed = '\n';
    }
  }

  if (from > -1) {
    const ccText = '@' + String(time) + 'ns.x' + lineFeed;
    wso.cm.view.dispatch({
      changes: { from: from, to: to, insert: ccText }
    });
  }
};

const setMouseCursorToX = (x) => {
  const time = getT(x, wso.pstate);
  if (time >= 0) {
    setMouseCursorTo(time);
  }
};

const cursorClickHandler = () => (event) => {
  const x = wso.pstate.xCursor;
  setMouseCursorToX(x);
};

// This listener listens for any doc changes.  If a change
// is detected on a cursor or comment, a message is sent to FS with
// all the cursors and applicable comments.
let timeoutId = null;
let previousCursors = [];
let previousDizExp = '';

const cursorUpdateListener = (e) => {
  if (timeoutId != null) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    timeoutId = null;

    let doc = e.state.doc;
    let lines = doc.lines;

    let cursors = [];
    let dizExp = '';

    // Gather all the cursor markers, except the click cursor.
    // Attach the comment to all cursors found on a commented line.
    for (let ln = 0; ln < lines; ln++) {
      let line = doc.line(ln + 1);
      let lineText = line.text;
      if (lineText.startsWith('@')) {
        let lineComment = '';
        let commentIndex = lineText.indexOf('#');
        if (commentIndex > -1 && lineText.length > commentIndex) {
          lineComment = lineText.substring(commentIndex + 1).trim();
        }
        let token = lineText.split(' ');
        for (let t = 0; t < token.length; t++) {
          let matches = token[t].match(curRegex);
          if (matches != null) {
            cursors.push({
              time: matches.groups.time,
              unit: matches.groups.unit,
              color: matches.groups.color,
              comment: lineComment
            });
          }
        }
      } else if (lineText.startsWith('(DIZ')) {
        // Only care about first occurrence
        if (dizExp == '') {
          // Only process valid expressions
          try {
            new RegExp(lineText.trim().substring('(DIZ'.length).trim());
            dizExp = lineText.trim();
          } catch (e) {}
        }
      }
    }

    cursors.sort((a, b) => {
      if (Number(a.time) < Number(b.time)) return -1;
      if (Number(a.time) > Number(b.time)) return 1;
      return 0;
    });

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
      //console.log('cursorsUpdate', msg);
      websocket.send(msg);
      previousCursors = cursors;
    }

    if (dizExp != '' && previousDizExp != dizExp) {
      let msg = JSON.stringify({
        command: 'dizexpUpdate',
        expression: dizExp
      });
      //console.log('dizexpUpdate', msg);
      websocket.send(msg);
      previousDizExp = dizExp;
    }
  }, 750);
};

const updateDizExpressions = (message) => {
  const { cm } = wso;
  let doc = cm.view.state.doc;
  let lines = doc.lines;
  // console.log(
  //   'cursor:',
  //   cm.view.state.doc.lineAt(cm.view.state.selection.main.head)
  // );

  let startLine =
    cm.view.state.doc.lineAt(cm.view.state.selection.main.head).number - 1;
  for (let ln = startLine; ln < lines; ln++) {
    let line = doc.line(ln + 1);
    let lineText = line.text;
    if (lineText.startsWith(')')) {
      // Abort! Gotta go backward to find the DIZ line for this context
      break;
    }
    if (lineText.startsWith('(DIZ')) {
      wso.cm.view.dispatch({
        changes: { from: line.from, to: line.to, insert: message.trim() }
      });
      return;
    }
  }
  for (let ln = startLine; ln > 1; ln--) {
    let line = doc.line(ln + 1);
    let lineText = line.text;
    if (lineText.startsWith('(DIZ')) {
      wso.cm.view.dispatch({
        changes: { from: line.from, to: line.to, insert: message.trim() }
      });
      return;
    }
  }
};

const findMatchingLine = (message) => {
  // message.cursors[]
  // message.fromComment
  const { cm } = wso;
  let doc = cm.view.state.doc;
  let lines = doc.lines;

  for (let ln = 0; ln < lines; ln++) {
    let line = doc.line(ln + 1);
    let lineText = line.text;
    if (lineText.startsWith('@')) {
      let token = lineText.split(' ');
      //console.log('testing', lineText);
      let cursorMatchCount = 0;
      let cursorIndex = 0;
      for (let t = 0; t < token.length; t++) {
        let matches = token[t].match(curRegex);
        if (
          matches != null &&
          matches.groups.time == String(message.cursors[cursorIndex].time) &&
          matches.groups.unit == message.cursors[cursorIndex].unit &&
          matches.groups.color == message.cursors[cursorIndex].color
        ) {
          cursorMatchCount++;
          cursorIndex++;
          if (cursorMatchCount == message.cursors.length) {
            // Make sure the comment matches too
            let comment = lineText.substring(lineText.indexOf('#')).trim();
            if (comment == message.fromComment) {
              return line;
            }
          }
        }
      }
    }
  }
  return null;
};

const updateComment = (message) => {
  console.log('updateComment', message);

  // message.cursors[]
  // message.fromComment
  // message.toComment

  let start;
  let end;

  // Find the line that has all specified cursors and the
  // comment beng updated.
  let line = findMatchingLine(message);
  if (line == null) {
    // Not found! Nothing we can do.
    console.error('Matching line not found: ', message);
    return;
  }

  // Isolate the comment portion of the line.
  start = line.text.indexOf('#');
  end = line.to;

  // If the comment is being removed, remove the comment delimimter too
  if (message.comment == '') {
    start = start - 1;
  }

  wso.cm.view.dispatch({
    changes: { from: start, to: end, insert: ' ' + message.toComment }
  });
};

const findCursor = (cursor) => {
  const { cm } = wso;
  let doc = cm.view.state.doc;
  let lines = doc.lines;

  for (let ln = 0; ln < lines; ln++) {
    let line = doc.line(ln + 1);
    let lineText = line.text;
    if (lineText.startsWith('@')) {
      let token = lineText.split(' ');
      //console.log('testing', lineText);
      for (let t = 0; t < token.length; t++) {
        let matches = token[t].match(curRegex);
        if (
          matches != null &&
          matches.groups.time == String(cursor.time) &&
          matches.groups.unit == cursor.unit
        ) {
          let c = matches.groups.color;
          if (c == undefined) c = '';
          if (c == cursor.color) {
            //console.log('found matching cursor');
            return {
              line: line,
              from: line.from + lineText.indexOf(token[t]),
              to: line.from + lineText.indexOf(token[t]) + token[t].length
            };
          }
        }
      }
    }
  }
  return null;
};

const updateCursor = (message) => {
  console.log('updateCursor', message);
  let start;
  let end;
  let to;
  let ccText;

  if (message.from == null) {
    // Adding a new cursor
    start = findInsertionPoint();
    end = start;
    ccText = '@' + String(message.to.time) + message.to.unit;
    if (message.to.color.length > 0) {
      ccText += '.' + message.to.color;
    }

    if (message.to.comment.length > 0) {
      ccText += ' # ' + message.to.comment;
    }
    ccText += '\n';
  } else if (message.to == null) {
    // Removing a cursor
    let range = findCursor(message.from);
    ccText = '';
    start = range.from;
    end = range.to;
    let endIndex = end - range.line.from;
    //console.log('next char:', range.line.text[endIndex]);
    // Trim off any leading whitespace...
    while (range.line.text[endIndex] == ' ') {
      endIndex++;
      end++;
    }
    let curCount = range.line.text.split('@').length - 1;
    if (curCount == 1) {
      end = range.line.to + 1;
    }
  } else {
    // Updating an existing cursor
    let line = findCursor(message.from);
    if (line == null) {
      return;
    }

    to = message.to;
    ccText = '@' + String(to.time) + to.unit;
    if (to.color.length > 0) {
      ccText += '.' + to.color;
    }

    if (to.comment.length > 0) {
      console.log('updating existing comment');

      let cStart;
      let cEnd = line.line.to;
      let commentIndex = line.line.text.indexOf('#');
      let leader = '';
      if (commentIndex != -1) {
        // replace the existing comment with the new one
        cStart = line.line.from + commentIndex;
        leader = '# ';
      } else {
        // append the comment to the end of the line
        cStart = line.line.to;
        leader = ' # ';
      }
      wso.cm.view.dispatch({
        changes: { from: cStart, to: cEnd, insert: leader + to.comment }
      });
    } else if (to.comment.length == 0 && message.from.comment.length > 0) {
      console.log('remove existing comment');
      // remove the existing comment, everything after the first space
      let cStart;
      let cEnd = line.line.to;
      let commentIndex = line.line.text.indexOf('#');
      if (commentIndex != -1) {
        cStart = line.line.from + commentIndex - 1;
        console.log(line.line, cStart, cEnd);
        wso.cm.view.dispatch({
          changes: { from: cStart, to: cEnd, insert: '' }
        });
      }
    }

    start = line.from;
    end = line.to;
  }

  wso.cm.view.dispatch({
    changes: { from: start, to: end, insert: ccText }
  });
};

module.exports = {
  init,
  cursorUpdateListener,
  cursorClickHandler,
  updateCursor,
  updateComment,
  setMouseCursorTo,
  updateDizExpressions,
  setMouseCursorToX
};
