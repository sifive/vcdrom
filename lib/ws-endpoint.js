'use strict';

const xOffsetAtT = require('./doppler/xofs-at-t.js');
const tAtX = require('./doppler/t-at-x.js');
const getX = require('./doppler/get-x.js');
const timeAtCursor = require('./doppler/time-at-cursor.js');
const refreshCursor = require('./doppler/refresh-cursor.js');
const scale = require('./doppler/scale.js');
const _ = require('lodash');
const gotoTime = require('./doppler/goto-time.js');
const statusBar = require('./statusBar.js');
const statusBox = require('./statusBox.js');
// const statusBarMgr = require('./statusBarMgr.js');

function finish(render, cursor, pstate) {
  render();
  refreshCursor(cursor, pstate);
}

const ws = (function () {
  const websocket = new WebSocket('ws://' + location.host);

  var publicApi = {};

  var render;
  var pstate;
  var cursor;
  var editor;

  websocket.onopen = () => {
    // console.log('websocket: ' + websocket.url);
  };

  websocket.onmessage = (msg) => {
    const cmd = msg.data.toString().trim();
    //console.log("Message: " + cmd);
    if (!cmd.includes('<cmd>')) {
      processCommand(cmd);
    }
    const cmdArray = cmd.split('<cmd>');
    cmdArray.forEach((c) => {
      processCommand(c.trim());
    });
  };

  /**
   * Joins all paramters starting at specified
   * index into a single string.  Used to provide
   * a string paramter that contains spaces. Note
   * this must be the last parameter.
   * @param {string[]} arr The command parameter string array
   * @param {int} i The starting index to join
   * @returns A string of joined parameters
   */
  const theRest = (arr, i) => {
    return _.join(_.slice(arr, i), ' ');
  };

  const processCommand = (cmd) => {
    const cmdArray = cmd.split(' ');
    // console.log('Command: ' + cmd);
    switch (cmdArray[0]) {
      case 'set-render':
        pstate.doRender = cmdArray[1] === 'true';
        if (pstate.doRender) {
          render();
          refreshCursor(cursor, pstate, true);
        }
        return;

      case 'centercursor': {
        const time = tAtX(pstate.xCursor, pstate);
        gotoTime(time, pstate, cursor, true, render);
        return;
      }

      case 'update-bookmark': {
        const index = parseInt(cmdArray[1]);
        pstate.bookmarks[index].note = theRest(cmdArray, 2);
        render();
        return;
      }

      case 'remove-bookmark':
        _.pullAt(pstate.bookmarks, parseInt(cmdArray[1]));
        render();
        return;

      case 'navkey':
        {
          let keystring = cmdArray[1];
          switch (keystring) {
            case '<space>':
              keystring = ' ';
              break;
          }
          const event = {
            key: keystring,
            shiftKey: cmdArray[2] === 'true',
            ctrlKey: cmdArray[3] === 'true',
          };

          (scale[event.key] || scale.nop)(pstate, event, editor) &&
            finish(render, cursor, pstate);
        }
        return;
      case 'goto': {
        gotoTime(cmdArray[1], pstate, cursor, cmdArray[2], render);
        return true;
      }
      case 'close':
        // eslint-disable-next-line no-undef
        window.close();
        break;
      case 'setmark':
        //console.log('create mark', cmdArray[1], cmdArray[2]);
        pstate.abmarks[cmdArray[1]] = parseInt(cmdArray[2]);
        break;
      case 'setstate':
        //console.log("setstate", cmdArray[1], cmdArray[2]);
        pstate.xOffset = xOffsetAtT(parseInt(cmdArray[1]), pstate);
        pstate.xCursor = getX(pstate, parseInt(cmdArray[2]));
        statusBar.setStatusBarVisibility(true);
        refreshCursor(cursor, pstate);
        break;
      case 'bookmark':
        // FS sends this command when:
        // 1. bookmarks are being restored on a new vieweing session
        // 2. The user has added or updated the note for a bookmark
        if (cmdArray.length > 1) {
          let note = theRest(cmdArray, 2);
          pstate.bookmarks.push({
            time: cmdArray[1],
            note: note,
          });
        } else {
          pstate.bookmarks.push({
            time: cmdArray[1],
            note: '',
          });
        }
        break;
      case 'render':
        render();
        refreshCursor(cursor, pstate);
        break;
      case 'reportcursorsyncmode':
        statusBox.setMessage(statusBox.CSYNC, cmdArray[1]);
        break;
      case 'reportnavsyncmode':
        statusBox.setMessage(
          statusBox.NSYNC,
          cmdArray[1] === 'true' ? 'on' : 'off'
        );
        break;
      case 'movecursorto':
        pstate.xCursor = getX(pstate, parseInt(cmdArray[1]));
        //console.log("move cursor to " + cmdArray[1] + " " + pstate.xCursor);
        refreshCursor(cursor, pstate);
        break;
      case 'movecursordelta':
        if (!isNaN(cmdArray[1])) {
          pstate.xCursor += parseInt(cmdArray[1]);
          // console.log(
          //   "move cursor delta " + cmdArray[1] + " " + pstate.xCursor
          // );
          refreshCursor(cursor, pstate);
        }
        break;
      case 'setcursormode':
        pstate.markmode = cmdArray[1] === 'click';
        statusBox.setMessage(statusBox.CMODE, cmdArray[1]);
        break;
      case 'multidoc':
        pstate.multidoc = cmdArray[1] === 'true';
      // statusBarMgr.updateStatusBoxVisibility(pstate);
    }
  };

  // eslint-disable-next-line no-undef
  //console.log('add unload handler');
  // Want to debug stuff happening here?
  // See: https://stackoverflow.com/a/10068090
  let unloadOnce = true;
  window.addEventListener('beforeunload', () => {
    try {
      if (!unloadOnce) {
        return;
      }
      unloadOnce = false;

      const tStartExact = tAtX(pstate.sidebarWidth, pstate);
      const tCursor = timeAtCursor(pstate);
      // Send the content of the cm editor to FS so the waveql file can be
      // updated.
      publicApi.sendcmd([
        'waveql',
        editor.getValue().replace(/[\r\n]/gm, '<l!f>'),
      ]);
      // Send a notification to FS along with the time at the left edge so
      // we can restore to this time position when reopened.
      publicApi.sendcmd(['closingtab', tStartExact, tCursor]);
    } catch (error) {
      publicApi.sendcmd(['closingtab', 'NaN', 'NaN']);
    }
  });

  publicApi.init = (p, c, r, cm) => {
    //console.log(r);
    render = r;
    cursor = c;
    pstate = p;
    editor = cm;
    publicApi.sendmsg('rendered');
  };

  publicApi.sendmsg = (cmd) => {
    if (websocket !== null) {
      websocket.send(cmd);
    }
  };

  publicApi.sendcmd = (cmd) => {
    if (websocket !== null) {
      websocket.send(cmd.join(' '));
    }
  };

  return publicApi;
})();

module.exports = ws;
