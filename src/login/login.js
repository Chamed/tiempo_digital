let currentFormState = 'login';

const changeFormState = () => {
  const formContainer = document.getElementById("form");

  if (currentFormState === 'login') {
    currentFormState = 'register';

    const formHTML = `<div class="mb-3">
      <label for="email" class="form-label">Email: </label>
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text" style="height: 100%;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
              <path
                d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z">
              </path>
            </svg>
          </div>
        </div>
        <input type="email" class="form-control" id="email">
      </div>
    </div>
    <div class="mb-3">
      <label for="pass" class="form-label">Senha: </label>
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text" style="height: 100%;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
              <path
                d="M10.5 0a5.499 5.499 0 1 1-1.288 10.848l-.932.932a.749.749 0 0 1-.53.22H7v.75a.749.749 0 0 1-.22.53l-.5.5a.749.749 0 0 1-.53.22H5v.75a.749.749 0 0 1-.22.53l-.5.5a.749.749 0 0 1-.53.22h-2A1.75 1.75 0 0 1 0 14.25v-2c0-.199.079-.389.22-.53l4.932-4.932A5.5 5.5 0 0 1 10.5 0Zm-4 5.5c-.001.431.069.86.205 1.269a.75.75 0 0 1-.181.768L1.5 12.56v1.69c0 .138.112.25.25.25h1.69l.06-.06v-1.19a.75.75 0 0 1 .75-.75h1.19l.06-.06v-1.19a.75.75 0 0 1 .75-.75h1.19l1.023-1.025a.75.75 0 0 1 .768-.18A4 4 0 1 0 6.5 5.5ZM11 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z">
              </path>
            </svg>
          </div>
        </div>
        <input type="password" class="form-control" id="pass">
      </div>
    </div>
    <div class="mb-3">
      <label for="confirmPass" class="form-label">Confirmar senha: </label>
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text" style="height: 100%;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
              <path
                d="M10.5 0a5.499 5.499 0 1 1-1.288 10.848l-.932.932a.749.749 0 0 1-.53.22H7v.75a.749.749 0 0 1-.22.53l-.5.5a.749.749 0 0 1-.53.22H5v.75a.749.749 0 0 1-.22.53l-.5.5a.749.749 0 0 1-.53.22h-2A1.75 1.75 0 0 1 0 14.25v-2c0-.199.079-.389.22-.53l4.932-4.932A5.5 5.5 0 0 1 10.5 0Zm-4 5.5c-.001.431.069.86.205 1.269a.75.75 0 0 1-.181.768L1.5 12.56v1.69c0 .138.112.25.25.25h1.69l.06-.06v-1.19a.75.75 0 0 1 .75-.75h1.19l.06-.06v-1.19a.75.75 0 0 1 .75-.75h1.19l1.023-1.025a.75.75 0 0 1 .768-.18A4 4 0 1 0 6.5 5.5ZM11 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z">
              </path>
            </svg>
          </div>
        </div>
        <input type="password" class="form-control" id="pass">
      </div>
    </div>
    <div class="d-grid gap-2 mb-3">
      <button type="button" class="btn btn-secondary" onclick="changeFormState()">
        Já tenho uma conta
      </button>
    </div>
    <div class="d-grid gap-2">
      <button type="submit" class="btn btn-primary">Registrar</button>
    </div>`;

    formContainer.innerHTML = formHTML;
  } else {
    currentFormState = 'login';

    const formHTML = `<div class="mb-3">
      <label for="email" class="form-label">Email: </label>
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text" style="height: 100%;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
              <path
                d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z">
              </path>
            </svg>
          </div>
        </div>
        <input type="email" class="form-control" id="email">
      </div>
    </div>
    <div class="mb-3">
      <label for="pass" class="form-label">Senha: </label>
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text" style="height: 100%;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
              <path
                d="M10.5 0a5.499 5.499 0 1 1-1.288 10.848l-.932.932a.749.749 0 0 1-.53.22H7v.75a.749.749 0 0 1-.22.53l-.5.5a.749.749 0 0 1-.53.22H5v.75a.749.749 0 0 1-.22.53l-.5.5a.749.749 0 0 1-.53.22h-2A1.75 1.75 0 0 1 0 14.25v-2c0-.199.079-.389.22-.53l4.932-4.932A5.5 5.5 0 0 1 10.5 0Zm-4 5.5c-.001.431.069.86.205 1.269a.75.75 0 0 1-.181.768L1.5 12.56v1.69c0 .138.112.25.25.25h1.69l.06-.06v-1.19a.75.75 0 0 1 .75-.75h1.19l.06-.06v-1.19a.75.75 0 0 1 .75-.75h1.19l1.023-1.025a.75.75 0 0 1 .768-.18A4 4 0 1 0 6.5 5.5ZM11 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z">
              </path>
            </svg>
          </div>
        </div>
        <input type="password" class="form-control" id="pass">
      </div>
    </div>
    <div class="d-grid gap-2 mb-3">
      <button type="button" class="btn btn-secondary" onclick="changeFormState()">
        Não tenho uma conta
      </button>
    </div>
    <div class="d-grid gap-2">
      <button type="submit" class="btn btn-primary">Entrar</button>
    </div>`;

    formContainer.innerHTML = formHTML;
  }
};
