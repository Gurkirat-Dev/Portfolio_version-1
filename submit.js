
  // Initialize EmailJS
  emailjs.init("FDCXC7HRhpEYeIAtt"); // Replace with your actual EmailJS public key

  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const submitBtn = document.getElementById("submitBtn");

    emailjs.sendForm("service_012hn66", "template_4utwsun", form)
      .then(() => {
        submitBtn.textContent = "Sended!";
        submitBtn.style.color = "white";
        submitBtn.style.background = "green";
        form.reset();
      }, (error) => {
        submitBtn.textContent = "Not Sended!";
        submitBtn.style.background = "red";
        console.error(error);
      });
  });
