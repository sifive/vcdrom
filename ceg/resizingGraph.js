let buildd = require('./cegGraph.js');
let s = require('./storageDict.js');
let resizeGraphs = () => {
  var resizeTimer;
  $(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // $('#SortButton').toggleClass('sortButton');

      let y = s.returnStorage();
      for (const [key, value] of Object.entries(y)) {
        svgClass = key.substring(1) + 'svg';
        d3.selectAll('.' + svgClass).remove();
        buildd.buildGraph(value, window.innerWidth, key);
      }
    }, 200);
  });
};
module.exports = { resizeGraphs };
