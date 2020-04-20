const burger = document.querySelector('#hamburger');
const nav = document.querySelector('.topbar__nav');

function replaceClassName(prev, next, node) {
  if (node.classList.contains(prev)) {
    node.classList.remove(prev);
    node.classList.add(next);
  } else {
    node.classList.add(next);
  }
}

function toggleLogoColors(color) {
  const redLogo = document.querySelector('#logo-red');
  const whiteLogo = document.querySelector('#logo-white');

  if (color === 'white') {
    replaceClassName('hide', 'show', whiteLogo);
    replaceClassName('show', 'hide', redLogo);
  } else if (color === 'red') {
    replaceClassName('show', 'hide', whiteLogo);
    replaceClassName('hide', 'show', redLogo);
  }
}

function toggleBurgerMenu() {
  if (burger.classList.contains('is-active')) {
    burger.classList.remove('is-active');
    burger.classList.add('is-inactive');
    replaceClassName('show', 'hide', nav);
    toggleLogoColors('red');
  } else if (burger.classList.contains('is-inactive')) {
    burger.classList.add('is-active');
    burger.classList.remove('is-inactive');
    replaceClassName('hide', 'show', nav);
    toggleLogoColors('white');
  }
}

burger.addEventListener('click', toggleBurgerMenu);
Array.prototype.forEach.call(nav.children, function (el) {
  el.addEventListener('click', toggleBurgerMenu);
});
