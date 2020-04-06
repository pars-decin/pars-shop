const demandEl = document.querySelectorAll('.demand-badge');
demandEl.forEach((el) => {
  toggleBadge(el);
  appendNo();
});

window.updateDemandBadge = function () {
  demandEl.forEach((el) => {
    toggleBadge(el);
    appendNo();
  });
};

function appendNo() {
  demandEl.forEach((el) => (el.innerText = getLenghOfCart()));
}

function toggleBadge(el) {
  if (getLenghOfCart() === 0) {
    el.style.cssText = 'display: none;';
  } else {
    el.style.cssText = 'display: inline-block;';
  }
}

function getLenghOfCart() {
  const parsCart =
    Object.fromEntries(
      document.cookie.split('; ').map((c) => {
        const [key, ...v] = c.split('=');
        return [key, v.join('=')];
      })
    ).parsCart || '[]';

  return JSON.parse(unescape(parsCart)).length;
}
