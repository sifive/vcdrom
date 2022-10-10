let buildFlexbox = () => {
  // build the flexbox for the graphs
  let divId = 'cegGraph' + globalThis.NumberOfFlexBoxes;

  $('#mainCl').append(
    $('<div>')
      .addClass('column')
      .attr('id', globalThis.NumberOfFlexBoxes)
      .append($('<div>').attr('id', divId).attr('tabindex', 0))
  );

  return divId;
};

let buildCheckBox = (divId) => {
  $('#' + divId).append(
    $(document.createElement('input')).attr({
      id: divId + 'S',
      class: 'checkboxS',
      name: 'myCheckbox',
      value: 'myValue',
      type: 'checkbox',
    })
  );
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

module.exports = { buildFlexbox, buildMenuBox, buildSortMenu, buildCheckBox };
