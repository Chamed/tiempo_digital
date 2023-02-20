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

export { showToast };