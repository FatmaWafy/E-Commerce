import renderForgotPasswordForm from "./forgotPassForm.js";
export default async function renderLoginForm(loginCard, closeBtn) {
  const users = await fetchUsersNData();
  const formHtml = `
      <h2>Login</h2>
      <form class="login-form d-flex flex-column justify-content-evenly h-80 w-70" >
          <div class="mb-3">
            <input
              type="email"
              class="form-control-lg w-100"
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
            <button type="button" id="togglePasswordl"><i class="fa-solid fa-eye"></i></button>
          </div>
          </div>
          <div class="mb-3 form-check-inline">
            <a href="#" class="forgot-password">Forgot password?</a>
          </div>
          <div class="d-flex justify-content-between w-100">
              <p class="errorLogin"></p>
              <button type="submit" class="btn-submit align-self-end">Submit</button>
          </div>
        </form>
        <div class="link">
            <p>
              Don't have an account?
            <a href="../SignUp/signUp.html">Sign Up</a>
            </p>
          </div>
    `;
  loginCard.style.height = "38rem";
  loginCard.innerHTML = formHtml;
  closeBtn.style.top = "-100%";
  closeBtn.style.right = "-48%";

  loginCard.appendChild(closeBtn);

  attachLoginFormListeners(loginCard, closeBtn, users);
}

function attachLoginFormListeners(loginCard, closeBtn, users) {
  const loginForm = document.querySelector(".login-form");
  const togglePasswordButton = document.getElementById("togglePasswordl");
  const passwordField = document.getElementById("exampleInputPassword1");
  const emailField = document.getElementById("exampleInputEmail1");
  const forgotPasswordLink = document.querySelector(".forgot-password");
  const errorP=document.querySelector(".errorLogin");

  // Password toggle
  if (togglePasswordButton) {
    togglePasswordButton.addEventListener("click", () => {
      const isPassword = passwordField.type === "password";
      passwordField.type = isPassword ? "text" : "password";
      togglePasswordButton.innerHTML = isPassword
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
    });
  }

  // Forgot Password
  forgotPasswordLink.addEventListener("click", () => {
    renderForgotPasswordForm(loginCard, closeBtn);
  });

  // Input validation error reset
  emailField.addEventListener("input", () => {
    if (emailField.parentElement.querySelector(".form-text")) {
      emailField.parentElement.querySelector(".form-text").remove();
    }
    errorP.innerText="";

  });

  passwordField.addEventListener("input", () => {
    if (passwordField.parentElement.parentElement.querySelector(".form-text")) {
      passwordField.parentElement.parentElement
        .querySelector(".form-text")
        .remove();

    }
    errorP.innerText="";

  });


  loginForm.addEventListener("submit", (e) => {
    let errors = getLoginErrors(emailField, passwordField);
    console.log(users);

    if (errors.length === 0) {
      const emailVal = emailField.value.trim();
      const passwordVal = passwordField.value.trim();
      console.log(emailVal, passwordVal);
      const validUser = validateUserData(emailVal, passwordVal, users, "login");

      if (validUser.length > 0)
      {
        localStorage.setItem("name",validUser[0].FirstName);
        localStorage.setItem("loggedin","true");
        closeBtn.click();
        location.reload();
      }
      else 
      {
        e.preventDefault();
        errorP.innerText= "Wrong email or password";
        errorP.classList.add("form-text", "text-danger");
      }
    }
  });
}

//add error msgs
export const errorMsg = (parent, msg) => {
  if (parent.querySelector(".form-text")) {
    parent.querySelector(".form-text").remove();
  }
  const errorElement = document.createElement("div");
  errorElement.className = "form-text text-danger";
  errorElement.textContent = msg;
  parent.appendChild(errorElement);
};

//fetch users
export async function fetchUsersNData() {
  try {
    const res = await fetch("../data.json");
    if (!res.ok) throw new Error(`Error ${res.status}, couldn't load data!`);
    return await res.json();
  } catch (error) {
    console.error("Unable to fetch data:", error);
    return [];
  }
}

//get errors
function getLoginErrors(emailField, passwordField) {
  let errors = [];
  if (!emailField.value) {
    errors.push("email is required");
    errorMsg(emailField.parentElement, "email is required");
  }
  if (!passwordField.value) {
    errors.push("password is required");
    errorMsg(passwordField.parentElement.parentElement, "password is required");
  }
  return errors;
}

//validate login data
export function validateUserData(email, password, users, type) {
  if (type === "login") {
    const user = users?.filter((user) => {
      return user.Email == email && user.Password == password;
    });
    return user;
  } else{
      const user = users?.filter((user) => {
        return user.Email == email;
      });
      return user;
    }
  }

