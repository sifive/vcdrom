// file for event clicks
let keyPress = require('./clickEvent.js');
let storage = require('./storageDict.js');

let graphTitle = 'Experiment 1';
let defaultColor = '#FF6666';
let exeKey = 'executions';
let experimentName = 'experimentName';
let X = 'iteration';
let Y = 'duration';

let buildGraph = (dataUrl1, currentWidth, currentDiv) => {
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

    var margin = { top: 50, right: 60, bottom: 80, left: 60 },
      margin2 = { top: 140, right: 60, bottom: 20, left: 60 },
      height = 200 - margin.top - margin.bottom,
      height2 = 200 - margin2.top - margin2.bottom,
      width = currentWidth - margin.left - margin.right;

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
        return d[X];
      })
    );
    y.domain([
      0,
      d3.max(data, function (d) {
        return d[Y];
      }),
    ]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    // initialize our brush for the d3
    var brush = d3.svg.brush().x(x2).on('brush', brushed);

    // now select the div where you want to render the graph and then create a svg having some width and height
    // the height and widths are derived from the margins defined earlier
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

    focus
      .selectAll('line.horizontalGrid')
      .data(y.ticks(6))
      .enter()
      .append('line')
      .attr({
        class: 'horizontalGrid',
        x1: width,
        x2: 1,
        y1: function (d) {
          return y(d);
        },
        y2: function (d) {
          return y(d);
        },
        fill: 'none',
        'shape-rendering': 'crispEdges',
        // stroke: 'white',
        'stroke-width': '1px',
      });

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
          return x(d[X]);
        },
        y: function (d) {
          return y(d[Y]);
        },
      })
      .style('fill', function (d) {
        if (d[Y] <= 600) {
          return 'yellow';
        } else {
          return defaultColor;
        }
      })
      // .style('fill', 'green')
      // graph interactions like moving over it and clicking it
      .on('mouseover', function (d) {
        d3.select(this).style('fill', 'green');
        d3.select(this).style('box shadow', '0px 2px 8px 1px #25deaa;');
        tooltip
          .html(`<div>Duration: ${d[Y]}</div><div>Iteration: ${d[X]}</div>`)
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
          return height - y(d[Y]);
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
          return x2(d[X]);
        },
        y: function (d) {
          return y2(d[Y]);
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
          return height2 - y2(d[Y]);
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

      var start;
      var end;

      console.log('this is brush extent', brush.extent()[0], brush.extent()[1]);
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
          return d[X];
        });

      focus.select('.x.axis').call(xAxis.tickValues(filteredTickValues));
      focus.select('.y.axis').call(yAxis);
    }

    function update(data) {
      x.domain(
        data.map(function (d) {
          return d[X];
        })
      );
      y.domain([
        0,
        d3.max(data, function (d) {
          return d[Y];
        }),
      ]);

      var bars = focus.selectAll('.bar');
      bars
        .data(data)
        .attr({
          height: function (d, i) {
            return height - y(d[Y]);
          },
          width: function (d) {
            return x.rangeBand();
          },
          x: function (d) {
            return x(d[X]);
          },
          y: function (d) {
            return y(d[Y]);
          },
        })
        .on('mouseover', function (d) {
          d3.select(this).style('fill', 'green');
          tooltip
            .html(`<div>Duration: ${d[Y]}</div><div>Iteration: ${d[X]}</div>`)
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

      // update the global variable
      updateBrush = brush.extent();

      updatedData = data;
    }

    function exit(data) {
      var bars = focus.selectAll('.bar').data(data);
      bars.exit().remove();
    }

    function enter(data) {
      // create data scales and domain
      x.domain(
        data.map(function (d) {
          return d[X];
        })
      );
      y.domain([
        0,
        d3.max(data, function (d) {
          return d[Y];
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
            return x(d[X]);
          },
          y: function (d) {
            return y(d[Y]);
          },
        })
        .on('mouseover', function (d) {
          d3.select(this).style('fill', 'green');
          tooltip
            .html(`<div>Duration: ${d[Y]}</div><div>Iteration: ${d[X]}</div>`)
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

    d3.select(currentDiv + 'S').on('change', change);
    // sorting

    function change() {
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
              return d[Y];
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
              return d[Y];
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
          return x0(d[Y]);
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
          return xSubBars(d[Y]);
        });

      transition.select('.x.axis').call(xAxis).delay(delay);
    }
    function changeBrush(first, end) {
      if (0 >= first) {
        first = 0;
      }
      if (end >= width) {
        end = width;
      }

      brush.extent([first, end]);
      brush(d3.select(currentDiv).select('.brush').transition());
      brush.event(d3.select('.brush').transition().delay(800));
    }

    // input for coloring

    let listenForThValue = (d3) => {
      d3.select('#thValue').on('input', function () {
        console.log(+this.value);
        let Thr = +this.value;
        // update the whole chart
        // Update the bar if the item in data is modified and already linked to a .bar element
        d3.selectAll('.bar')
          .transition()
          .duration(1000)
          .style('fill', function (d) {
            if (d[Y] <= Thr) {
              return 'yellow';
            } else {
              return defaultColor;
            }
          });
      });
    };
    listenForThValue(d3);

    $(currentDiv).keydown(function (evt) {
      evt = evt || window.event;

      console.log('this is the inner width', width);
      console.log('this is the current brush width', brush.extent());
      switch (evt.keyCode) {
        case 81: {
          changeBrush(0, width);
          break;
        }
        case 83: {
          // ? reduce the zoom brush by 10 px of width
          console.log('s is pressed');
          changeBrush(brush.extent()[0] + 10, brush.extent()[1] - 10);
          break;
        }
        case 65: {
          changeBrush(brush.extent()[0] - 10, brush.extent()[1] - 10);
          break;
        }
        case 68: {
          changeBrush(brush.extent()[0] + 10, brush.extent()[1] + 10);
          break;
        }
        case 87: {
          changeBrush(brush.extent()[0] - 10, brush.extent()[1] + 10);
          break;
        }
      }
    });
  });
  // end function
};

module.exports = { buildGraph };
