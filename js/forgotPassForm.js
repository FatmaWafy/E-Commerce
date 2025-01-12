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
        </div>
          <div class="d-flex flex-column">
            <button type="submit" class="btn-reset align-self-end">Reset Password</button>
          </div>
        </form>
        <div class="link">
            <p>Back to login? <a id="bTLogin" href="#">Log in</a> | <a href="./SignUp/signUp.html">Sign Up</a></p>
          </div>
    `;

  loginCard.style.height = "35rem";
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
  const confirmPasswordField = document.createElement("input");
  const confirmPasswordToggle = document.createElement("button");
  const toggleB = document.createElement("button");
  const confirmDiv = document.createElement("div");
  toggleB.setAttribute("type","button");
  confirmPasswordToggle.setAttribute("type","button");

  backToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    renderLoginForm(loginCard, closeBtn);
  });
  // Input validation error reset
  emailField.addEventListener("input", () => {
    if (emailField.parentElement.querySelector(".form-text")|| emailField.parentElement.parentElement.querySelector(".form-text")) {
      if(emailField.parentElement.parentElement.querySelector(".form-text"))
      {
        emailField.parentElement.parentElement.querySelector(".form-text").remove();
      }else{
        emailField.parentElement.querySelector(".form-text").remove();
      }

    }
    // Password toggle
    if (toggleB) {
      toggleB.addEventListener("click", () => {
        const isPassword = emailField.type === "password";
        emailField.type = isPassword ? "text" : "password";
        toggleB.innerHTML = isPassword
          ? '<i class="fa-solid fa-eye-slash"></i>'
          : '<i class="fa-solid fa-eye"></i>';
      });
    }

    // confirm Password toggle
    if (confirmPasswordToggle) {
      confirmPasswordToggle.addEventListener("click", () => {
        const isPassword = confirmPasswordField.type === "password";
        confirmPasswordField.type = isPassword ? "text" : "password";
        confirmPasswordToggle.innerHTML = isPassword
          ? '<i class="fa-solid fa-eye-slash"></i>'
          : '<i class="fa-solid fa-eye"></i>';
      });
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
          localStorage.setItem("name", validUser[0].FirstName);
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
        emailField.placeholder = "Password";
        emailField.value = "";
        emailField.className = "form-control-lg w-100 h-50 my-2";
        toggleB.innerHTML = `<i class="fa-solid fa-eye"></i>`;
        toggleB.setAttribute("id", "togglePasswordl");
        emailField.parentElement.classList.add("d-flex");
        emailField.parentElement.appendChild(toggleB);
        confirmPasswordField.type = "password";
        confirmPasswordField.className = "form-control-lg w-100 mt-3";
        confirmPasswordField.id = "confirmPassword";
        confirmPasswordField.setAttribute("placeholder", "Confirm Password");
        confirmPasswordField.className = "form-control-lg w-100 h-50 my-2";
        confirmDiv.className = "mb-3 d-flex";
        confirmDiv.appendChild(confirmPasswordField);
        confirmPasswordToggle.innerHTML = `<i class="fa-solid fa-eye"></i>`;
        confirmPasswordToggle.setAttribute("id", "toggleConfirmPassword");
        confirmDiv.appendChild(confirmPasswordToggle);
        emailField.parentElement.insertAdjacentElement("afterend", confirmDiv);
        resetBtn.innerText = "Reset Password";
      } else {
        errorMsg(emailField.parentElement, "Invalid verification code.");
      }
    } else if (forgotHeader.innerText === "Reset Password") {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^?#&_-])[A-Za-z\d@#^$!%*?&_-]{8,}$/;
      if (!passwordRegex.test(inputVal))
        errorMsg(
          emailField.parentElement.parentElement,
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
    .send("service_3mcj8mp", "template_1z5x8zs", params)
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
