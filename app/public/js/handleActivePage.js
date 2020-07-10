const handlePageChange = function () {
  const hrefWithoutQuery = window.location.href.split('?')[0];

  const navLinks = document.querySelectorAll('.topbar__nav__nav-page');

  Array.prototype.forEach.call(navLinks, function (navLink) {
    if (navLink.href === hrefWithoutQuery) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
    }
  });
};

handlePageChange();
window.addEventListener('popstate', handlePageChange);
