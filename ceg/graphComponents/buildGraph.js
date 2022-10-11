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

// old code for adding inline svg buttons
// // vis is the main svg maybe>=?
// var expl_text = svg
//   .append('g')
//   .attr('id', 'buttons_group')
//   .attr('transform', 'translate(' + 40 + ',' + 10 + ')');

// // zoom button sizing
// var button_width = 40,
//   button_height = 14,
//   button_padding = 10;

// var button_data = ['Sort'];

// var button_count = button_data.length - 1,
//   button_g_width =
//     button_count * button_width +
//     button_count * button_padding +
//     margin.right -
//     button_padding;

// expl_text
//   .append('text')
//   .attr('class', 'zoomto_text')
//   .text('Menu')
//   .style('text-anchor', 'start')
//   // .attr('x', width)
//   // .attr('y', margin.top / 2)
//   .attr(
//     'transform',
//     'translate(' + (width - button_g_width - 55) + ',' + 14 + ')'
//   )
//   .style('opacity', '1');

// var button = expl_text
//   .selectAll('g')
//   .data(button_data)
//   .enter()
//   .append('g')
//   .attr('class', 'scale_button')
//   .attr('transform', function (d, i) {
//     return (
//       'translate(' +
//       (width - button_g_width + i * button_width + i * button_padding) +
//       ',4)'
//     );
//   })
//   .style('opacity', '1');
// button
//   .append('rect')
//   .attr('class', 'button_rect')
//   .attr('width', button_width)
//   .attr('height', button_height)
//   .attr('rx', 1)
//   .attr('ry', 1);

// button
//   .append('text')
//   .attr('class', 'button_rect_text')
//   .attr('dy', button_height / 2 + 3)
//   .attr('dx', button_width / 2)
//   .style('text-anchor', 'middle')
//   .style('color', 'white')
//   .text(function (d) {
//     return d;
//   });

// svg
//   .selectAll('.scale_button')
//   .style('cursor', 'pointer')
//   .on('click', console.log('working sort button'));

// // $('.scale_button');
// $('.scale_button').click(function () {
//   change();
// });
// // ----
