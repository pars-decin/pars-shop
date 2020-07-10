const langButton = document.querySelector('#lang-button');

function handleLangDropdown() {
  const langDropdown = document.querySelector('#lang-dropdown');

  if (langDropdown.classList.contains('show')) {
    langDropdown.classList.remove('show');
  } else {
    langDropdown.classList.add('show');
  }
}

langButton.addEventListener('click', handleLangDropdown);
