let userIcone = document.getElementById("userIcon");
userIcone.addEventListener("click", () => {
    // Create overlay
    let overlay = document.createElement("div");
    overlay.className = "login-overlay"; // Apply the class for styling the overlay

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
          required/>
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control-lg w-100 h-50 my-2"
            id="exampleInputPassword1"
            placeholder="Password"
          required/>
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
          <p>Don't have an account? <a href="#">Register now</a></p>
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

    // Add event listener to close the login card when the close button is clicked
    closeBtn.addEventListener("click", () => {
        document.body.removeChild(overlay);
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
});
