'use strict';
let state = 0;

// let listenForUI = () => {
//   document.addEventListener('keydown', (event) => {
//     if (event.key == 'F1') {
//       event.preventDefault();
//       document.getElementById('openDiv').classList.toggle('show');
//       // if (state == 0) {
//       //   state = 1;
//       //   // console.log('im here');
//       //   // document.getElementById('helpButton').innerText =
//       //   //   'Press F1/Click to Close Help Menu';
//       //   document.getElementById('openDiv').classList.toggle('show');
//       // } else {
//       //   // document.getElementById('helpButton').innerText =
//       //   //   'Press F1 / Click to Open Help Menu';
//       //   document.getElementById('openDiv').classList.toggle('hide');
//       // }
//     }
//   });
// };

let toggleHelpUI = () => {
  document.getElementById('openDiv').classList.toggle('show');
};

module.exports = { toggleHelpUI };
