'use strict';

const maxChunkLength = 1 << 17; // Number.MAX_SAFE_INTEGER; // 5e6; // 300000; // 1 << 23;

const getVcd = async (readers, content, inst, buildSifiveLogo) => {
  const r = readers.find(reader => reader.ext === 'vcd');
  if (r) {
    // console.log('VCD', r);
    content.innerHTML = '<div class="wd-progress"></div>';
    buildSifiveLogo.buildSifiveLogo();
    buildSifiveLogo.getVCDSize();
    document.title = r.baseName;
    
    let total = 0;
    outerLoop:
    for (let i = 0; i < 1e5; i++) {
      const { done, value } = await r.reader.read();

      if (done && (value === undefined)) {
        // console.log('the end');
        buildSifiveLogo.SetCompleted();
        inst.end();
        break outerLoop;
      }
      const len = value.length;
      for (let j = 0; j < len; j += maxChunkLength) {
        const value1 = value.slice(j, j + maxChunkLength);
        const len1 = value1.length;
        total += len1;

        // send back the total value 
        buildSifiveLogo.CalculatePercentage(total);

        // const vh = u8toStr(value1.slice(0, 100));
        // const vt = u8toStr(value1.slice(-100));
        // console.log({len1, done, total, vh, vt});

        // content.innerHTML = '<div class="wd-progress">' + total.toLocaleString() + '</div>';
        if (done && ((j + maxChunkLength) >= len)) {
          console.log('last chunk');
          buildSifiveLogo.SetCompleted();
          inst.end(value1);
          break outerLoop;
        }
        inst.write(value1);
      }
    }
  }
};

module.exports = getVcd;

/* eslint-env browser */
