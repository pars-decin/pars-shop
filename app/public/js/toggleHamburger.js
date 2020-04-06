const burger = document.querySelector('#hamburger');
const nav = document.querySelector('.topbar__nav');

function toggleDisplay(node, type) {
  node.setAttribute('style', 'display: ' + type + ';');
}

function toggleLogoColors(color) {
  const redLogo = document.querySelector('#logo-red');
  const whiteLogo = document.querySelector('#logo-white');

  if (color === 'white') {
    toggleDisplay(redLogo, 'none');
    toggleDisplay(whiteLogo, 'block');
  } else if (color === 'red') {
    toggleDisplay(redLogo, 'block');
    toggleDisplay(whiteLogo, 'none');
  }
}

function toggleBurgerMenu() {
  if (burger.classList.contains('is-active')) {
    burger.classList.remove('is-active');
    toggleDisplay(nav, 'none');
    toggleLogoColors('red');
  } else {
    burger.classList.add('is-active');
    toggleDisplay(nav, 'flex');
    toggleLogoColors('white');
  }
}

burger.addEventListener('click', toggleBurgerMenu);
Array.prototype.forEach.call(nav.children, (el) =>
  el.addEventListener('click', toggleBurgerMenu)
);
