let onScroll = () => {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      console.log('down');
      $('.site-brand').fadeTo(100, 0.4);
      $('header').fadeTo(100, 0.4);
    } else {
      console.log('there');
      console.log('up');
      $('header').fadeTo(100, 1);
      $('.site-brand').fadeTo(100, 0.8);
    }
  });
};

module.exports = { onScroll };
