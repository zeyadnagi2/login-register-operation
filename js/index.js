var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var alertBox = document.getElementById("alert");

function loginUser() {
  const isEmailValid = loginValidation(loginEmail);
  const isPasswordValid = loginValidation(loginPassword);

  if (isEmailValid && isPasswordValid) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) =>
        user?.rEmail?.toLowerCase() === loginEmail.value.trim().toLowerCase() &&
        user?.rPassword === loginPassword.value.trim()
    );

    if (foundUser) {
      alertBox.classList.add("d-none");
      loginEmail.classList.remove("is-invalid");
      loginPassword.classList.remove("is-invalid");

      // Save logged in user
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

      // Redirect to home page
      window.location.href = "./pages/home.html";
    } else {
      loginEmail.classList.remove("is-valid");
      loginPassword.classList.remove("is-valid");

      loginEmail.classList.add("is-invalid");
      loginPassword.classList.add("is-invalid");

      alertBox.classList.remove("d-none");
    }
  } else {
    alertBox.classList.add("d-none");
  }
}

function loginValidation(element) {
  const loginRegx = {
    loginEmail: /^[a-zA-Z0-9_]+@(gmail|hotmail|yahoo)\.(com|org)$/,
    loginPassword: /^.{4,}$/,
  };

  const isValid = loginRegx[element.id].test(element.value.trim());

  if (isValid) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return ture;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }

}
