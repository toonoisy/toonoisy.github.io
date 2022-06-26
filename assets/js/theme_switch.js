function toggleTheme () {
  const toggle = document.body.getAttribute('theme') === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', toggle);
  document.body.setAttribute('theme', toggle);
  document.body.style.transition = 'filter, .3s';
};

function setTheme () {
  const local = localStorage.getItem('theme');
  if (local) document.body.setAttribute('theme', local);
};
