import { quickUnauthenticatedUser, getGravatar, showToast } from "../../utils/utils.js";

const user = JSON.parse(localStorage.getItem('user'));

quickUnauthenticatedUser();

document.addEventListener('DOMContentLoaded', () => {
  setUserInfo();

  const logoutElement = document.getElementById('logout');

  logoutElement.addEventListener('click', (_) => {
    logout();
  });
});

/////////////
//FUNCTIONS//
////////////
const setUserInfo = () => {
  const gravatarUrl = getGravatar(user.email, 50);
  const gravatar = document.getElementById('gravatar');

  gravatar.src = gravatarUrl;

  const username = document.getElementById('username');
  username.innerHTML = `${user.first_name} ${user.last_name}`;
}

const logout = () => {
  $.ajax({
    type: 'post',
    url: '../../../server/auth/auth.php',
    data: { type: 'logout' },
    success: (jsonResponse) => {
      const response = JSON.parse(jsonResponse);

      if (response.status === 'error') {
        showToast('Erro desconhecido', 'error');
      } else {
        localStorage.setItem('user', null);
        window.location.replace('../auth/auth.html');
      }
    },
  });
}