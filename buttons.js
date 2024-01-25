const scrollDuration = 1000; // miliseconds
const scrollSpeed = 5; // seconds

function sendEmail() {
  disableErrorMessage();

  var email = document.getElementById("email").value;

  enableLoader();

  check = validateEmail(email);

  if (check) {
    handleAPICall(email).catch(() => {
      disableLoader();
      showError("Something went wrong.");
    });
  } else {
    showError("Please enter a valid email.");
    disableLoader();
  }
}

async function handleAPICall(email) {
  await fetch("/.netlify/functions/mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((response) => {
      response.json().then((bd) => {
        if (response.status == 200) {
          showEmailSuccess();
        } else {
          disableLoader();
          showError("Something went wrong.");
        }
      });
    })
    .catch(() => {
      disableLoader();
      showError("Something went wrong.");
    });
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

function enableLoader() {
  var button = document.getElementById("subscribe-top");
  var loader = document.getElementById("loader-top");

  button.style.display = "none";
  loader.style.display = "inline-block";
}

function disableLoader() {
  var button = document.getElementById("subscribe-top");
  var loader = document.getElementById("loader-top");

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
