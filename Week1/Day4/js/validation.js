function validateName(name) {
  return {
    valid: name.trim().length >= 3,
    message: name.trim().length >= 3 ? "" : "Name must be at least 3 characters"
  };
}

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    valid: pattern.test(email),
    message: pattern.test(email) ? "" : "Invalid email format"
  };
}

function validatePassword(password) {
  const pattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return {
    valid: pattern.test(password),
    message: pattern.test(password)
      ? ""
      : "Weak password (8 chars, 1 uppercase, 1 number)"
  };
}

function validatePhone(phone) {
  const pattern = /^(\+92|0)?[0-9]{10}$/;

  return {
    valid: pattern.test(phone),
    message: pattern.test(phone)
      ? ""
      : "Enter valid phone (e.g. +923XXXXXXXXX or 03XXXXXXXXX)"
  };
}

function validateDOB(dob) {
  if (!dob) return { valid: false, message: "DOB required" };

  const birth = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return {
    valid: age >= 18,
    message: age >= 18 ? "" : "Must be 18+"
  };
}