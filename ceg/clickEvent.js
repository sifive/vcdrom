let onBarClicks = () => {
  document.addEventListener('keydown', function (e) {
    if (e.key === 'P') {
      console.log('hello P was pressed');
    }
  });
};

module.exports = { onBarClicks };
