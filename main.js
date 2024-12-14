const regexPatterns = {
  name: /^[A-Za-z\s]+$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  address: /^[A-Za-z0-9\s,.-]+$/,
  phone: /^\+977[0-9]{10}$/,
  country: /^[A-Za-z\s]+$/,
};

const errorMessages = {
  name: "Name should contain only alphabets!",
  email: "Please enter a valid email address!",
  address: "Address can only contain letters, numbers, and basic punctuation!",
  phone: "Phone number must start with +977 followed by 10 digits!",
  country: "Country name should contain only alphabets!",
  gender: "Please select a gender!",
};

const submitbtn = document.querySelector("button");
const checkbox = document.querySelector("#checkbox");

// Add event listener for checkbox
checkbox.addEventListener("change", function () {
  submitbtn.style.backgroundColor = this.checked
    ? "rgb(60, 157, 196)"
    : "#808080";
  submitbtn.style.cursor = this.checked ? "pointer" : "not-allowed";
});

const showError = (fieldId, message) => {
  const errorSpan = document.querySelector(`#${fieldId}-error`);
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.style.display = "block";

    setTimeout(() => {
      errorSpan.style.display = "none";
      errorSpan.textContent = "";
    }, 2000);
  }
};

const validate = (e) => {
  e.preventDefault();

  const formFields = {
    name: document.querySelector("#name").value.trim(),
    email: document.querySelector("#email").value.trim(),
    address: document.querySelector("#address").value.trim(),
    phone: document.querySelector("#phone").value.trim(),
    country: document.querySelector("#country").value.trim(),
  };

  // Validate text fields
  for (const field in formFields) {
    if (!regexPatterns[field].test(formFields[field])) {
      showError(field, errorMessages[field]);
      return false;
    }
  }

  // Validate gender radio selection
  const genderSelected = document.querySelector('input[name="gender"]:checked');
  if (!genderSelected) {
    showError("gender", errorMessages.gender);
    return false;
  }

  // Validate checkbox
  if (!checkbox.checked) {
    showError("checkbox", "Please agree to the terms and conditions!");
    return false;
  }

  console.log("All fields are valid:", {
    ...formFields,
    gender: genderSelected.value,
  });
  return true;
};

// Initialize button state on page load
submitbtn.style.backgroundColor = checkbox.checked
  ? "rgb(60, 157, 196)"
  : "#808080";
submitbtn.style.cursor = checkbox.checked ? "pointer" : "not-allowed";
