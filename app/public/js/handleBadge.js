const demandEl = document.querySelectorAll('.demand-badge');
Array.prototype.forEach.call(demandEl, function (el) {
  toggleBadge(el);
  appendNo();
});

window.updateDemandBadge = function () {
  Array.prototype.forEach.call(demandEl, function (el) {
    toggleBadge(el);
    appendNo();
  });
};

function appendNo() {
  Array.prototype.forEach.call(demandEl, function (el) {
    el.innerText = getLenghOfCart();
  });
}

function toggleBadge(el) {
  if (getLenghOfCart() === 0) {
    el.style.cssText = 'display: none;';
  } else {
    el.style.cssText = 'display: inline-block;';
  }
}

function getLenghOfCart() {
  const cookieList = document.cookie.split('; ').map(function (c) {
    const pairs = c.split('=');
    return [pairs[0], pairs.slice(1).join('=')];
  });
  parsedCookies = {};
  const cookieObj = cookieList.forEach(function (it) {
    parsedCookies[it[0]] = it[1];
  });

  const parsCart = parsedCookies.parsCart || '[]';

  return JSON.parse(unescape(parsCart)).length;
}
