'use strict';
const statusBox = require('./statusBox.js');
const action = require('./doppler/action.js');
const msgbox = require('./messageBox.js');
const timeAtCursor = require('./doppler/time-at-cursor.js');

const updateStatusBoxVisibility = (pstate) => {
  let statusBar = document.getElementById('statusBarContainer');
  statusBar.childNodes.forEach(function (item) {
    if (item instanceof HTMLElement) {
      let isMulti = item.getAttribute('data-multi');
      let isVisible =
        (isMulti === 'false') | ((isMulti === 'true') & pstate.multidoc);
      item.style.visibility = isVisible ? 'visible' : 'hidden';
    }
  });
};

let createStatusBars = (pstate, cm, ws) => {
  let sDiv = document.createElement('div');
  sDiv.innerHTML = `<div id="statusBars" onload="'./statusBox.js'">
      <div id="statusBarContainer" class="status" >
      </div>
    </div>`;
  document.getElementsByClassName('wd-container')[0].appendChild(sDiv);

  statusBox.addStatusBox(statusBox.EDITMODE).addEventListener('click', () => {
    // action.toggleEditMode(pstate, cm);

    toggleEditStatus(pstate, cm);
  });

  statusBox.addStatusBox(statusBox.CMODE).addEventListener('click', () => {
    // action.changeMarkMode(pstate, ws);
    toggleCMStatus(pstate, ws);
  });

  statusBox.addStatusBox(statusBox.GOTO).addEventListener('click', () => {
    var myElem = document.getElementById('ITitle');
    if (myElem === null) {
      var x = document.getElementById('goto');
      const backgroundColor = x.style.backgroundColor;
      x.style.backgroundColor = 'rgb(262, 63, 78)';
      msgbox.createInputBox();
      msgbox.makeInputBox('Goto Time', 'Close', 'Go');
    } else {
    }
  });

  statusBox.addStatusBox(statusBox.NSYNC, true);
  statusBox.addStatusBox(statusBox.CSYNC, true);

  if (document.getElementById('navsync')) {
    document.getElementById('navsync').addEventListener('click', () => {
      toggleNavStatus();
    });
  }

  if (document.getElementById('cursync')) {
    document.getElementById('cursync').addEventListener('click', () => {
      toggleCurStatus();
    });
  }
};
let toggleCMStatus = () => {
  action.changeMarkMode();
  var x = document.getElementById('cmode');
  const backgroundColor = x.style.backgroundColor;
  if (x.innerHTML === 'CMode: click') {
    x.style.backgroundColor = 'rgb(262, 63, 78)';
    x.innerHTML = 'CMode: follow';
  } else {
    x.innerHTML = 'CMode: click';
    x.style.backgroundColor = 'rgb(66, 66, 66)';
  }
};

let toggleEditStatus = () => {
  action.toggleEditMode();
  var x = document.getElementById('editmode');
  const backgroundColor = x.style.backgroundColor;
  if (x.innerHTML === 'Edit Mode: off') {
    x.style.backgroundColor = 'rgb(262, 63, 78)';
    x.innerHTML = 'Edit Mode: on';
  } else {
    x.innerHTML = 'Edit Mode: off';
    x.style.backgroundColor = 'rgb(66, 66, 66)';
  }
};

let toggleCurStatus = () => {
  var x = document.getElementById('cursync');
  const backgroundColor = x.style.backgroundColor;
  if (x.innerHTML === 'CurSync: abs') {
    x.style.backgroundColor = 'green';
    x.innerHTML = 'CurSync: rel';
  } else if (x.innerHTML === 'CurSync: rel') {
    x.innerHTML = 'CurSync: off';
    x.style.backgroundColor = 'rgb(66, 66, 66)';
  } else {
    x.innerHTML = 'CurSync: abs';
    x.style.backgroundColor = 'rgb(262, 63, 78)';
  }
};

let toggleNavStatus = () => {
  var x = document.getElementById('navsync');
  const backgroundColor = x.style.backgroundColor;
  if (x.innerHTML === 'NavSync: off') {
    x.style.backgroundColor = 'rgb(262, 63, 78)';
    x.innerHTML = 'NavSync: on';
  } else {
    x.innerHTML = 'NavSync: off';
    x.style.backgroundColor = 'rgb(66, 66, 66)';
  }
};

module.exports = {
  updateStatusBoxVisibility,
  createStatusBars,
  toggleNavStatus,
  toggleCurStatus,
  toggleEditStatus,
  toggleCMStatus,
};

// const cursorsyncmode = (event, content, cursor, pstate, ws, render) => {
//   // console.log("cursor sync mode");
//   statusBarMgr.toggleCurStatus();
//   ws.sendcmd(['cursorsyncmode']);
//   return true;
// };

// const togglenavsync = (event, content, cursor, pstate, ws, render) => {
//   statusBarMgr.toggleNavStatus();
//   ws.sendcmd(['togglenavsync']);
//   return true;
// };
