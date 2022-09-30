let buildGraph = require('./ceg.js');

let checkDom = () => {
  if (document.getElementById('cegGraph').innerHTML === '') {
    buildGraph.buildGraph(msgArray, window.innerWidth);
  } else {
    console.log('received another data request');
  }
};

module.exports = { checkDom };
