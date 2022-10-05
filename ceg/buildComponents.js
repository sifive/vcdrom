let buildFlexbox = () => {
  // build the flexbox for the graphs
  let divId = 'cegGraph' + globalThis.NumberOfFlexBoxes;

  $('#mainCl').append(
    $('<div>')
      .addClass('column')
      .attr('id', globalThis.NumberOfFlexBoxes)
      .append($('<div>').attr('id', divId))
  );

  return divId;
};
let buildMenuBox = () => {
  $('#experimentMenu').append(
    $('<div>')
      .addClass('dropdown-item')
      .append(
        $('<a>')
          .attr('href', 'cegGraph' + globalThis.NumberOfFlexBoxes)
          .text(globalThis.NumberOfFlexBoxes)
      )
  );
};

let buildSortMenu = () => {
  $('#sortMenu').append(
    $('<div>')
      .addClass('dropdown-item')
      .append(
        $('<a>')
          .attr('href', 'cegGraph' + globalThis.NumberOfFlexBoxes)
          .text('Sort' + '-' + globalThis.NumberOfFlexBoxes)
      )
  );
};

module.exports = { buildFlexbox, buildMenuBox, buildSortMenu };
