// register
var registerName = document.getElementById("registerName");
var registerEmail = document.getElementById("registerEmail");
var registerPassword = document.getElementById("registerPassword");

// global
var users = [];

// user register function
function addUserRegister() {
  if (
    registerValidation(registerName) &&
    registerValidation(registerEmail) &&
    registerValidation(registerPassword)
  ) {
    var user = {
      rName: registerName.value,
      rEmail: registerEmail.value,
      rPassword: registerPassword.value,
    };

    users.push(user);
    clearRegisterInputs();

    window.location.href = "../index.html"; // make sure the path is correct!
  }
}

// clear inputs function
function clearRegisterInputs() {
  // register
  registerName.value = null;
  registerEmail.value = null;
  registerPassword.value = null;
}

// validate register function
function registerValidation(element) {
  var registerRegx = {
    registerName: /^[a-zA-Z0-9_]{3,20}$/,
    registerEmail: /^[a-zA-Z0-9_]+@(gmail|hotmail|yahoo)\.(com|org)$/,
    registerPassword: /^.{4,}$/,
  };

  if (registerRegx[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
