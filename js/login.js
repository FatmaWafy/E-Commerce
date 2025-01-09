import renderLoginForm from './LoginForm.js';

document.getElementById("userIcon").addEventListener("click", async () => {

  // Create overlay and login card
  const overlay = createOverlay();
  const loginCard = createLoginCard();
  const closeBtn = createCloseButton();

  document.body.appendChild(overlay);
  overlay.appendChild(loginCard);

  // Render login form and attach listeners
  renderLoginForm(loginCard, closeBtn);
  
  // Close overlay on button click or overlay click
  attachOverlayListeners(overlay, closeBtn);
});



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

