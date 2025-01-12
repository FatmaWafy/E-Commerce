import renderLoginForm from "./LoginForm.js";
const userIcon = document.getElementById("userIcon");
const mobileLoginBtn = document.getElementById("mobileLoginBtn");
const userName = document.getElementById("userName");
const userNameMob = document.getElementById("userNameMob");

const logoutLi = document.createElement("li");

window.addEventListener("load", () => {
  if (isLoggedin()) {
    if(screen.width>=992)
    {
      userName.innerText = localStorage.getItem("name");
      const logoutA = document.createElement("a");
      logoutA.setAttribute("id", "logout");
      logoutA.innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket"></i> Logout`;
      logoutLi.appendChild(logoutA);
      logoutLi.style.cursor = "pointer";
      userIcon.parentElement.parentElement.appendChild(logoutLi);
    }else{
      //mobile fiendly
      userNameMob.innerText = localStorage.getItem("name");
      logoutLi.innerHTML=`<i class="fa-solid fa-arrow-right-from-bracket"></i> Logout`;
      logoutLi.setAttribute("id", "logout");
      logoutLi.style.cursor = "pointer";
      mobileLoginBtn.parentElement.appendChild(logoutLi);
    }
   
  } else {
    userName.innerText = "Login";
    userNameMob.innerText = "Login";

  }
});

const addForm = function () {
  if (!isLoggedin()) {
    // Create overlay and login card
    console.log(this);
    const overlay = createOverlay();
    const loginCard = createLoginCard();
    const closeBtn = createCloseButton();

    document.body.appendChild(overlay);
    overlay.appendChild(loginCard);

    // Render login form and attach listeners
    renderLoginForm(loginCard, closeBtn);

    // Close overlay on button click or overlay click
    attachOverlayListeners(overlay, closeBtn);
  }
};
userIcon.addEventListener("click", addForm);
mobileLoginBtn.addEventListener("click", addForm);

logoutLi.addEventListener("click", () => {
  if (confirm("Are you sure to log out?")) {
    localStorage.setItem("loggedin", "false");
    localStorage.setItem("name", "");
    userName.innerText = "Login";
    userNameMob.innerText = "Login";
    logoutLi.remove();
  }
});

// function isLoggedin() {
//   if (!localStorage.getItem("loggedin")) {
//     localStorage.setItem("loggedin", "false");
//     return false;
//   }
//   if (localStorage.getItem("loggedin") === "true") return true;
//   else return false;
// }

window.isLoggedin = function() {
  if (!localStorage.getItem("loggedin")) {
    localStorage.setItem("loggedin", "false");
    return false;
  }
  if (localStorage.getItem("loggedin") === "true") return true;
  else return false;
};


function createOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "login-overlay";
  return overlay;
}

function createLoginCard() {
  const loginCard = document.createElement("div");
  loginCard.className = "login-card";
  return loginCard;
}

function createCloseButton() {
  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = "X";
  return closeBtn;
}

function attachOverlayListeners(overlay, closeBtn) {
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}
