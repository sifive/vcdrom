'use strict';

const { getT } = require('../../doppler/lib');

const rgbRegEx =
  /^rgba\((?<r>\d+)\s*,\s*(?<g>\d+)\s*,\s*(?<b>\d+)\s*,\s*(?<a>[\d\.]+)\s*\)/;

const instClickHandler = (websocket, wso) => (event) => {
  var pcAddrs = document.getElementsByClassName('pc-addr');
  const yCursor = event.clientY;
  const x = wso.pstate.xCursor;
  const count = pcAddrs.length;
  var addrCursor = 'unknown';
  const stageAttr = 'data-stage';
  let blockAddresses = [];
  //console.time();
  for (let i = 0; i < count; i++) {
    let y1 = pcAddrs[i].getBoundingClientRect().top;
    let y2 = pcAddrs[i].getBoundingClientRect().bottom;
    let addrBlock = pcAddrs[i].textContent.trim();
    if (yCursor >= y1 && yCursor <= y2) {
      addrCursor = addrBlock;
    }

    const elms = document.elementsFromPoint(x, y1 + (y2 - y1) / 2);
    const blocks = elms.filter((elm) => {
      // if (elm.className instanceof SVGAnimatedString) {
      return elm.nodeName == 'rect' && elm.hasAttribute(stageAttr);
    });

    if (blocks.length != 0) {
      let block = blocks[0];
      const colorAttr = window.getComputedStyle(block).fill;
      const mat = colorAttr.match(rgbRegEx);

      // Default to green stages if we cannot parse the color
      let colorStr = '0,255,0,128';
      if (mat != null) {
        const alpha = Math.round(Number(mat.groups.a) * 255);
        colorStr =
          mat.groups.r + ',' + mat.groups.g + ',' + mat.groups.b + ',' + alpha;
      }

      let obj = {
        stage: block.getAttribute(stageAttr),
        address: addrBlock,
        color: colorStr
      };
      blockAddresses.push(obj);
    }
  }

  let cmd = {
    command: 'reportcursorstages',
    time: getT(x, wso.pstate),
    address: addrCursor,
    stages: blockAddresses
  };

  //console.timeEnd();
  const json = JSON.stringify(cmd);
  console.log('insts', json);
  websocket.send(json);
};

module.exports = {
  instClickHandler
};
