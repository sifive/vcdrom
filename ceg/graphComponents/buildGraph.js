let buildSvg = (currentDiv, svgClass, actualWidth, actualHeight) => {
  var svg = d3
    .select(currentDiv)
    .append('svg')
    .attr('class', svgClass)
    .attr('width', actualWidth)
    .attr('height', actualHeight);

  return svg;
};

let buildFocusSvg = (svg, margin) => {
  // focus is the variable for the larger bar graph
  var focus = svg
    .append('g')
    .attr('class', 'focus')
    // last attribute is where the graph should be placed within the svg defined above
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  return focus;
};

let buildCSvg = (svg, margin2) => {
  // context is the draggable mini bar graphs
  var context = svg
    .append('g')
    .attr('class', 'context')
    .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')');

  return context;
};

module.exports = { buildSvg, buildFocusSvg, buildCSvg };
