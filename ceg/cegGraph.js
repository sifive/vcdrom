// file for event clicks
let keyPress = require('./clickEvent.js');
let storage = require('./storageDict.js');

let graphTitle = 'Experiment 1';
let defaultColor = 'lightcoral';

let buildGraph = (dataUrl1, currentWidth, currentDiv) => {
  console.log(
    'this is the current div of the html :)',
    dataUrl1,
    currentWidth,
    currentDiv
  );
  let exeKey = 'executions';
  let experimentName = 'experimentName';

  console.log('this os the data', dataUrl1);
  d3.json(dataUrl1, function (error, data) {
    if (error) {
      // check for any errors where the file is not fed
    }
    // just to check if the json file has a key with the experiment name
    if (data.hasOwnProperty([experimentName])) {
      graphTitle = data[experimentName];
    }

    // get the data which is within the key 'experimentName'
    data = data[exeKey];

    storage.storeInto(currentDiv, dataUrl1);
    let updatedData = data;

    // margins for both the bars
    // this sets margins for both smaller and larger bar graphs
    var margin = { top: 30, right: 40, bottom: 100, left: 60 },
      margin2 = { top: 230, right: 40, bottom: 20, left: 60 },
      width = currentWidth - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom,
      height2 = 300 - margin2.top - margin2.bottom;

    // scales for both the bars
    // x,y for the larger bar and x2.y2 for the smaller bars
    // transform the data into visual scales which can build the start and end points for the axis(s)
    var x = d3.scale.ordinal().rangeBands([0, width], 0.1),
      x2 = d3.scale.ordinal().rangeBands([0, width], 0.1),
      y = d3.scale.linear().range([height, 0]),
      y2 = d3.scale.linear().range([height2, 0]);

    // build the axis and specify where they should be positioned
    var xAxis = d3.svg.axis().scale(x).orient('bottom'),
      xAxis2 = d3.svg.axis().scale(x2).orient('bottom').tickValues([]), // this is why the tick values are not show in mini map
      yAxis = d3.svg.axis().scale(y).orient('left');

    // The purpose of these portions of the script is to ensure that the data we ingest fits onto our graph correctly
    x.domain(
      data.map(function (d) {
        return d.iteration;
      })
    );
    y.domain([
      0,
      d3.max(data, function (d) {
        return d.duration;
      }),
    ]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    // initialize our brush for the d3
    var brush = d3.svg.brush().x(x2).on('brush', brushed);

    // now select the div where you want to render the graph and then create a svg having some width and height
    // the height and widths are derived from the margins defined earlier

    // .attr("viewBox", `0 0 ${widthValue} ${heightValue}`)
    // let widthValue = width + margin.left + margin.right;
    // let heightValue = height + margin.top + margin.bottom;
    let svgClass = currentDiv.substring(1) + 'svg';
    var svg = d3
      .select(currentDiv)
      .append('svg')
      .attr('class', svgClass)
      // .attr('preserveAspectRatio', 'xMinYMin meet')
      // .attr('viewBox', `0 0 ${widthValue} ${heightValue}`);
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    // focus is the variable for the larger bar graph
    var focus = svg
      .append('g')
      .attr('class', 'focus')
      // last attribute is where the graph should be placed within the svg defined above
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // x axis text label
    svg
      .append('text') // text label for the x axis
      .attr(
        'transform',
        'translate(' + width / 2 + ' ,' + (height + margin.bottom + 25) + ')'
      )
      .style('text-anchor', 'middle')
      .style('font', '14px times')
      .text('Iterations');

    // Add the text label for the Y axis
    svg
      .append('text')
      // .attr('y', margin.top + 10)
      // .attr('x', margin.left + 28)
      .attr('y', 4)
      // .attr('x', height)
      .attr('x', margin.top - 150)
      // .attr('x', margin.left)
      .attr('dy', '.75em')
      .attr('transform', 'rotate(-90)')
      .style('text-anchor', 'middle')
      .style('font', '14px times')
      .text('Duration Cycles');

    // title of the graph exp name
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('text-decoration', 'underline')
      .text(graphTitle);

    // context is the draggable mini bar graph

    var context = svg
      .append('g')
      .attr('class', 'context')
      .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')');

    // creates and returns a function that appends the SVG elements to display the axis. I
    focus
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis); //if you don't call the function that is returned, these x axis for example elements will not be added.

    focus.append('g').attr('class', 'y axis').call(yAxis);

    // the tooltip is defined here
    tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('padding', '10px')
      .style('background', 'rgba(0,0,0,0.6)')
      .style('border-radius', '4px')
      .style('color', '#fff')
      .text('a simple tooltip');

    // ? unsure of this line need to check it
    var bars = focus.selectAll('.bar').data(data);

    // the main bar graph is defined here
    bars
      .enter()
      .append('rect')
      .attr('id', 'mainBars')
      .classed('bar', true)
      .attr({
        height: function (d, i) {
          return 0;
        },
        width: function (d) {
          return x.rangeBand();
        },
        x: function (d) {
          return x(d.iteration);
        },
        y: function (d) {
          return y(d.duration);
        },
      })
      // .style('fill', 'green')
      // graph interactions like moving over it and clicking it
      .on('mouseover', function (d) {
        d3.select(this).style('fill', 'green');
        d3.select(this).style('box shadow', '0px 2px 8px 1px #25deaa;');
        tooltip
          .html(
            `<div>Duration: ${d.duration}</div><div>Iteration: ${d.iteration}</div>`
          )
          .style('visibility', 'visible');
      })
      .on('mousemove', function () {
        tooltip
          .style('top', d3.event.pageY - 10 + 'px')
          .style('left', d3.event.pageX + 10 + 'px');
      })
      .on('mouseout', function (d) {
        tooltip.html(``).style('visibility', 'hidden');
        d3.select(this)
          .transition('colorfade')
          .duration(250)
          .style('fill', 'lightcoral');
      })
      .on('click', function (d) {
        keyPress.onBarClicks(d);
      });

    bars
      .transition()
      .duration(600)
      .delay(function (d, i) {
        return i * 7;
      })
      .attr({
        height: function (d, i) {
          return height - y(d.duration);
        },
      });

    // before the functions start

    enter(data);
    updateScale(data);

    // smaller mini map bars
    var subBars = context.selectAll('.subBar').data(data);

    subBars
      .enter()
      .append('rect')
      .classed('subBar', true)
      .attr({
        height: function (d) {
          return 0;
        },
        width: function (d) {
          return x.rangeBand();
        },
        x: function (d) {
          return x2(d.iteration);
        },
        y: function (d) {
          return y2(d.duration);
        },
      });

    // subBars transition
    subBars
      .transition()
      .duration(600)
      .delay(function (d, i) {
        return i * 7;
      })
      .attr({
        height: function (d, i) {
          return height2 - y2(d.duration);
        },
      });

    context
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height2 + ')')
      .call(xAxis2);

    context
      .append('g')
      .attr('class', 'x brush')
      .call(brush)
      .selectAll('rect')
      .attr('y', -6)
      .attr('height', height2 + 7);

    function brushed() {
      var selected = null;
      selected = x2.domain().filter(function (d) {
        return brush.extent()[0] <= x2(d) && x2(d) <= brush.extent()[1];
      });
      // console.log('this is brush extent', brush.extent());
      var start;
      var end;

      if (brush.extent()[0] != brush.extent()[1]) {
        start = selected[0];
        end = selected[selected.length - 1] + 1;
      } else {
        start = 0;
        end = data.length;
      }

      var updatedData = data.slice(start, end);

      update(updatedData);
      enter(updatedData);
      exit(updatedData);
      updateScale(updatedData);
    }

    function updateScale(data) {
      var tickScale = d3.scale
        .pow()
        .range([data.length / 10, 0])
        .domain([data.length, 0])
        .exponent(0.5);

      var brushValue = brush.extent()[1] - brush.extent()[0];
      if (brushValue === 0) {
        brushValue = width;
      }

      var tickValueMultiplier = Math.ceil(Math.abs(tickScale(brushValue)));
      var filteredTickValues = data
        .filter(function (d, i) {
          return i % tickValueMultiplier === 0;
        })
        .map(function (d) {
          return d.iteration;
        });

      focus.select('.x.axis').call(xAxis.tickValues(filteredTickValues));
      focus.select('.y.axis').call(yAxis);
    }

    function update(data) {
      // console.log('updated data', data);
      x.domain(
        data.map(function (d) {
          return d.iteration;
        })
      );
      y.domain([
        0,
        d3.max(data, function (d) {
          return d.duration;
        }),
      ]);

      var bars = focus.selectAll('.bar').data(data);
      bars
        .attr({
          height: function (d, i) {
            return height - y(d.duration);
          },
          width: function (d) {
            return x.rangeBand();
          },
          x: function (d) {
            return x(d.iteration);
          },
          y: function (d) {
            return y(d.duration);
          },
        })
        .on('mouseover', function (d) {
          d3.select(this).style('fill', 'green');
          tooltip
            .html(
              `<div>Duration: ${d.duration}</div><div>Iteration: ${d.iteration}</div>`
            )
            .style('visibility', 'visible');
        })
        .on('mousemove', function () {
          tooltip
            .style('top', d3.event.pageY - 10 + 'px')
            .style('left', d3.event.pageX + 10 + 'px');
        })
        .on('mouseout', function (d) {
          tooltip.html(``).style('visibility', 'hidden');
          d3.select(this)
            .transition('colorfade')
            .duration(250)
            .style('fill', 'lightcoral');
        });

      // update the global variable
      updateBrush = brush.extent();

      updatedData = data;
      flag = 0;
    }

    function exit(data) {
      var bars = focus.selectAll('.bar').data(data);
      bars.exit().remove();
    }

    function enter(data) {
      // create data scales and domain
      x.domain(
        data.map(function (d) {
          return d.iteration;
        })
      );
      y.domain([
        0,
        d3.max(data, function (d) {
          return d.duration;
        }),
      ]);

      // build bars
      var bars = focus.selectAll('.bar').data(data);

      bars
        .enter()
        .append('rect')
        .classed('bar', true)
        .attr({
          height: function (d, i) {
            return 0;
          },
          width: function (d) {
            return x.rangeBand();
          },
          x: function (d) {
            return x(d.iteration);
          },
          y: function (d) {
            return y(d.duration);
          },
        })
        .on('mouseover', function (d) {
          d3.select(this).style('fill', 'green');
          tooltip
            .html(
              `<div>Duration: ${d.duration}</div><div>Iteration: ${d.iteration}</div>`
            )
            .style('visibility', 'visible');
        })
        .on('mousemove', function () {
          tooltip
            .style('top', d3.event.pageY - 10 + 'px')
            .style('left', d3.event.pageX + 10 + 'px');
        })
        .on('mouseout', function (d) {
          tooltip.html(``).style('visibility', 'hidden');
          d3.select(this)
            .transition('colorfade')
            .duration(250)
            .style('fill', defaultColor);
        });
    }

    d3.select('input').on('change', change);
    // sorting

    function change() {
      // data = updatedData;
      var x0 = x
        .domain(
          updatedData
            .sort(
              this.checked
                ? function (a, b) {
                    return a.duration - b.duration;
                  }
                : function (a, b) {
                    return d3.descending(a.duration, b.duration);
                  }
            )
            .map(function (d) {
              return d.duration;
            })
        )
        .copy();

      var xSubBars = x
        .domain(
          data
            .sort(
              this.checked
                ? function (a, b) {
                    return a.duration - b.duration;
                    // return b.duration - a.duration;
                  }
                : function (a, b) {
                    return d3.descending(a.duration, b.duration);
                  }
            )
            .map(function (d) {
              return d.duration;
            })
        )
        .copy();

      svg.selectAll('.bar').sort(function (a, b) {
        return x0(a.duration) - x0(b.duration);
      });

      var transition = svg.transition().duration(750),
        delay = function (d, i) {
          return i * 5;
        };

      transition
        .selectAll('.bar')
        .delay(delay)
        .attr('x', function (d) {
          return x0(d.duration);
        });

      // subBar;

      svg.selectAll('.subBar').sort(function (a, b) {
        return xSubBars(a.duration) - xSubBars(b.duration);
      });

      var transition = svg.transition().duration(750),
        delay = function (d, i) {
          return i * 5;
        };

      transition
        .selectAll('.subBar')
        .delay(delay)
        .attr('x', function (d) {
          return xSubBars(d.duration);
        });

      transition.select('.x.axis').call(xAxis).delay(delay);
    }
    function change1() {
      brush.extent([0, 6]);

      brush(d3.select('.brush').transition());

      brush.event(d3.select('.brush').transition().delay(1000));
    }
    // // buttons for programmatically brush tru the graph
    // d3.select('#sortAscending').on('click', change1);
    // d3.select('#programBrush').on('click', change1);

    // input for coloring
  });
  // end function
};

module.exports = { buildGraph };
