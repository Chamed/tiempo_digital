window.addEventListener('load', () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    window.location.href = 'src/client/pages/home/home.html';
  } else {
    window.location.href = 'src/client/pages/auth/auth.html';
  }
});
