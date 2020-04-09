const handlePageChange = () => {
  const hrefWithoutQuery = window.location.href.split('?')[0];

  const navLinks = document.querySelectorAll('.topbar__nav__nav-page');

  navLinks.forEach((navLink) => {
    console.log(navLink.href);
    if (navLink.href === hrefWithoutQuery) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
    }
  });
};

handlePageChange();
window.addEventListener('popstate', handlePageChange);
