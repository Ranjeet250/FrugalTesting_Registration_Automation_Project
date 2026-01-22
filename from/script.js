// ============================================
// STATE & LOCATION DATA
// ============================================

const statesByCountry = {
  USA: ["California", "Texas", "Florida", "New York", "Pennsylvania"],
  UK: ["England", "Scotland", "Wales", "Northern Ireland"],
  Canada: ["Ontario", "Quebec", "Alberta", "British Columbia"],
  Australia: ["New South Wales", "Victoria", "Queensland", "Western Australia"],
  India: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat"],
};

const citiesByState = {
  California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
  Texas: ["Houston", "Dallas", "Austin", "San Antonio"],
  Florida: ["Miami", "Tampa", "Orlando", "Jacksonville"],
  England: ["London", "Manchester", "Liverpool", "Leeds"],
  Scotland: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee"],
  Ontario: ["Toronto", "Ottawa", "Hamilton", "London"],
  "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Central Coast"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Aurangabad"],
  Delhi: ["New Delhi", "North Delhi", "South Delhi"],
  default: ["Select a state first"],
};

const phoneCodesByCountry = {
  USA: { code: "+1", length: 10 },
  UK: { code: "+44", length: 10 },
  Canada: { code: "+1", length: 10 },
  Australia: { code: "+61", length: 9 },
  India: { code: "+91", length: 10 },
};

const disposableDomains = [
  "tempmail.com",
  "10minutemail.com",
  "mailinator.com",
  "temp-mail.org",
  "throwaway.email",
  "guerrillamail.com",
  "yopmail.com",
  "temp.email",
  "10minuteemail.com",
];

// ============================================
// DOM ELEMENTS
// ============================================

const form = document.getElementById("regForm");
const submitBtn = document.getElementById("submitBtn");
const errorContainer = document.getElementById("errorContainer");
const successContainer = document.getElementById("successContainer");
const successMsg = document.getElementById("successMsg");

const fields = {
  fname: document.getElementById("fname"),
  lname: document.getElementById("lname"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  age: document.getElementById("age"),
  gender: document.getElementById("gender"),
  address: document.getElementById("address"),
  country: document.getElementById("country"),
  state: document.getElementById("state"),
  city: document.getElementById("city"),
  pass: document.getElementById("pass"),
  cpass: document.getElementById("cpass"),
  terms: document.getElementById("terms"),
};

const errorElements = {
  fname: document.getElementById("fnameErr"),
  lname: document.getElementById("lnameErr"),
  email: document.getElementById("emailErr"),
  phone: document.getElementById("phoneErr"),
  age: document.getElementById("ageErr"),
  gender: document.getElementById("genderErr"),
  address: document.getElementById("addressErr"),
  country: document.getElementById("countryErr"),
  state: document.getElementById("stateErr"),
  city: document.getElementById("cityErr"),
  pass: document.getElementById("passErr"),
  cpass: document.getElementById("cpassErr"),
  terms: document.getElementById("termsErr"),
};

// ============================================
// EVENT LISTENERS
// ============================================

// Real-time validation on input/blur
Object.keys(fields).forEach((key) => {
  fields[key].addEventListener("input", validateField);
  fields[key].addEventListener("blur", validateField);
  fields[key].addEventListener("change", validateField);
});

// Country change - update states
fields.country.addEventListener("change", function () {
  updateStates();
  validateField.call(this);
});

// State change - update cities
fields.state.addEventListener("change", function () {
  updateCities();
  validateField.call(this);
});

// Password strength on input
fields.pass.addEventListener("input", updatePasswordStrength);

// Form submission
form.addEventListener("submit", handleFormSubmit);

// ============================================
// VALIDATION FUNCTIONS
// ============================================

function validateField(event) {
  const field = event.target;
  const fieldName = field.id;

  let isValid = true;

  switch (fieldName) {
    case "fname":
    case "lname":
      isValid = validateName(field.value, fieldName);
      break;
    case "email":
      isValid = validateEmail(field.value);
      break;
    case "phone":
      isValid = validatePhone(field.value);
      break;
    case "age":
      isValid = validateAge(field.value);
      break;
    case "gender":
      isValid = validateGender(field.value);
      break;
    case "country":
      isValid = validateCountry(field.value);
      break;
    case "state":
      isValid = validateState(field.value);
      break;
    case "city":
      isValid = validateCity(field.value);
      break;
    case "pass":
      isValid = validatePassword(field.value);
      break;
    case "cpass":
      isValid = validateConfirmPassword(field.value);
      break;
    case "terms":
      isValid = validateTerms(field.checked);
      break;
  }

  // Update field styling
  if (isValid) {
    field.classList.remove("invalid");
    errorElements[fieldName].textContent = "";
  } else {
    field.classList.add("invalid");
  }

  // Check if form is valid and update submit button
  checkFormValidity();

  return isValid;
}

function validateName(value, fieldName) {
  const trimmedValue = value.trim();
  const fieldLabel = fieldName === "fname" ? "First name" : "Last name";

  if (trimmedValue === "") {
    errorElements[fieldName].textContent = `${fieldLabel} is required`;
    return false;
  }

  if (trimmedValue.length < 2) {
    errorElements[fieldName].textContent =
      `${fieldLabel} must be at least 2 characters`;
    return false;
  }

  if (!/^[a-zA-Z\s'-]+$/.test(trimmedValue)) {
    errorElements[fieldName].textContent =
      `${fieldLabel} can only contain letters, spaces, hyphens, and apostrophes`;
    return false;
  }

  return true;
}

function validateEmail(value) {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    errorElements.email.textContent = "Email is required";
    return false;
  }

  // Basic email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedValue)) {
    errorElements.email.textContent = "Please enter a valid email address";
    return false;
  }

  // Check for disposable domains
  const domain = trimmedValue.split("@")[1].toLowerCase();
  if (disposableDomains.includes(domain)) {
    errorElements.email.textContent =
      "Disposable email domains are not allowed";
    return false;
  }

  return true;
}

function validatePhone(value) {
  const trimmedValue = value.trim();
  const selectedCountry = fields.country.value;

  if (trimmedValue === "") {
    errorElements.phone.textContent = "Phone number is required";
    return false;
  }

  // Remove common formatting characters
  const cleanedPhone = trimmedValue.replace(/[\s\-\(\)]/g, "");

  if (selectedCountry && phoneCodesByCountry[selectedCountry]) {
    const { code, length } = phoneCodesByCountry[selectedCountry];
    const expectedLength = length;

    // Check if phone starts with country code or just digits
    if (cleanedPhone.startsWith(code.replace("+", ""))) {
      if (
        cleanedPhone.replace(code.replace("+", ""), "").length !==
        expectedLength
      ) {
        errorElements.phone.textContent = `Phone must have ${expectedLength} digits for ${selectedCountry}`;
        return false;
      }
    } else if (
      !/^\d+$/.test(cleanedPhone) ||
      cleanedPhone.length !== expectedLength
    ) {
      errorElements.phone.textContent = `Phone must have ${expectedLength} digits for ${selectedCountry}`;
      return false;
    }
  } else {
    if (!/^\d+$/.test(cleanedPhone) || cleanedPhone.length < 7) {
      errorElements.phone.textContent = "Please enter a valid phone number";
      return false;
    }
  }

  return true;
}

function validateAge(value) {
  if (value === "") {
    return true; // Age is optional
  }

  const age = parseInt(value);

  if (isNaN(age)) {
    errorElements.age.textContent = "Please enter a valid age";
    return false;
  }

  if (age < 18) {
    errorElements.age.textContent = "You must be at least 18 years old";
    return false;
  }

  if (age > 120) {
    errorElements.age.textContent = "Please enter a valid age";
    return false;
  }

  return true;
}

function validateGender(value) {
  if (value === "") {
    errorElements.gender.textContent = "Gender is required";
    return false;
  }
  return true;
}

function validateCountry(value) {
  if (value === "") {
    errorElements.country.textContent = "Country is required";
    return false;
  }
  return true;
}

function validateState(value) {
  if (fields.country.value === "") {
    return true; // State validation skipped if country not selected
  }

  if (value === "") {
    errorElements.state.textContent = "State is required";
    return false;
  }
  return true;
}

function validateCity(value) {
  if (fields.state.value === "") {
    return true; // City validation skipped if state not selected
  }

  if (value === "") {
    errorElements.city.textContent = "City is required";
    return false;
  }
  return true;
}

function validatePassword(value) {
  if (value === "") {
    errorElements.pass.textContent = "Password is required";
    return false;
  }

  if (value.length < 8) {
    errorElements.pass.textContent = "Password must be at least 8 characters";
    return false;
  }

  return true;
}

function validateConfirmPassword(value) {
  if (value === "") {
    errorElements.cpass.textContent = "Confirm password is required";
    return false;
  }

  if (value !== fields.pass.value) {
    errorElements.cpass.textContent = "Passwords do not match";
    return false;
  }

  return true;
}

function validateTerms(checked) {
  if (!checked) {
    errorElements.terms.textContent =
      "You must accept the terms and conditions";
    return false;
  }
  return true;
}

// ============================================
// PASSWORD STRENGTH METER
// ============================================

function updatePasswordStrength() {
  const password = fields.pass.value;
  const strengthMeter = document.getElementById("passwordStrength");

  if (password === "") {
    strengthMeter.classList.remove("show", "weak", "medium", "strong");
    return;
  }

  strengthMeter.classList.add("show");

  const strength = calculatePasswordStrength(password);

  strengthMeter.classList.remove("weak", "medium", "strong");
  strengthMeter.classList.add(strength);
}

function calculatePasswordStrength(password) {
  let strength = 0;

  // Length
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;

  // Has uppercase
  if (/[A-Z]/.test(password)) strength++;

  // Has lowercase
  if (/[a-z]/.test(password)) strength++;

  // Has numbers
  if (/\d/.test(password)) strength++;

  // Has special characters
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;

  if (strength <= 2) return "weak";
  if (strength <= 4) return "medium";
  return "strong";
}

// ============================================
// DEPENDENT DROPDOWNS
// ============================================

function updateStates() {
  const country = fields.country.value;
  const stateSelect = fields.state;
  const citySelect = fields.city;

  // Reset city
  citySelect.innerHTML = '<option value="">Select City</option>';
  citySelect.disabled = true;

  if (country === "") {
    stateSelect.innerHTML = '<option value="">Select State</option>';
    stateSelect.disabled = true;
    return;
  }

  const states = statesByCountry[country] || [];
  stateSelect.innerHTML = '<option value="">Select State</option>';

  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });

  stateSelect.disabled = false;
}

function updateCities() {
  const state = fields.state.value;
  const citySelect = fields.city;

  if (state === "") {
    citySelect.innerHTML = '<option value="">Select City</option>';
    citySelect.disabled = true;
    return;
  }

  const cities = citiesByState[state] || citiesByState.default;
  citySelect.innerHTML = '<option value="">Select City</option>';

  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });

  citySelect.disabled = false;
}

// ============================================
// FORM VALIDITY CHECK
// ============================================

function checkFormValidity() {
  const isValid =
    validateName(fields.fname.value, "fname") &&
    validateName(fields.lname.value, "lname") &&
    validateEmail(fields.email.value) &&
    validatePhone(fields.phone.value) &&
    validateAge(fields.age.value) &&
    validateGender(fields.gender.value) &&
    validateCountry(fields.country.value) &&
    validateState(fields.state.value) &&
    validateCity(fields.city.value) &&
    validatePassword(fields.pass.value) &&
    validateConfirmPassword(fields.cpass.value) &&
    validateTerms(fields.terms.checked);

  submitBtn.disabled = !isValid;
}

// ============================================
// FORM SUBMISSION
// ============================================

function handleFormSubmit(e) {
  e.preventDefault();

  // Clear previous alerts
  errorContainer.classList.remove("show");
  successContainer.classList.remove("show");
  successMsg.classList.remove("show");

  // Validate all fields
  const allValid =
    validateName(fields.fname.value, "fname") &&
    validateName(fields.lname.value, "lname") &&
    validateEmail(fields.email.value) &&
    validatePhone(fields.phone.value) &&
    validateAge(fields.age.value) &&
    validateGender(fields.gender.value) &&
    validateCountry(fields.country.value) &&
    validateState(fields.state.value) &&
    validateCity(fields.city.value) &&
    validatePassword(fields.pass.value) &&
    validateConfirmPassword(fields.cpass.value) &&
    validateTerms(fields.terms.checked);

  if (!allValid) {
    showErrorAlert("Please fix the errors above and try again.");
    return;
  }

  // Prepare form data
  const formData = {
    firstName: fields.fname.value.trim(),
    lastName: fields.lname.value.trim(),
    email: fields.email.value.trim(),
    phone: fields.phone.value.trim(),
    age: fields.age.value || "Not provided",
    gender: fields.gender.value,
    address: fields.address.value.trim() || "Not provided",
    country: fields.country.value,
    state: fields.state.value,
    city: fields.city.value,
    timestamp: new Date().toISOString(),
  };

  // Log to console for debugging
  console.log("Registration Data:", formData);

  // Simulate form submission
  showSuccessAlert(
    "Registration Successful!",
    "Your profile has been submitted successfully.",
  );

  // Reset form after 2 seconds
  setTimeout(() => {
    resetForm();
  }, 2000);
}

// ============================================
// UI FEEDBACK
// ============================================

function showErrorAlert(message) {
  errorContainer.innerHTML = `<strong>Error!</strong> ${message}`;
  errorContainer.classList.add("show");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showSuccessAlert(title, message) {
  successMsg.innerHTML = `
    <h2>✓ ${title}</h2>
    <p>${message}</p>
  `;
  successMsg.classList.add("show");
  successContainer.innerHTML = `<strong>Success!</strong> Your registration has been submitted.`;
  successContainer.classList.add("show");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetForm() {
  form.reset();
  fields.state.disabled = true;
  fields.city.disabled = true;
  fields.state.innerHTML = '<option value="">Select State</option>';
  fields.city.innerHTML = '<option value="">Select City</option>';

  // Remove error styling
  Object.keys(errorElements).forEach((key) => {
    fields[key].classList.remove("invalid");
    errorElements[key].textContent = "";
  });

  // Hide password strength meter
  document
    .getElementById("passwordStrength")
    .classList.remove("show", "weak", "medium", "strong");

  // Clear alerts after delay
  setTimeout(() => {
    successMsg.classList.remove("show");
    successContainer.classList.remove("show");
    errorContainer.classList.remove("show");
  }, 5000);

  // Disable submit button
  submitBtn.disabled = true;
}

// ============================================
// INITIALIZATION
// ============================================

// Initial disable of dependent dropdowns
fields.state.disabled = true;
fields.city.disabled = true;
submitBtn.disabled = true;
