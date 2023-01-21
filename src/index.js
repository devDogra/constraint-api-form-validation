const email = document.getElementById("email-input");
const country = document.getElementById("country-input");
const zip = document.getElementById("zip-input");
const pwd = document.getElementById("pwd-input");
const confirmpwd = document.getElementById("confirm-pwd-input");
const form = document.querySelector("form");

function renderError(input) {
  console.log(input.validationMessage);

  const span = input.nextElementSibling;

  const valMsg = input.validationMessage;

  if (valMsg !== "") {
    span.innerText = valMsg;
    span.classList.remove("hide");
  } else {
    span.innerText = "";
    span.classList.add("hide");
  }
}

function validateCountry() {
  const validityState = country.validity;
  if (!country.value) {
    country.setCustomValidity("Please select a country");
  } else {
    country.setCustomValidity("");
  }
  country.reportValidity();
}

function validateEmail() {
  const validityState = email.validity;

  if (validityState.valueMissing) {
    email.setCustomValidity(`Email cant be empty`);
  } else if (validityState.patternMismatch) {
    email.setCustomValidity(
      `Email must be in the specified format (eg: abc@cuz.com)`
    );
  } else {
    email.setCustomValidity("");
  }

  email.reportValidity();
}

function validateZip() {
  const val = parseInt(zip.value);
  if (!zip.value) {
    zip.setCustomValidity("Zip code must be a number");
  } else if (val <= 10000 || val >= 20000) {
    zip.setCustomValidity("Zip code not in range (10k-20k)");
  } else {
    zip.setCustomValidity("");
  }

  zip.reportValidity();
}

function validatePwd() {
  const val = pwd.value;
  const confirmval = confirmpwd.value;
  console.log({ val, confirmval });
  if (!val) {
    pwd.setCustomValidity("Pick a pwd");
  } else if (val.length < 8) {
    pwd.setCustomValidity("Password must be > 8 chars");
  } else if (confirmpwd.validity.valid) {
    pwd.setCustomValidity("");
  }

  pwd.reportValidity();
}
function validateConfirmPwd() {
  const val = pwd.value;
  const confirmval = confirmpwd.value;
  console.log({ val, confirmval });

  if (confirmval !== val) {
    confirmpwd.setCustomValidity("Passwords must match");
  } else {
    confirmpwd.setCustomValidity("");
  }

  confirmpwd.reportValidity();
}
// Event listeners

form.addEventListener("submit", (e) => {
  // if any of its controls have invalid, dont submit
  if (!form.checkValidity()) {
    e.preventDefault();
  } else {
    // stand in for submit
    e.preventDefault();
    form.style.backgroundColor = "green";
  }
});

email.addEventListener("input", (e) => {
  validateEmail();
  renderError(email);
});

country.addEventListener("blur", (e) => {
  validateCountry();
  renderError(country);
});

zip.addEventListener("blur", (e) => {
  validateZip();
  renderError(zip);
});

pwd.addEventListener("input", (e) => {
  validatePwd();
  renderError(pwd);
});
confirmpwd.addEventListener("blur", (e) => {
  validateConfirmPwd();
  renderError(confirmpwd);
});
