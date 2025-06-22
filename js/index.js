// Register inputs
const registerName = document.querySelector('#registerName');
const registerEmail = document.querySelector('#registerEmail');
const registerPassword = document.querySelector('#registerPassword');

// Login inputs
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');

// Welcome span in home page
const welcome = document.querySelector('#welcome');

// Regex patterns
const nameRegex = /^[A-Za-z\s]{3,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\.(com|org)$/;
const passwordRegex = /^.{4,}$/;

// Error divs (only exist on register page)
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Validation function with inline error message
function validateInput(input, regex, errorElement, message) {
  if (regex.test(input.value.trim())) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    if (errorElement) errorElement.textContent = "";
    return true;
  } else {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    if (errorElement) errorElement.textContent = message;
    return false;
  }
}

// Register handler
function addUserRegister(e) {
  e.preventDefault();

  const isNameValid = validateInput(registerName, nameRegex, nameError, "Name must be at least 3 characters.");
  const isEmailValid = validateInput(registerEmail, emailRegex, emailError, "Enter a valid email (gmail, yahoo, hotmail).");
  const isPasswordValid = validateInput(registerPassword, passwordRegex, passwordError, "Password must be at least 4 characters.");

  if (isNameValid && isEmailValid && isPasswordValid) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some(user => user.email === registerEmail.value.trim().toLowerCase());
    if (emailExists) {
      if (emailError) emailError.textContent = "Email already registered.";
      registerEmail.classList.add('is-invalid');
      return;
    }

    const newUser = {
      name: registerName.value.trim(),
      email: registerEmail.value.trim().toLowerCase(),
      password: registerPassword.value.trim()
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "../index.html";
  }
}

// Login handler
function loginUser(e) {
  e.preventDefault();

  const isEmailValid = validateInput(loginEmail, emailRegex, null, "Enter a valid email.");
  const isPasswordValid = validateInput(loginPassword, passwordRegex, null, "Enter a valid password.");

  if (isEmailValid && isPasswordValid) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(user =>
      user.email === loginEmail.value.trim().toLowerCase() &&
      user.password === loginPassword.value.trim()
    );

    if (foundUser) {
      localStorage.setItem("currentUser", foundUser.name);
      window.location.href = "./pages/home.html";
    } else {
      alert("Incorrect email or password.");
      loginEmail.classList.add('is-invalid');
      loginPassword.classList.add('is-invalid');
    }
  }
}

// Home welcome handler
function showUserName() {
  const currentUser = localStorage.getItem("currentUser");
  if (welcome && currentUser) {
    welcome.textContent = currentUser;
  }
}

// Logout (optional, called via link onclick)
function logout() {
  localStorage.removeItem("currentUser");
}

// Bind register button
if (registerName && registerEmail && registerPassword) {
  const registerBtn = document.querySelector('#registerBtn');
  if (registerBtn) {
    registerBtn.addEventListener('click', addUserRegister);
  }
}

// Bind login button
if (loginEmail && loginPassword) {
  const loginBtn = document.querySelector('#loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', loginUser);
  }
}

// Display user name on home page
if (welcome) {
  showUserName();
}
