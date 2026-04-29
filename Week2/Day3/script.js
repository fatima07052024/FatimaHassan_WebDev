const container = document.getElementById("usersContainer");
const message = document.getElementById("message");
const searchInput = document.getElementById("search");
const sortFilter = document.getElementById("sortFilter");

let usersData = [];
let activeCard = null;

// Fetch users
async function fetchUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) throw new Error("Fetch failed");

    let data = await res.json();

    // STEP 1: FILTER (lat < 0)
    data = data.filter(user => parseFloat(user.address.geo.lat) < 0);

    usersData = data;
    displayUsers(data);

  } catch (err) {
    message.textContent = "Failed to fetch users";
    console.error(err);
  }
}

// SORT FUNCTION
function sortUsers(users, type) {
  if (type === "az") {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }

  if (type === "za") {
    return [...users].sort((a, b) => b.name.localeCompare(a.name));
  }

  return users; // default order
}

// Display users
function displayUsers(users) {
  container.innerHTML = "";

  if (users.length === 0) {
    message.textContent = "No users found";
    return;
  }

  message.textContent = "";

  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Highlight zipcode starting with 5
    if (user.address.zipcode.startsWith("5")) {
      card.classList.add("highlight");
    }

    card.innerHTML = `
      <h3>${user.name}</h3>
      <p>${user.email}</p>
      <p>${user.address.city}</p>

      <button>Show Details</button>

      <div class="details">
        <p>${user.address.street}, ${user.address.suite}</p>
        <p>${user.address.city}</p>
        <p><i>${user.company.catchPhrase}</i></p>
      </div>
    `;

    const btn = card.querySelector("button");
    const details = card.querySelector(".details");

    btn.addEventListener("click", () => {
      // close previous open
      if (activeCard && activeCard !== details) {
        activeCard.style.display = "none";
      }

      // toggle current
      if (details.style.display === "block") {
        details.style.display = "none";
        activeCard = null;
      } else {
        details.style.display = "block";
        activeCard = details;
      }
    });

    container.appendChild(card);
  });
}

// SEARCH + SORT COMBINED
function renderUI() {
  const searchValue = searchInput.value.toLowerCase();
  const sortValue = sortFilter.value;

  let filtered = usersData.filter(user =>
    user.name.toLowerCase().includes(searchValue) ||
    user.email.toLowerCase().includes(searchValue)
  );

  filtered = sortUsers(filtered, sortValue);

  displayUsers(filtered);
}

// SEARCH EVENT
searchInput.addEventListener("input", renderUI);

// SORT EVENT
sortFilter.addEventListener("change", renderUI);

// START APP
fetchUsers();