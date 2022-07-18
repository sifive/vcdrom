'use strict';
let createStatusBubbles = () => {
  let sDiv = document.createElement('div');
  sDiv.className = 'statusBars';
  sDiv.innerHTML = `<div id="statusBox1">1</div>
        <div id="statusBox2">2</div>
        <div id="statusBox3">3</div>`;

  document.getElementsByClassName('wd-container')[0].appendChild(exaDiv);
};

module.exports = createStatusBubbles;
