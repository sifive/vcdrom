let buildGraph = require('./cegGraph.js');
let builder = require('./buildComponents.js');

let updatePage = () => {
  let re = builder.buildFlexbox();
  // builder.buildMenuBox();
  // builder.buildSortMenu();
  let g = '#' + re;
  // if (document.getElementById('cegGraph').innerHTML === '') {

  buildGraph.buildGraph(msgArray, window.innerWidth, g);
  globalThis.NumberOfFlexBoxes++;
};

module.exports = { updatePage };
