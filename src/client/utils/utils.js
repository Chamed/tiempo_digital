const showToast = (message, type) => {
  const toastElement = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  switch (type) {
    case 'error':
      toastElement.classList.remove('bg-success', 'bg-primary');
      toastElement.classList.add('bg-danger');
      break;
    case 'success':
      toastElement.classList.remove('bg-danger', 'bg-primary');
      toastElement.classList.add('bg-success');
      break;
    default:
      toastElement.classList.remove('bg-success', 'bg-danger');
      toastElement.classList.add('bg-primary');
      break;
  }

  toastMessage.innerHTML = message;
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

const clearForm = (formId) => {
  const form = document.getElementById(formId);
  const inputs = form.getElementsByTagName('input');

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

const quickUnauthenticatedUser = () => {
  window.addEventListener('load', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      window.location.replace('../auth/auth.html');
    }
  });
}


export { showToast, clearForm, quickUnauthenticatedUser };