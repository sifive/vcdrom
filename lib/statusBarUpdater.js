'use strict';

let toggleEdits = () => {
  var x = document.getElementById('editmode');
  if (x.innerHTML == 'Edit Mode: on') {
    x.style.backgroundColor = 'rgb(262, 63, 78)';
  } else {
    x.style.backgroundColor = 'rgb(66, 66, 66)';
  }
};

let toggleNavs = () => {
  var x = document.getElementById('navsync');
  const backgroundColor = x.style.backgroundColor;
  if (x.innerHTML === 'NavSync: off') {
    x.style.backgroundColor = 'rgb(66, 66, 66)';
  } else {
    x.style.backgroundColor = 'rgb(262, 63, 78)';
  }
};

let toggleCurs = () => {
  var x = document.getElementById('cursync');
  if (x.innerHTML === 'CurSync: abs') {
    x.style.backgroundColor = 'rgb(262, 63, 78)';
  } else if (x.innerHTML === 'CurSync: rel') {
    x.style.backgroundColor = 'rgb(262, 63, 78)';
  } else {
    x.style.backgroundColor = 'rgb(66, 66, 66)';
  }
};

let updateCModeColors = () => {
  var x = document.getElementById('cmode');
  if (x.innerHTML == 'CMode: click') {
    x.style.backgroundColor = 'rgb(262, 63, 78)';
  } else {
    x.style.backgroundColor = 'rgb(66, 66, 66)';
  }
};

module.exports = {
  toggleEdits,
  toggleCurs,
  toggleNavs,
  updateCModeColors,
};
