'use strict';

const EDITMODE = 'editmode';

const GOTO = 'goto';

const CMODE = 'cmode';

const NSYNC = 'navsync';

const CSYNC = 'cursync';

const labelMap = new Map();
labelMap.set(EDITMODE, 'Edit Mode: ');
labelMap.set(GOTO, 'Goto: ');
labelMap.set(CMODE, 'm:Cursor: ');
labelMap.set(NSYNC, 'n:NavSync: ');
labelMap.set(CSYNC, '\\:CurSync: ');

let setMessage = (idName, message) => {
  const content = labelMap.get(idName) + message;
  document.getElementById(idName).innerHTML = content;
};

let addStatusBox = (idName, multi = false) => {
  var statusDiv = document.createElement('div');
  // set the id name
  statusDiv.setAttribute('id', idName);
  statusDiv.setAttribute('data-multi', multi ? 'true' : 'false');

  // now append the div to the parent div
  document.getElementsByClassName('status')[0].appendChild(statusDiv);

  return statusDiv;
};

module.exports = {
  setMessage,
  addStatusBox,
  GOTO,
  CMODE,
  NSYNC,
  CSYNC,
  EDITMODE,
};

// var timer = setInterval(function () {
//   let editButton = document.getElementById('editmode');
//   let cMButton = document.getElementById('cmode');
//   let helpUIButton = document.getElementById('statusBarContainer');
//   if (editButton && cMButton && helpUIButton) {
//     // on edit button click,
//     editButton.onclick = () => {
//       // do something here the function is clicked
//       action.toggleEditMode(cm);
//     };
//     cMButton.onclick = () => {
//       action.changeMarkMode(pstate, ws);
//     };
//     helpUIButton.onclick = () => {
//       console.log('the help ui was clicked');
//       helpUI.toggleHelpUI();
//     };

//     // clear the time out once the element has been found
//     clearTimeout(timer);
//   }
// }, 100); // check every 100ms
