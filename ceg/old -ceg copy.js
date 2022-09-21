// 'use strict';

// d3 = require('d3');

// margins & height
const margin = { top: 30, right: 40, bottom: 70, left: 50 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom,
  windowW = window.innerWidth;

// y axis
yAxis = (g) =>
  g
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call((g) => g.select('.domain').remove());

// x axis
xAxis = (g) =>
  g
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

d3.json(
  'https://gist.githubusercontent.com/anirudhsuresh/8f7c36f5964b8103d0614860e866ff9c/raw/e153d88e6c1c059cd4c98335907af0fa49094aed/output.json'
).then(function (data) {
  console.log(data);
  data = data.executionTimes;
  console.log('this is the data we have read', data);

  y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.exeTimes)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // x variable
  x = d3
    .scaleBand()
    .domain(data.map((d) => d.startTime))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  // ----

  const svg = d3.create('svg').attr('viewBox', [0, 0, width, height]);
  // .call(zoom);

  svg
    .append('g')
    .attr('class', 'bars')
    .attr('fill', 'steelblue')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d) => x(d.startTime))
    .attr('y', (d) => y(d.exeTimes))
    // .attr('height', (d) => height - y(d.exeTimes)) // always equal to 0
    .attr('height', (d) => 30)
    .attr('width', x.bandwidth());

  svg.append('g').attr('class', 'x-axis').call(xAxis);

  svg.append('g').attr('class', 'y-axis').call(yAxis);

  svg.node();
  d3.select('#barGraph').append('svg');
});
// ----

// }
