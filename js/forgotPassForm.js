import renderLoginForm, {
  fetchUsersNData,
  validateUserData,
  errorMsg,
} from "./LoginForm.js";

export default async function renderForgotPasswordForm(loginCard, closeBtn) {
  const users = await fetchUsersNData();
  const forgotPassFormHtml = `
      <h2 class="fh">Forgot Password</h2>
      <form class="forgot-pass-form d-flex flex-column">
          <div>

              <div class="mb-3">
                <input
                  type="email"
                  class="form-control-lg w-100 "
                  id="resetEmail"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                />
          </div>
          <div class="d-flex flex-column">
            <button type="submit" class="btn-reset align-self-end">Reset Password</button>
          </div>
        </form>
        <div class="link">
            <p>Back to login? <a id="bTLogin" href="#">Log in</a> | <a href="./SignUp/signUp.html">Sign Up</a></p>
          </div>
    `;

  loginCard.style.height = "30rem";
  closeBtn.style.top = "32%";
  loginCard.innerHTML = forgotPassFormHtml;
  loginCard.appendChild(closeBtn);
  document.querySelector(".fh").style.font = "550 2.7rem inheret";
  attachForgotPasswordListeners(loginCard, closeBtn, users);
}

function attachForgotPasswordListeners(loginCard, closeBtn, users) {
  const backToLogin = document.getElementById("bTLogin");
  const emailField = document.getElementById("resetEmail");
  const forgotPassForm = document.querySelector(".forgot-pass-form");

  backToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    renderLoginForm(loginCard, closeBtn);
  });
  // Input validation error reset
  emailField.addEventListener("input", () => {
    if (emailField.parentElement.querySelector(".form-text")) {
      emailField.parentElement.querySelector(".form-text").remove();
    }
  });

  forgotPassForm.addEventListener("submit", (e) => {
    let errors = getLoginErrors(emailField);
    console.log(users);

    e.preventDefault();
    if (errors.length === 0) {
      const emailVal = emailField.value.trim();
      console.log(emailVal);
      const validUser = validateUserData(emailVal, null, users, "forgot");
      if (validUser.length>0) {
        console.log(validUser[0].Email);
        window.location.href =`mailto:${validUser[0].Email}?subject=Shista Reset Password &body=We heard that you lost your Shista password.\nSorry about that! But don’t worry! You can use the following link to reset your password: https://fatmawafy.github.io/E-Commerce/HTML/resetPassword.html`;
      }
      else errorMsg(emailField.parentElement,"No user found with that email.");
      //wrong email
    }
  });
}
function getLoginErrors(emailField) {
  let errors = [];
  if (!emailField.value) {
    errors.push("email is required");
    errorMsg(emailField.parentElement, "email is required");
  }
  return errors;
}
