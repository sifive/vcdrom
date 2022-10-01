let client = require('./wsUtil.js');

let onBarClicks = (d) => {
  console.log('i was clicked');
  console.log('my data point is', d3.select(this), d.duration, d.iteration);

  console.log('Iteration', d.iteration);
  console.log('Duration', d.duration);

  client.sendMessage('this is a click event from the graph' + d.duration);
};

module.exports = { onBarClicks };
