'use strict';

const xOffsetUpdate = require('@wavedrom/doppler/lib/x-offset-update.js');
const xScaleUpdate = require('@wavedrom/doppler/lib/x-scale-update.js');
const wsCursor = require('./wsCursors.js');
const wsStages = require('./wsStages.js');

const yScroll = (delta) => (pstate, cm) => {
  const info = cm.getScrollInfo();
  cm.scrollTo(null, info.top + info.clientHeight * delta);
  return false;
};

const pluso = {
  desc: 'x zoom in',
  fn: (pstate) => {
    pXScale = -1;
    return xScaleUpdate(pstate, (3 / 2) * pstate.xScale);
  }
};

const minuso = {
  desc: 'x zoom out',
  fn: (pstate) => {
    pXScale = -1;
    return xScaleUpdate(pstate, (2 / 3) * pstate.xScale);
  }
};

const fullo = {
  desc: 'full x zoom',
  fn: (pstate) => {
    pXScale = -1;
    return xScaleUpdate(pstate, pstate.xScaleMin);
  }
};

var pXScale = -1;
var pXOffset;

function toggleXScale(pstate) {
  if (pXScale != -1) {
    xScaleUpdate(pstate, pXScale);
    xOffsetUpdate(pstate, pXOffset);
    pXScale = -1;
  } else {
    pXScale = pstate.xScale;
    pXOffset = pstate.xOffset;
    xScaleUpdate(pstate, pstate.xScaleMin);
  }
  return true;
}

const toggle_fullo = {
  desc: 'toggle full zoom',
  fn: (pstate) => toggleXScale(pstate) //pstate, toggleXScale())
};

const scroll = {
  left: {
    desc: 'scroll left',
    fn: (pstate) => xOffsetUpdate(pstate, pstate.xOffset + 0.2 * pstate.width)
  },
  right: {
    desc: 'scroll right',
    fn: (pstate) => xOffsetUpdate(pstate, pstate.xOffset - 0.2 * pstate.width)
  },
  left1: {
    desc: 'scroll left 1 block',
    fn: (pstate) => xOffsetUpdate(pstate, pstate.xOffset + 2 * pstate.xScale)
  },
  right1: {
    desc: 'scroll right 1 block',
    fn: (pstate) => xOffsetUpdate(pstate, pstate.xOffset - 2 * pstate.xScale)
  },
  leftp: {
    desc: 'scroll left 1 page',
    fn: (pstate) => xOffsetUpdate(pstate, pstate.xOffset + pstate.width)
  },
  rightp: {
    desc: 'scroll right 1 page',
    fn: (pstate) => xOffsetUpdate(pstate, pstate.xOffset - pstate.width)
  },
  up: {
    desc: 'scroll up',
    fn: yScroll(-0.1)
  },
  down: {
    desc: 'scroll down',
    fn: yScroll(0.1)
  }
};

const editable = {
  fn: (pstate, cm) => {}
};

const stepback = {
  fn: (pstate, cm) => {
    var newXCursor = (pstate.xCursor = pstate.xCursor - 2 * pstate.xScale);

    if (newXCursor < pstate.sidebarWidth + 3 * pstate.xScale) {
      xOffsetUpdate(pstate, pstate.xOffset + 2 * pstate.xScale);
      pstate.xCursor = pstate.xCursor + 2 * pstate.xScale;
    } else {
      pstate.xCursor = newXCursor;
    }
    wsStages.updateClickCursor();
    wsCursor.setMouseCursorToX(pstate.xCursor);

    return true;
  }
};

const stepforward = {
  fn: (pstate, cm) => {
    var newXCursor = pstate.xCursor + 2 * pstate.xScale;

    if (newXCursor > pstate.width - 3 * pstate.xScale) {
      xOffsetUpdate(pstate, pstate.xOffset - 2 * pstate.xScale);
    } else {
      pstate.xCursor = newXCursor;
    }
    wsStages.updateClickCursor();
    wsCursor.setMouseCursorToX(pstate.xCursor);

    return true;
  }
};

const centercursor = {
  fn: (pstate, cm) => {
    let xCur = pstate.xCursor;
    xCur += pstate.xOffset;
    let xMid = pstate.xOffset + pstate.width / 2;
    let xDelta = xCur - xMid;

    pstate.xCursor = pstate.xCursor - xDelta;
    xOffsetUpdate(pstate, pstate.xOffset - xDelta);

    return true;
  }
};

module.exports = {
  zoomIn: pluso,
  zoomOut: minuso,

  'Alt+/': editable,

  'Alt+j': stepback,
  'Alt+l': stepforward,
  'Alt+k': centercursor,

  // ALT +  -  +
  'Alt+=': pluso, // '+': pluso,  '=': pluso,
  'Alt+-': minuso, // '-': minuso, '_': minuso,

  // Alt +  [  ]      home / end
  'Alt+[': {
    desc: 'jump to x beginning',
    fn: (pstate) => xOffsetUpdate(pstate, pstate.sidebarWidth)
  }, // Home
  'Alt+]': {
    desc: 'jump to x end',
    fn: (pstate) =>
      xOffsetUpdate(pstate, pstate.width - pstate.xScale * pstate.time)
  }, // End

  // Alt +  <,  >.    left / right
  'Alt+,': scroll.left,
  'Shift+Alt+<': scroll.left1,
  'Ctrl+Alt+,': scroll.leftp,
  scrollLeft: scroll.left,

  'Alt+.': scroll.right,
  'Shift+Alt+>': scroll.right1,
  'Ctrl+Alt+.': scroll.rightp,
  scrollRight: scroll.right,

  'Alt+0': toggle_fullo, // 'Shift+f': fullo, F: fullo, 'Shift+F': fullo,
  //'Alt+9': toggle_fullo,

  // CAN'T DO: Alt + e, d, f, l

  // ArrowUp:    scroll.up,    'Shift+ArrowUp':    scroll.up,
  // ArrowDown:  scroll.down,  'Shift+ArrowDown':  scroll.down,

  // PageUp:     {desc: 'scroll page up',    fn: yScroll(-1)},
  // PageDown:   {desc: 'scroll page down',  fn: yScroll(1)},

  nop: { fn: () => false }
};
