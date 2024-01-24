const scrollDuration = 1000; // miliseconds
const scrollSpeed = 5; // seconds

function sendEmail() {
  disableErrorMessage();

  var button = document.getElementById("subscribe-top");
  var loader = document.getElementById("loader-top");
  var email = document.getElementById("email").value;

  enableLoader(loader, button);

  check = validateEmail(email);

  console.log("Email: " + email);

  if (check) {
    new Promise((resolve, reject) => {
      // api call
      // if api call fails
      showEmailSuccess();
    });
  } else {
    showError("Please enter a valid email.");
    disableLoader(loader, button);
  }
}

function showEmailSuccess() {
  var thankYouMessage = document.getElementById("thank-you-message");
  var newsletterForm = document.getElementById("newsletter-form-top");
  var loader = document.getElementById("loader-top");

  thankYouMessage.style.display = "inline-block";
  newsletterForm.style.display = "none";
  loader.style.display = "none";
}

function showError(errorText) {
  var errorTextField = document.getElementById("error-text");
  errorTextField.style.display = "inline-block";
  errorTextField.innerHTML = errorText;
}

function disableErrorMessage() {
  var errorTextField = document.getElementById("error-text");
  errorTextField.style.display = "none";
}

function enableLoader(loader, button) {
  button.style.display = "none";
  loader.style.display = "inline-block";
}

function disableLoader(loader, button) {
  loader.style.display = "none";
  button.style.display = "inline-block";
}

function validateEmail(address) {
  var emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if (emailRegex.test(address)) {
    return true;
  } else {
    return false;
  }
}
