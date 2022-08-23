'use strict';
const statusBox = require('./statusBox.js');
const action = require('./doppler/action.js');
const msgbox = require('./messageBox.js');

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
    action.toggleEditMode(pstate, cm);
    let btn = document.getElementById('editmode');
    toggleStatus(btn);
  });
  statusBox.addStatusBox(statusBox.CMODE).addEventListener('click', () => {
    action.changeMarkMode(pstate, ws);
    let btn = document.getElementById('cmode');
    toggleStatus(btn);
  });

  statusBox.addStatusBox(statusBox.GOTO).addEventListener('click', () => {
    var myElem = document.getElementById('ITitle');
    if (myElem === null) {
      msgbox.createInputBox();
      msgbox.makeInputBox('Goto Time', 'Close', 'Go');
    } else {
    }
  });

  statusBox.addStatusBox(statusBox.NSYNC, true);
  statusBox.addStatusBox(statusBox.CSYNC, true);

  let toggleStatus = (btn) => {
    const backgroundColor = btn.style.backgroundColor;

    if (backgroundColor === 'rgb(66, 66, 66)') {
      console.log('im here chnagong thje color');
      btn.style.backgroundColor = 'rgb(262, 63, 78)';
    } else {
      btn.style.backgroundColor = 'rgb(66, 66, 66)';
    }
  };
};

module.exports = {
  updateStatusBoxVisibility,
  createStatusBars,
};
