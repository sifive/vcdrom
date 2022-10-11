// main js file
// imports and requires

globalThis.NumberOfFlexBoxes = 1;

let scroll = require('./onScroll.js');

let Client = require('./wsClient.js');

const wsUtil = require('./wsUtil.js');

let resizer = require('./resizingGraph.js');

let buildHtml = require('./buildMainPage.js');
let s = require('./storageDict.js');
let w = require('./widthBasedScale.js');
scroll.onScroll();
let buildd = require('./cegGraph.js');
wsUtil.init(Client.wsClientInitialize());

// buildHtml.buildPage();
resizer.resizeGraphs();

//! makes the checkbox true so maybe its useful in case of the widths
// $('#brushSync').prop('checked', true);

let widths = require('./widthBasedScale.js');

const checkbox = $('#widthRace');
let currentArray = {};
checkbox.change(function (event) {
  var checkbox = event.target;

  let currentArray = {};
  if (checkbox.checked) {
    console.log(':)checked');
    console.log(widths.returnW());
    currentArray = widths.returnW();

    for (const [key, value] of Object.entries(currentArray)) {
      console.log('djdd', key, value[0], value[1]);
      svgClass = key.substring(1) + 'svg';
      d3.selectAll('.' + svgClass).remove();
      buildd.buildGraph(value[1], window.innerWidth * value[0], key);
    }
  } ///////end of if
  else {
    console.log('UN :)checked');
    //Checkbox has been unchecked
    console.log(currentArray);
    let y = s.returnStorage();
    for (const [key, value] of Object.entries(y)) {
      console.log(key, value);
      svgClass = key.substring(1) + 'svg';
      d3.selectAll('.' + svgClass).remove();
      buildd.buildGraph(value, window.innerWidth, key);
    }
  }
});

$('#loadButton').click(function () {
  p1 =
    'https://gist.githubusercontent.com/anirudhsuresh/c79bd980b008435d98385fd2fde31510/raw/de692f73832316b4eb59f18df6375e67f481e9e4/75.json';
  p2 =
    'https://gist.githubusercontent.com/anirudhsuresh/791198e39ac56be530793582f7667516/raw/b5797c16817fba0eaba0ed02110aab5dfb91553f/85.json';
  p3 =
    'https://gist.githubusercontent.com/anirudhsuresh/791198e39ac56be530793582f7667516/raw/b5797c16817fba0eaba0ed02110aab5dfb91553f/100.json';

  l = [p1, p2, p3];
  let y = s.returnStorage();

  widths.updateCurrentMax(0);
  for (let i = 0; i < 3; i++) {
    console.log(i, l[i]);

    svgClass = 'cegGraph' + (i + 1) + 'svg';
    d3.selectAll('.' + svgClass).remove();
    // console.log('#cegGraph' + i);
    idNeed = '#cegGraph' + (i + 1);
    buildd.buildGraph(l[i], window.innerWidth, idNeed);
  }
});

// export FS_ROOTDIR=~/dev-root
// export FS_WS=~/Desktop/fs-runtime
