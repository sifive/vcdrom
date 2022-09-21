// set the dimensions and margins of the graph
const margin = { top: 20, right: 0, bottom: 30, left: 40 },
  width = 460 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom, // changing this helps in changing height of the graph
  windowW = window.innerWidth;

// append the svg object to the body of the page
const svg = d3
  .select('#barGraph')
  .append('svg')
  .attr('id', 'm')
  .attr('width', windowW - margin.left - margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Parse the Data
d3.json(
  'https://gist.githubusercontent.com/anirudhsuresh/8f7c36f5964b8103d0614860e866ff9c/raw/e153d88e6c1c059cd4c98335907af0fa49094aed/output.json'
).then(function (data) {
  // sort data

  data = data.executionTimes;
  console.log(data);

  // X axis
  // Add the x Axis
  const x = d3
    .scaleBand()
    .range([0, windowW])
    .domain(data.map((d) => d.startTime))
    .padding(0.1);

  xAxis = (g) =>
    g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));
  // svg
  // .append('g')
  // /    .attr('transform', `translate(0, ${height})`)
  // .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.exeTime) + 20])
    .range([height, 0]);

  yAxis = (g) =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call((g) => g.select('.domain').remove());

  // svg
  //   .append('g')
  //   .attr('transform', `translate(${margin.right},0)`)
  //   .call(d3.axisLeft(y))
  //   .call((g) => g.select('.domain').remove());
  // .call(d3.axisLeft(y));

  function zoom(svg) {
    const extent = [
      [margin.left, margin.top],
      [width - margin.right, height - margin.top],
    ];

    svg.call(
      d3
        .zoom()
        .scaleExtent([1, 8])
        .translateExtent(extent)
        .extent(extent)
        .on('zoom', zoomed)
    );

    function zoomed(event) {
      x.range(
        [margin.left, width - margin.right].map((d) =>
          event.transform.applyX(d)
        )
      );
      svg
        .selectAll('.bars rect')
        .attr('x', (d) => x(d.name))
        .attr('width', x.bandwidth());
      svg.selectAll('.x-axis').call(xAxis);
    }
  }

  // Bars
  svg
    .selectAll('mybar')
    .data(data)
    .enter()
    .append('rect')
    .attr('id', 'exeBars')
    .attr('x', (d) => x(d.startTime))
    .attr('width', x.bandwidth())
    // no bar at the beginning thus:
    .attr('fill', '#69b3a2')
    .attr('height', (d) => height - y(0)) // always equal to 0
    .attr('y', (d) => y(0))
    .call(zoom);

  svg.append('g').attr('class', 'x-axis').call(xAxis);

  svg.append('g').attr('class', 'y-axis').call(yAxis);

  // Animation for y axis
  svg
    .selectAll('rect')
    .transition()
    .duration(800)
    .attr('y', (d) => y(d.exeTime))
    .attr('height', (d) => height - y(d.exeTime))
    .delay((d, i) => {
      // console.log(i);
      return i * 1.5;
    });
  // text label for the y axis
  svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - height / 2)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Execution Times');
});

// ----

// }
