//emailjs.init("4k7DNiTXaPW7lod8j");

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const submitButton = document.querySelector(".normal2");

  submitButton.textContent = "Sending...";

  let params = {
    from_name: name,
    from_email: email,
    message: message,
  };

  emailjs
    .send("service_6yyiqxb", "template_c5wanf2", params)
    .then(() => {
      submitButton.textContent = "Sent!";
      setTimeout(() => {
        submitButton.textContent = "Submit";
        document.getElementById("contactForm").reset();
      }, 3000);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      submitButton.textContent = "Failed";
      setTimeout(() => {
        submitButton.textContent = "Submit";
      }, 3000);
    });
});
