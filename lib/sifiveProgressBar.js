'use strict';
// const stringify = require('onml/stringify.js');

let totalVcdSize;

let buildSifiveLogo = () => {
  let sifiveLogo = document.createElement('div');
  sifiveLogo.className = 'sifive-logo';
  sifiveLogo.innerHTML = `
   
      <div id="sifiveLogoimg" class="one">
            <img src="sifive-logo-white.png" alt="SiFive" />
      </div>
    <div class="progress-container">
      <div class="progress-bar">
        <div class="completed-bar" >
          <hr class="completed-bar__dashed" />

          <svg
            class="sifiveLogo"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="24.75"
            height="20"
            version="1.1"
            viewBox="0 0 39.5 40"
          >
            <path
              d="M5.17749553,20.7048794 L10.648873,3.98080429 L31.6145259,3.98080429 L33.7424329,10.4870777 L15.2226118,10.4870777 L14.0381753,14.1780161 L34.949517,14.1780161 L38.0932379,23.7904558 L21.1316995,36.1159249 L5.01187835,24.3958177 L15.8968873,24.3958177 L21.0837209,28.1668633 L31.3470483,20.7088472 L5.17749553,20.7048794 L5.17749553,20.7048794 Z M34.142254,0.0129758713 L8.1211449,0.0129758713 L0.0800715564,24.7221448 L21.1316995,39.9870241 L42.1833274,24.7166756 L34.142254,0.0129758713 L34.142254,0.0129758713 Z"
              fill="white"
            ></path>
            <path fill="white" d="" transform="translate(47.5, 4)"></path>
            <path fill="black" d="" transform="translate(49.5, 4)"></path>
          </svg>
        </div>
      </div>
    </div>
                </div>
          </div>
        </div>
    </div>`;
  // return sifiveLogo;
  document.getElementsByClassName('wd-progress')[0].appendChild(sifiveLogo);
};

let getVCDSize = () => {
  // https://stackoverflow.com/a/901144
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  });
  totalVcdSize = params.vcdsize;

  console.log('this is total vcd size ', totalVcdSize);

  // return params.vcdsize;
};

let SetCompleted = () => {
  const progress = document.querySelector('.completed-bar');
  progress.style.width = '98%';
};

let CalculatePercentage = (total) => {
  console.log('this is total and vcd size ', total, totalVcdSize);
  let percentage = Math.round((total / totalVcdSize) * 100);
  console.log('this is percentage ', percentage);

  UpdateProgress(percentage);

  // console.log('vcd size', totalVcdSize);
};

let UpdateProgress = (percentage) => {
  const progress = document.querySelector('.completed-bar');
  // this is to set the progress bar
  if (progress) {
    if (percentage > 96) {
      SetCompleted();
    } else {
      progress.style.width = percentage.toString() + '%';
    }
    progress.style.opacity = 0.7;
    // also set the opacity of the logo
    document.getElementById('sifiveLogoimg').style.opacity = percentage / 100;
  }
};

module.exports = {
  buildSifiveLogo,
  getVCDSize,
  CalculatePercentage,
  SetCompleted
};
