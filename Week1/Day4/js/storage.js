function saveData(data) {
  localStorage.setItem("userData", JSON.stringify(data));
}

function getData() {
  return JSON.parse(localStorage.getItem("userData"));
}