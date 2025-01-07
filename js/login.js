let userIcone = document.getElementById("userIcon");
userIcone.addEventListener("click", () => {
  // Create overlay
  let overlay = document.createElement("div");
  overlay.className = "login-overlay";

  // Create login card
  let loginCard = document.createElement("div");
  loginCard.className = "login-card";

  // Add login form elements
  let formHtml = `
    <h2>Login</h2>
    <form class="login-form">
        <div class="mb-3">
          <input
            type="email"
            class="form-control-lg w-100 h-50"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
          />
        </div>
        <div>
          <div class="d-flex">
          <input
            type="password"
            class="form-control-lg w-100 h-50 my-2"
            id="exampleInputPassword1"
            placeholder="Password"
          />
          <button type="button" id="togglePassword">
                              <i class="fa-solid fa-eye"></i></button>
        </div>
        </div>
        <div class="mb-3 form-check-inline">
          <div>
            <input type="checkbox" class="form-check-input-lg" id="exampleCheck1" />
            <label class="form-check-label" for="exampleCheck1">Remember me</label>
          </div>
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>
        <button type="submit" class="btn-submit">Submit</button>
        <div class="link">
          <p>
            Don't have an account?
          <a href="./SignUp/signUp.html">Sign Up</a>
          </p>
        </div>
      </form>
  `;

  loginCard.innerHTML = formHtml;

  // Create and append a close button to the login card
  let closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = "X";
  loginCard.appendChild(closeBtn);

  document.body.appendChild(overlay);
  overlay.appendChild(loginCard);

  closeBtn.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });

  //form elements
  const loginForm = document.querySelector(".login-form");
  const togglePasswordButton = document.getElementById("togglePassword");
  const passwordField = document.getElementById("exampleInputPassword1");
  const emailField = document.getElementById("exampleInputEmail1");

  // Password visibility toggle
  if (togglePasswordButton) {
    togglePasswordButton.addEventListener("click", function () {
      console.log("Password toggle clicked");
      if (passwordField.type === "password") {
        passwordField.type = "text";
        togglePasswordButton.innerHTML =
          '<i class="fa-solid fa-eye-slash"></i>';
      } else {
        passwordField.type = "password";
        togglePasswordButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
      }
    });
  }

  //Login Validations:
  const errorMsg = (parent, msg) => {
    if (parent.querySelector(".form-text")) {
      parent.querySelector(".form-text").remove();
    }
      const errorElement = document.createElement("div");
      errorElement.className = "form-text text-danger";
      errorElement.textContent = msg;
      parent.appendChild(errorElement);
    
  };

  function getLoginErrors(email, password) {
    let errors = []
    if (email === "") {
      errors.push("email is required");
      errorMsg(emailField.parentElement, "email is required");
    }
    if (password === "") {
      errors.push("password is required");
      errorMsg(passwordField.parentElement.parentElement, "password is required");
    }
    return errors;
  }
  
  loginForm.addEventListener("submit", (e) => {
    let errors = getLoginErrors(emailField.value, passwordField.value);
    if (errors.length > 0) e.preventDefault();
  });


  emailField.addEventListener('input',()=>{
    if (emailField.parentElement.querySelector(".form-text")) {
      emailField.parentElement.querySelector(".form-text").remove();
    }
  });


  passwordField.addEventListener('input',()=>{
    if (passwordField.parentElement.parentElement.querySelector(".form-text")) {
      passwordField.parentElement.parentElement.querySelector(".form-text").remove();
    }
  });
});
