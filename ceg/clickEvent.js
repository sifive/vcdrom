let client = require('./wsUtil.js');

let sendToPV = (inputToSend) => {
  if (inputToSend === undefined) {
    console.log('working and finding out undefined');
  } else {
    console.log('Show in Pipeline Viewer', inputToSend);
    client.sendMessage('Show in Pipeline Viewer' + inputToSend);
  }
};

let sendToFV = (inputToSend) => {
  console.log('Show in Pipeline Utilization Explorer', inputToSend);
  client.sendMessage('Show in Pipeline Utilization Explorer' + inputToSend);
};

module.exports = { sendToPV, sendToFV };
