import renderLoginForm, {
  fetchUsersNData,
  validateUserData,
  errorMsg,
} from "./LoginForm.js";

export default async function renderForgotPasswordForm(loginCard, closeBtn) {
  const users = await fetchUsersNData();
  const forgotPassFormHtml = `
      <h2 class="fh">Forgot Password</h2>
      <form class="forgot-pass-form login-form d-flex flex-column">
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
  loginCard.innerHTML = forgotPassFormHtml;
  loginCard.appendChild(closeBtn);
  document.querySelector(".fh").style.font = "550 2.7rem inheret";
  attachForgotPasswordListeners(loginCard, closeBtn, users);
}

function attachForgotPasswordListeners(loginCard, closeBtn, users) {
  const backToLogin = document.getElementById("bTLogin");
  const emailField = document.getElementById("resetEmail");
  const forgotPassForm = document.querySelector(".forgot-pass-form");
  const resetBtn = document.querySelector(".btn-reset");
  const forgotHeader = document.querySelector(".fh");

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
    const inputVal = emailField.value.trim();
    console.log(users);

    e.preventDefault();
    if (forgotHeader.innerText === "Forgot Password") {
      if (errors.length === 0) {
        console.log(inputVal);
        const validUser = validateUserData(inputVal, null, users, "forgot");
        if (validUser.length > 0) {
          console.log(validUser[0].Email);
          localStorage.setItem("fgEmail", inputVal);
          localStorage.setItem("name",validUser[0].FirstName);
          forgotHeader.innerText = "Verification";
          emailField.type = "text";
          emailField.placeholder = "Verification code";
          emailField.value = "";
          resetBtn.innerText = "verify";
          const OTP = generateOTP();
          sendEmail(inputVal, OTP, emailField);
          localStorage.setItem("OTP", OTP);
        } else
          errorMsg(emailField.parentElement, "No user found with this email.");
        //wrong email
      }
    } else if (forgotHeader.innerText === "Verification") {
      if (inputVal === localStorage.getItem("OTP")) {
        forgotHeader.innerText = "Reset Password";
        emailField.type = "password";
        emailField.placeholder="Password code";
        emailField.value = "";
        const confirmPasswordField = document.createElement("input");
        confirmPasswordField.type = "password";
        confirmPasswordField.className = "form-control-lg w-100 mt-3";
        confirmPasswordField.id = "confirmPassword";
        confirmPasswordField.setAttribute("placeholder", "Confirm Password");
        emailField.parentElement.appendChild(confirmPasswordField);
        resetBtn.innerText = "Reset Password";
      } else {
        errorMsg(emailField.parentElement, "Invalid verification code.");
      }
    } else {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;
      if (!passwordRegex.test(inputVal))
        errorMsg(
          emailField.parentElement,
          "Password must be at least 8 characters, include one uppercase letter, one number, and one special character!"
        );
      else if (document.getElementById("confirmPassword") === inputVal)
        errorMsg(emailField.parentElement, "Passwords don't match!");
      else {
        updatePassword(localStorage.getItem("fgEmail"), inputVal);
        localStorage.setItem("fgEmail", "");
      }
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
function sendEmail(email, code, emailField) {
  let params = {
    email: email,
    v_code: code,
  };
  emailjs
    .send("service_wffg278", "template_1z5x8zs", params)
    .then(alert("A verification email has been sent!"))
    .then(errorMsg(emailField.parentElement, "please check your email."))
    .catch((error) => console.error("Error sending email:", error));
}
function generateOTP() {
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += Math.floor(Math.random() * 4);
  }

  return OTP;
}

async function updatePassword(email, newPassword) {
  try {
    const response = await fetch("http://localhost:3000/update-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    });

    if (response.ok) {
      alert("Password updated successfully!");
      localStorage.setItem("loggedin", "true");
      closeBtn.click();
      location.reload();
    } else {
      const errorMsg = await response.text();
      console.error("error updating password:", errorMsg);
      alert(errorMsg);
    }
  } catch (error) {
    console.error(error);
  }
}
