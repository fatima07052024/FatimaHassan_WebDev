document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const dobInput = document.getElementById("dob");
const phoneInput = document.getElementById("phone");
const countrySelect = document.getElementById("country");
const citySelect = document.getElementById("city");
const imageInput = document.getElementById("image");

const submitBtn = form.querySelector("button[type='submit']");
const successMsg = document.getElementById("successMsg");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const dobError = document.getElementById("dobError");

// ---------------- IMAGE PREVIEW ----------------
const preview = document.createElement("img");
preview.style.width = "80px";
preview.style.marginTop = "10px";
document.querySelector(".container").appendChild(preview);

// ---------------- COUNTRIES ----------------
function loadCountries() {
  if (!window.countryCity) return;

  countrySelect.innerHTML = `<option value="">Select Country</option>`;

  Object.keys(countryCity).forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    countrySelect.appendChild(opt);
  });
}

// ---------------- CITIES ----------------
countrySelect.addEventListener("change", () => {
  citySelect.innerHTML = `<option value="">Select City</option>`;

  if (countryCity[countrySelect.value]) {
    countryCity[countrySelect.value].forEach(city => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      citySelect.appendChild(opt);
    });
  }
});

// ---------------- IMAGE ----------------
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => preview.src = e.target.result;
  reader.readAsDataURL(file);
});

// ---------------- LIVE VALIDATION (MESSAGES ONLY) ----------------
emailInput.addEventListener("input", () => {
  emailError.textContent = validateEmail(emailInput.value).message;
});

passwordInput.addEventListener("input", () => {
  passwordError.textContent = validatePassword(passwordInput.value).message;
});

dobInput.addEventListener("input", () => {
  dobError.textContent = validateDOB(dobInput.value).message;
});

// ---------------- SUBMIT (🔥 FIXED LOGIC ONLY HERE) ----------------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // VALIDATION CHECK
  const valid =
    validateName(nameInput.value).valid &&
    validateEmail(emailInput.value).valid &&
    validatePassword(passwordInput.value).valid &&
    validateDOB(dobInput.value).valid &&
    validatePhone(phoneInput.value).valid &&
    countrySelect.value !== "" &&
    citySelect.value !== "";

  if (!valid) {
    successMsg.style.display = "block";
    successMsg.style.color = "red";
    successMsg.textContent = "❌ Please fill all inputs correctly";
    return;
  }

  // SAVE DATA
  const data = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    dob: dobInput.value,
    phone: phoneInput.value,
    country: countrySelect.value,
    city: citySelect.value,
    image: preview.src
  };

  saveData(data);

  // SHOW POPUP INSTEAD
showPopup();

  form.reset();
  preview.src = "";
});

// ---------------- AUTO FILL ----------------
function loadSavedData() {
  const data = getData();
  if (!data) return;

  nameInput.value = data.name;
  emailInput.value = data.email;
  passwordInput.value = data.password;
  dobInput.value = data.dob;
  phoneInput.value = data.phone;

  countrySelect.value = data.country;
  countrySelect.dispatchEvent(new Event("change"));

  setTimeout(() => {
    citySelect.value = data.city;
  }, 100);

  if (data.image) preview.src = data.image;
}
function showPopup() {
  const popup = document.createElement("div");
  popup.classList.add("popup");

  popup.innerHTML = `
    <div class="popup-box">
      <h2>🎉 Registration Successful</h2>
      <p>Your account has been created successfully.</p>
      <button id="closePopup">OK</button>
    </div>
  `;

  document.body.appendChild(popup);

  document.getElementById("closePopup").addEventListener("click", () => {
    popup.remove();
  });
}
// ---------------- INIT ----------------
loadCountries();
loadSavedData();

});