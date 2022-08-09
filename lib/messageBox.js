'use strict';

const action = require('./doppler/action');

// timed message box
let createTimedMessageBox = () => {
  let msgBox = document.createElement('div');
  msgBox.innerHTML = `<div class="outer">
      <div id="messageBox"></div>
    </div>`;
  document.getElementsByClassName('wd-container')[0].appendChild(msgBox);
};

let makeTimedMessage = (time, message) => {
  document.getElementById('messageBox').innerHTML = message;
  const mBox = document.getElementById('messageBox');
  mBox.style.display = 'block';

  setTimeout(() => {
    // 👇️ removes element from DOM
    mBox.style.display = 'none';

    // 👇️ hides element (still takes up space on page)
    mBox.style.visibility = 'hidden';
  }, time);
};

// X close message box
let createXMessageBox = () => {
  let XmsgBox = document.createElement('div');
  console.log('creating the x close message box');
  XmsgBox.innerHTML = `  <div class="outerBox">
    <div
      class="close"
      onclick=" this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
  return false;"
    >
      &#10006;
    </div>
    <div id='xBoxContent'class="bodyTextContent"></div>
  </div>`;

  document.getElementsByClassName('wd-container')[0].appendChild(XmsgBox);
};

let makeXMessageBox = (xMessage) => {
  document.getElementById('xBoxContent').innerHTML = xMessage;
};

// Dialogue box
let createDialogueBox = () => {
  let DmsgBox = document.createElement('div');
  DmsgBox.innerHTML = `<div class="confirm">
      <h1 id="CTitle"></h1>
      <p id="bodyText"></p>
      <button id="CancelButton"></button>
      <button
        id="ConfirmButton"
      ></button>
    </div>`;
  document.getElementsByClassName('wd-container')[0].appendChild(DmsgBox);
};

let makeDialogueBox = (DTitle, BodyText, buttonName1, buttonName2) => {
  document.getElementById('CTitle').innerHTML = DTitle;
  document.getElementById('bodyText').innerHTML = BodyText;
  document.getElementById('CancelButton').innerHTML = buttonName1;
  document.getElementById('ConfirmButton').innerHTML = buttonName2;

  const eConfirm = document.getElementById('ConfirmButton');

  // always checking if the confirm button is clicked element is clicked
  eConfirm.addEventListener('click', () => {
    //  the button was clicked
    // can be sent back to FS from here
    console.log('CONFIRM was clicked');
    eConfirm.parentNode.parentNode.parentNode.removeChild(
      eConfirm.parentNode.parentNode
    );
  });

  const eCancel = document.getElementById('CancelButton');
  eCancel.addEventListener('click', () => {
    //  the button was clicked
    console.log('CANCEL was clicked');
  });
};

let createInputBox = () => {
  let inputBox = document.createElement('div');
  inputBox.innerHTML = `<div class="inputText">
      <h1 id="ITitle">Goto Time</h1>
      <input
        id="inputText"
        type="text"
        placeholder="Input here and Click ENTER to submit..."
      />
      <div class="buttons">
        <button class="enterButton" id="CButton">Cancel</button>
        <button class="enterButton" id="EButton">Enter</button>
      </div>
    </div>`;
  document.getElementsByClassName('wd-container')[0].appendChild(inputBox);
};

let makeInputBox = (DTitle, buttonName1, buttonName2) => {
  document.getElementById('ITitle').innerHTML = DTitle;
  document.getElementById('CButton').innerHTML = buttonName1;
  document.getElementById('EButton').innerHTML = buttonName2;

  document.getElementById('inputText').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      var currText = document.getElementById('inputText').value;
      console.log(currText);
    }
  });

  // const EnterButton = document.getElementById('EnterButton');
  // // EnterButton.addEventListener('click', () => {
  //  the button was clicked
  var currText = document.getElementById('inputText').value;
  console.log(currText);
  // userGotoTime;
  // action.getToThisTime(currText);
  // let timeStr = currText;
  // action.getToThisTime(timeStr);
  action.getTime(currText);
  // });
};

module.exports = {
  createTimedMessageBox,
  makeTimedMessage,
  createXMessageBox,
  makeXMessageBox,
  createDialogueBox,
  makeDialogueBox,
  createInputBox,
  makeInputBox,
};
