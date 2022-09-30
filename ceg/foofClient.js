const client = () => {
  // const websocket = new WebSocket('ws://' + location.host);
  let state = 'idle';
  let websocket;
  return {
    initWS: () => {
      const websocket = new WebSocket('ws://' + location.host);
      state = 'web socket';
      return websocket;
    },
    currentState: () => {
      return state;
    },
    openSocket: (cb) => {
      wsClient.on('open', cb);
      state = 'web socket OPEN';
    },
    wsState: () => {
      return wsClient.readyState;
    },
    sendMessage: (bufferMessage, cb) => {
      wsClient.send(bufferMessage, cb);
    },
    readMessage: (cb) => {
      wsClient.on('message', cb);
    },
    closeClient: () => {
      wsClient.close();
    },
  };
};

module.exports = client;
