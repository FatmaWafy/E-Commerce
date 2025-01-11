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

const indicator = document.querySelector(".indicator");
const strengthText = document.querySelector(".strength");

document.getElementById("togglePassword").addEventListener("click", function() {
  const passwordField = document.getElementById("password");
  const icon = this.querySelector("i");
  if (passwordField.type === "password") {
    passwordField.type = "text";
    icon.classList.remove("bi-eye");
    icon.classList.add("bi-eye-slash");
  } else {
    passwordField.type = "password";
    icon.classList.remove("bi-eye-slash");
    icon.classList.add("bi-eye");
  }
});

document.getElementById("togglecPassword").addEventListener("click", function() {
  const cpasswordField = document.getElementById("cpassword");
  const icon = this.querySelector("i");
  if (cpasswordField.type === "password") {
    cpasswordField.type = "text";
    icon.classList.remove("bi-eye");
    icon.classList.add("bi-eye-slash");
  } else {
    cpasswordField.type = "password";
    icon.classList.remove("bi-eye-slash");
    icon.classList.add("bi-eye");
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
    } else {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(Pass.value.trim())) {
            PassError.textContent = "Password must be at least 8 characters, include one uppercase letter, one number, and one special character!";
            isValid = false;
        } else {
            PassError.textContent = ""; // Clear the error message if the password is valid
        }
    }


  if (Pass.value !== CPass.value) {
    CPassError.textContent = "Passwords do not match!";
    isValid = false;
  }



  if (!isValid) {
    return;
  }

const newUser = {
  firstName: FName.value,
  lastName: LName.value,
  phone: Phone.value,
  address: Address.value,
  email: Email.value,
  password: Pass.value,
};

fetch("http://localhost:3000/addUser", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newUser),
})
  .then((response) => response.json())
  .then((data) => {
    const messageElement = document.getElementById("message");
    console.log("Server Response:", data);

    if (data.success) {
      // Success: user added
      messageElement.textContent = data.message;
      messageElement.style.color = "green"; 
      window.location.href = "../index.html"; 
      localStorage.setItem("name",newUser.firstName);
      localStorage.setItem("loggedin", "true");
    } else {
      // Failure: email already exists
      messageElement.textContent = data.message;
      messageElement.style.color = "red";
      setTimeout(() => {
        window.location.reload(); 
      }, 5000);
    }
  })
  .catch((error) => {
    const messageElement = document.getElementById("message");
    messageElement.textContent = "Error adding user!";
    messageElement.style.color = "red";
    console.error("Error:", error);
    setTimeout(() => {
      window.location.reload();  
    }, 5000);
  });



  // Store data in localStorage
  // let users = JSON.parse(localStorage.getItem("users")) || [];
  // users.push(newUser);
  // localStorage.setItem("users", JSON.stringify(users));

});
