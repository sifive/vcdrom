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
