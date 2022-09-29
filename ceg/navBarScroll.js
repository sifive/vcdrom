let WonScroll = () => {
  // scroll
  let lastScrollTop;

  window.onscroll = () => {
    console.log('working ');
    let scrollTop = window.scrollY;
    let navbar = document.querySelector('.navbar');
    if (scrollTop > '20' && scrollTop > lastScrollTop) {
      navbar.classList.remove('downscroll');
      navbar.classList.add('upscroll');
    } else {
      navbar.classList.remove('upscroll');
      navbar.classList.add('downscroll');
    }
    lastScrollTop = scrollTop;
  };
};

module.exports = { WonScroll };
