let currentFormState = 'login';

const changeFormState = () => {
  if (currentFormState === 'login') {
    currentFormState = "register";

    const formHTML = `<div class="mb-3">
    <label for="email" class="form-label">Email: </label>
    <input type="email" class="form-control" id="email" />
  </div>
  <div class="mb-3">
    <label for="pass" class="form-label">Senha: </label>
    <input type="password" class="form-control" id="pass" />
  </div>
    <div class="d-grid gap-2 mb-3">
      <button type="button" class="btn btn-secondary" onclick="changeFormState()">
        Não tenho uma conta
      </button>
    </div>
  <div class="d-grid gap-2">
    <button type="submit" class="btn btn-primary">Entrar</button>
  </div>`;

    document.getElementById("form").innerHTML = "";

    const newDoc = document.createElement("div");
    newDoc.innerHTML = formHTML;
    document.getElementById("form").appendChild(newDoc);
  } else {
    currentFormState = 'login';

    const formHTML = `<div class="mb-3">
    <label for="email" class="form-label">Email: </label>
    <input type="email" class="form-control" id="email" />
  </div>
  <div class="mb-3">
    <label for="pass" class="form-label">Senha: </label>
    <input type="password" class="form-control" id="pass" />
  </div>
  <div class="mb-3">
    <label for="confirmPass" class="form-label">Confirmar senha: </label>
    <input type="password" class="form-control" id="confirmPass" />
    </div>
    <div class="d-grid gap-2 mb-3">
      <button type="button" class="btn btn-secondary" onclick="changeFormState()">
        Já tenho uma conta
      </button>
    </div>
  <div class="d-grid gap-2">
    <button type="submit" class="btn btn-primary">Registrar</button>
  </div>`;

    document.getElementById("form").innerHTML = "";

    const newDoc = document.createElement("div");
    newDoc.innerHTML = formHTML;
    document.getElementById("form").appendChild(newDoc);
  }
};
