let keyPress = require('./clickEvent');

let graphTitle = 'Experiment 1';
let defaultColor = 'lightcoral';
let buildGraph = (dataUrl1, currentWidth) => {
  let exeKey = 'executions';
  let experimentName = 'experimentName';
  let flag = 0;

  let updateBrush;

  d3.json(dataUrl1, function (error, data) {
    if (error) {
      var newHTag = document.createElement('h4');
      newHTag.innerHTML = 'Please Click On FS to Send in Data to Draw Graphs';
      newHTag.setAttribute('id', 'dataReq');
      // throw error;
    }
    // console.log('this is data', data[experimentName]);

    if (data.hasOwnProperty([experimentName])) {
      graphTitle = data[experimentName];
    }
    // removing h4 tag
    let helpTag = document.getElementById('dataReq');
    helpTag.remove();

    data = data[exeKey];
    let updatedData = data;
    // margins for both the bars
    var margin = { top: 30, right: 40, bottom: 100, left: 60 },
      margin2 = { top: 230, right: 40, bottom: 20, left: 60 },
      width = currentWidth - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom,
      height2 = 300 - margin2.top - margin2.bottom;

    // scales for both the bars
    var x = d3.scale.ordinal().rangeBands([0, width], 0.1),
      x2 = d3.scale.ordinal().rangeBands([0, width], 0.1),
      y = d3.scale.linear().range([height, 0]),
      y2 = d3.scale.linear().range([height2, 0]);

    var xAxis = d3.svg.axis().scale(x).orient('bottom'),
      xAxis2 = d3.svg.axis().scale(x2).orient('bottom').tickValues([]), // this is why the tick values are not show in mini map
      yAxis = d3.svg.axis().scale(y).orient('left');

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

    var brush = d3.svg.brush().x(x2).on('brush', brushed);

    var svg = d3
      .select('#cegGraph')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    var focus = svg
      .append('g')
      .attr('class', 'focus')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // x axis label
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

    // context is the draggable mini bar
    // focus is the bars

    var context = svg
      .append('g')
      .attr('class', 'context')
      .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')');

    focus
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    focus.append('g').attr('class', 'y axis').call(yAxis);

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

    var bars = focus.selectAll('.bar').data(data);
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
        console.log('i was clicked');
        console.log(
          'my data point is',
          d3.select(this),
          d.duration,
          d.iteration
        );
        console.log('Iteration', d.iteration);
        console.log('Duration', d.duration);
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
