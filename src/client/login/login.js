import { showToast } from '../utils/utils.js';

let currentFormState = 'login';

document.addEventListener('DOMContentLoaded', () => {
  const toggleStateButton = document.getElementById('toggleStateButton');
  const form = document.getElementById('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.target.checkValidity();

    const formData = {
      email: $("#email").val(),
      name: $("#name").val(),
      last_name: $("#lastname").val(),
      password: $("#pass").val(),
      confirmPassword: $("#confirmPass").val(),
      type: currentFormState,
    };

    if (validateForm(formData)) {
      $.ajax({
        type: 'post',
        url: '../../server/auth/auth.php',
        data: formData,
        success: (jsonResponse) => {
          const response = JSON.parse(jsonResponse);

          if (response.status === 'error') {
            if (response.message === '23505') {
              showToast('Email já cadastrado', 'error');
            } else {
              showToast('Erro desconhecido', 'error');
            }
          } else {
            showToast('Usuário cadastrado com sucesso', 'success');
          }
        },
      });
    }
  }, false);

  toggleStateButton.addEventListener('click', (event) => {
    const submitButton = document.getElementById('submitButton');
    const elementsToToggleVisiblity = [document.getElementById('nameContainer'), document.getElementById('lastNameContainer'), document.getElementById('confirmPassContainer')];

    for (const element of elementsToToggleVisiblity) {
      if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
        toggleStateButton.innerHTML = "Já tenho uma conta";
        submitButton.innerHTML = "Registrar"
        currentFormState = 'register';
      } else {
        element.style.display = 'none';
        toggleStateButton.innerHTML = "Não tenho uma conta";
        submitButton.innerHTML = "Entrar"
        currentFormState = 'login';
      }
    }
  }, false);
});


/////////////
//FUNCTIONS//
////////////

const validateForm = (formData) => {
  let valid = true;

  if (!formData.email || !formData.email.includes('@')) {
    const email = document.getElementById('email');
    const emailErrorMessage = document.getElementById('emailErrorMessage');
    emailErrorMessage.innerHTML = 'Email inválido'
    email.classList.add('is-invalid');
    valid = false;
  } else {
    email.classList.remove('is-invalid');
  }

  const pass = document.getElementById('pass');
  const confirmPass = document.getElementById('confirmPass');
  const passErrorMessage = document.getElementById('passErrorMessage');
  const confirmPassErrorMessage = document.getElementById('confirmPassErrorMessage');

  if (formData.password && formData.confirmPassword) {
    if (formData.password !== formData.confirmPassword) {
      pass.classList.add('is-invalid');
      confirmPass.classList.add('is-invalid');
      confirmPassErrorMessage.innerHTML = 'As senhas fornecidas são diferentes'
      valid = false;
    } else {
      pass.classList.remove('is-invalid');
      confirmPass.classList.remove('is-invalid');
      confirmPassErrorMessage.innerHTML = '';
      passErrorMessage.innerHTML = '';
    }
  } else {
    if (!formData.password) {
      pass.classList.add('is-invalid');
      passErrorMessage.innerHTML = 'Informe uma senha';
      valid = false;
    } else {
      pass.classList.remove('is-invalid');
      passErrorMessage.innerHTML = '';
    }

    if (!formData.confirmPassword) {
      confirmPass.classList.add('is-invalid');
      confirmPassErrorMessage.innerHTML = 'Confirme a sua senha';
      valid = false;
    } else {
      confirmPass.classList.remove('is-invalid');
      confirmPassErrorMessage.innerHTML = '';
    }
  }

  const name = document.getElementById('name');
  const nameErrorMessage = document.getElementById('nameErrorMessage');

  if (!formData.name) {
    name.classList.add('is-invalid');
    nameErrorMessage.innerHTML = 'Digite seu primeiro nome';
    valid = false;
  } else {
    name.classList.remove('is-invalid');
  }

  const lastname = document.getElementById('lastname');
  const lastnameErrorMessage = document.getElementById('lastnameErrorMessage');

  if (!formData.last_name) {
    lastname.classList.add('is-invalid');
    lastnameErrorMessage.innerHTML = 'Digite seu sobrenome';
    valid = false;
  } else {
    lastname.classList.remove('is-invalid');
  }

  return valid;
}