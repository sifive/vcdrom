let processMessages = (message) => {
  return message.split(' ')[1];
};

module.exports = { processMessages };

//TODO modify this process message for different cases like delete graph etc
