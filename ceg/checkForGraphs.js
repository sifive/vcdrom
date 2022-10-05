let buildGraph = require('./cegGraph.js');
let builder = require('./buildComponents.js');

let checkDom = () => {
  let re = builder.buildFlexbox();
  builder.buildMenuBox();
  let g = '#' + re;
  console.log('this si the flexbox div', g);
  // if (document.getElementById('cegGraph').innerHTML === '') {
  buildGraph.buildGraph(msgArray, window.innerWidth, g);
  globalThis.NumberOfFlexBoxes++;
};

module.exports = { checkDom };
