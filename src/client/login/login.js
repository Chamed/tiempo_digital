const changeFormState = () => {
  const elementsToToggleVisiblity = [document.getElementById('nameContainer'), document.getElementById('lastNameContainer'), document.getElementById('confirmPassContainer')];
  const toggleStateButton = document.getElementById('toggleStateButton');
  const submitButton = document.getElementById('submitButton');

  for (const element of elementsToToggleVisiblity) {
    if (element.style.display === 'none' || element.style.display === '') {
      element.style.display = 'block';
      toggleStateButton.innerHTML = "Já tenho uma conta";
      submitButton.innerHTML = "Registrar"
    } else {
      element.style.display = 'none';
      toggleStateButton.innerHTML = "Não tenho uma conta";
      submitButton.innerHTML = "Entrar"
    }
  }
};
