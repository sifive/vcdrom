let wsClient1 = () => {
  console.log('this is the web socket connection');

  const websocket2 = new WebSocket('ws://' + location.host);
  websocket2.onopen = () => {
    // console.log('websocket2 opened wow 2:): ' + websocket2.url); d
  };
  websocket2.on('connection', function connection(websocket2) {
    websocket2.send('yes test message');
  });

  // console.log(location.host);
};

module.exports = { wsClient1 };
