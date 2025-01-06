// Accessing form and fields
const registerForm = document.getElementById("register-form");
const FName = document.getElementById("fname");
const LName = document.getElementById("lname");
const Phone = document.getElementById("phone");
const Address = document.getElementById("address");
const Email = document.getElementById("email");
const Pass = document.getElementById("password");
const CPass = document.getElementById("cpassword");

const FNameError = document.getElementById("error1");
const LNameError = document.getElementById("error2");
const PhoneError = document.getElementById("error3");
const AddressError = document.getElementById("error4");
const EmailError = document.getElementById("error5");
const PassError = document.getElementById("error6");
const CPassError = document.getElementById("error7");
const messageElement = document.getElementById("message");

// Password visibility toggle
document.getElementById("togglePassword").addEventListener("click", function() {
  const passwordField = document.getElementById("password");
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
});

document.getElementById("togglecPassword").addEventListener("click", function() {
  const cpasswordField = document.getElementById("cpassword");
  if (cpasswordField.type === "password") {
    cpasswordField.type = "text";
  } else {
    cpasswordField.type = "password";
  }
});

// Form submission logic
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Clear previous errors
  FNameError.textContent = "";
  LNameError.textContent = "";
  PhoneError.textContent = "";
  AddressError.textContent = "";
  EmailError.textContent = "";
  PassError.textContent = "";
  CPassError.textContent = "";
  messageElement.textContent = "";

  let isValid = true;

  // Validation checks
  if (!FName.value.trim()) {
    FNameError.textContent = "First Name is required!";
    isValid = false;
  }

  if (!LName.value.trim()) {
    LNameError.textContent = "Last Name is required!";
    isValid = false;
  }

  if (!Phone.value.trim()) {
    PhoneError.textContent = "Phone Number is required!";
    isValid = false;
  }

  if (!Address.value.trim()) {
    AddressError.textContent = "Address is required!";
    isValid = false;
  }

  if (!Email.value.trim()) {
    EmailError.textContent = "Email is required!";
    isValid = false;
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Email.value)) {
    EmailError.textContent = "Enter a valid email!";
    isValid = false;
  }

  if (!Pass.value.trim()) {
    PassError.textContent = "Password is required!";
    isValid = false;
  }

  if (Pass.value !== CPass.value) {
    CPassError.textContent = "Passwords do not match!";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  // Proceed with storing user data (e.g., using localStorage)
  const newUser = {
    firstName: FName.value,
    lastName: LName.value,
    phone: Phone.value,
    address: Address.value,
    email: Email.value,
    password: Pass.value,
  };

  // Store data in localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  messageElement.textContent = "User added successfully!";
  messageElement.style.color = "green";

  // Optionally, reset form after submission
  registerForm.reset();
});
