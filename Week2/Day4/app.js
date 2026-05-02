// =======================
// SIGNUP
// =======================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.onsubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = {
      name: name.value,
      email: email.value,
      password: password.value
    };

    if (users.find((u) => u.email === user.email)) {
      alert("User already exists");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    location.href = "login.html";
  };
}

// =======================
// LOGIN
// =======================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.onsubmit = (e) => {
    e.preventDefault();

    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(
      (u) =>
        u.email === loginEmail.value &&
        u.password === loginPassword.value
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      location.href = "home.html";
    } else {
      alert("Invalid login");
    }
  };
}

// =======================
// PRODUCTS DATA CHECK
// =======================
// IMPORTANT: must come from product.js
if (typeof products === "undefined") {
  console.error("products array is missing. Check product.js");
}

// =======================
// HOME PAGE RENDER
// =======================
const container = document.getElementById("products");

if (container && typeof products !== "undefined") {
  container.innerHTML = "";

  products.forEach((p) => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>

        <div class="card-buttons">
          <button onclick="viewProduct(${p.id})">View</button>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });
}

// =======================
// VIEW PRODUCT
// =======================
function viewProduct(id) {
  let p = products.find((x) => x.id === id);
  localStorage.setItem("product", JSON.stringify(p));
  location.href = "product.html";
}

// =======================
// PRODUCT DETAIL PAGE
// =======================
const detail = document.getElementById("productDetail");

if (detail) {
  let p = JSON.parse(localStorage.getItem("product"));

  detail.innerHTML = `
    <div class="product-img">
     <img src="${p.img}" class="product-img">
      <h2>${p.name}</h2>
      <p>${p.desc || "No description available"}</p>
      <h3>$${p.price}</h3>
      
      <button class="add-cart-btn" onclick="addToCart(${p.id})">
  Add to Cart
</button>

    </div>
  `;
}

// =======================
// CART SYSTEM
// =======================
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = products.find((p) => p.id === id);

  if (!item) return;

  let exist = cart.find((c) => c.id === id);

  if (exist) {
    exist.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("Added to cart ", "success");
}

// =======================
// CART PAGE
// =======================
const cartDiv = document.getElementById("cartItems");

if (cartDiv) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartDiv.innerHTML = "";

  cart.forEach((item, i) => {
    total += item.price * item.qty;

    cartDiv.innerHTML += `
  <div class="cart-item">
    <img src="${item.img}" width="60">
    <h4>${item.name}</h4>
    <p>$${item.price}</p>

    <div class="qty">
      <button class="qty-btn" onclick="changeQty(${i},-1)">-</button>
      <span>${item.qty}</span>
      <button class="qty-btn" onclick="changeQty(${i},1)">+</button>
    </div>

    <button class="remove-btn" onclick="removeItem(${i})">
      Remove
    </button>
    
  </div>
`;
  });

  let totalEl = document.getElementById("total");
  if (totalEl) {
    totalEl.innerText = "Total: $" + total;
  }
}

// =======================
// CART FUNCTIONS
// =======================
function changeQty(i, val) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  cart[i].qty += val;

  if (cart[i].qty <= 0) {
    cart.splice(i, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function removeItem(i) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// =======================
// CHECKOUT
// =======================
const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
  checkoutForm.onsubmit = (e) => {
  e.preventDefault();

  showToast("Order placed successfully ", "success");

  localStorage.removeItem("cart");

  setTimeout(() => {
    location.href = "home.html";
  }, 1500); // wait for toast to show
};
}

// =======================
// NAVIGATION
// =======================
function goCart() {
  location.href = "cart.html";
}

function goCheckout() {
  location.href = "checkout.html";
}

function logout() {
  localStorage.removeItem("currentUser");
  location.href = "login.html";
}

function goBack() {
  window.location.href = "home.html";
}
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  toast.innerText = message;
  toast.className = "toast show " + type;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
