const products = [
  { id: 3, name: "Triphala Churna", category: "Supplements", price: 280, description: "Traditional herbal powder for digestive health", benefits: ["Digestive support", "Detoxification", "Immunity boost"], image: "assets/triphla.jpg" },
  { id: 7, name: "Shatavari Powder", category: "Supplements", price: 420, description: "Women's health tonic for hormonal balance", benefits: ["Hormonal balance", "Reproductive health", "Immunity support"], image: "assets/shatavari.jpg" },

  // Additional Oils
  { id: 1, name: "Brahmi Oil", category: "Herbal Oils", price: 450, description: "Pure Brahmi oil for mental clarity and hair health", benefits: ["Improves memory", "Reduces stress", "Nourishes hair"], image: "assets/bhrami oil.jpg" },
  { id: 6, name: "Neem Oil", category: "Herbal Oils", price: 380, description: "Pure neem oil for skin conditions and healing", benefits: ["Antibacterial", "Skin healing", "Natural antiseptic"], image: "assets/neem.jpg" },
  { id: 2, name: "Sesame Oil (Til Oil)", category: "Herbal Oils", price: 320, description: "Cold-pressed sesame oil for Abhyanga massage", benefits: ["Deep tissue nourishment", "Improves circulation", "Anti-aging properties"], image: "assets/sesame.jpg" },
  { id: 9, name: "Dhanwantharam Thailam", category: "Herbal Oils", price: 480, description: "Herbal oil used in Vata disorders and postnatal care", benefits: ["Relieves muscle pain", "Strengthens nerves", "Reduces inflammation"], image: "assets/dhanwantharam.jpg" },
  { id: 10, name: "Kottamchukkadi Oil", category: "Herbal Oils", price: 400, description: "Oil used in arthritis and neuromuscular pain treatments", benefits: ["Reduces stiffness", "Improves flexibility", "Relieves pain"], image: "assets/kottamchukkadi.jpg" },
  { id: 11, name: "Nirgundi Oil", category: "Herbal Oils", price: 360, description: "Anti-inflammatory oil used for joint pain and swelling", benefits: ["Pain relief", "Anti-swelling", "Muscle relaxation"], image: "assets/nirgundi.jpg" },
  { id: 12, name: "Bala Thailam", category: "Herbal Oils", price: 390, description: "Tonic oil used in nervous system disorders", benefits: ["Strengthens nerves", "Reduces tremors", "Supports Vata balance"], image: "assets/bala.jpg" },
  { id: 13, name: "Kumkumadi Tailam", category: "Herbal Oils", price: 650, description: "Luxury facial oil for skin brightening and radiance", benefits: ["Brightens skin", "Reduces dark spots", "Anti-aging"], image: "assets/kumkumadi.jpg" },

  // Ayurvedic Tablets  
  { id: 4, name: "Ashwagandha Capsules", category: "Medicines", price: 650, description: "Premium Ashwagandha extract for stress relief", benefits: ["Stress reduction", "Energy boost", "Better sleep"], image: "assets/ashwagandha.jpg" },
  { id: 14, name: "Triphala Guggul", category: "Medicines", price: 320, description: "Herbal tablet used for detox and weight management", benefits: ["Improves digestion", "Aids weight loss", "Removes toxins"], image: "assets/triphla guggal.jpg" },
  { id: 15, name: "Yograj Guggul", category: "Medicines", price: 290, description: "Ayurvedic tablet for joint and muscle health", benefits: ["Relieves arthritis", "Reduces inflammation", "Supports joint function"], image: "assets/yograj.jpg" },
  { id: 16, name: "Giloy Tablets", category: "Medicines", price: 200, description: "Immunity boosting herb in tablet form", benefits: ["Boosts immunity", "Fights infection", "Reduces fever"], image: "assets/giloy.jpg" },
  { id: 17, name: "Chitrakadi Vati", category: "Medicines", price: 280, description: "Digestive herbal tablet for gas and indigestion", benefits: ["Improves metabolism", "Relieves bloating", "Stimulates appetite"], image: "assets/chitrakadi.jpg" },
  { id: 18, name: "Haritaki Tablets", category: "Medicines", price: 250, description: "Mild laxative and detoxifier", benefits: ["Relieves constipation", "Supports gut health", "Detoxifies colon"], image: "assets/haritki.jpg" },

  // Tools
  { id: 5, name: "Copper Water Bottle", category: "Bottles & Containers", price: 890, description: "Pure copper bottle for storing Ayurvedic water", benefits: ["Antimicrobial properties", "Improves digestion", "Boosts immunity"], image: "assets/Copper Water Bottle.jpg" },
  { id: 8, name: "Glass Storage Jars Set", category: "Bottles & Containers", price: 560, description: "Set of 3 glass jars for storing herbs and medicines", benefits: ["Airtight storage", "Chemical-free", "Easy to clean"], image: "assets/Glass Storage Jars Set.jpg" },
  { id: 19, name: "Basti Enema Kit", category: "Bottles & Containers", price: 1500, description: "Complete kit for Ayurvedic Basti therapy", benefits: ["Colon detox", "Balances Vata", "Improves elimination"], image: "assets/enema kit.jpg" },
  { id: 20, name: "Shirodhara Pot Set", category: "Bottles & Containers", price: 2500, description: "Stainless steel or copper pot set for Shirodhara treatment", benefits: ["Promotes calmness", "Relieves anxiety", "Improves focus"], image: "assets/shirodhara pot.jpg" }
];
const productList = document.getElementById("product-list");
const cartItemCount = document.getElementById("cart-item-count");
const cartTotal = document.getElementById("cart-total");
const cartItemsList = document.getElementById("cart-items-list");
const productSectionTitle = document.getElementById("product-section-title");
const productCountSpan = document.getElementById("product-count");
const checkoutBtn = document.getElementById("checkout-btn");
const productGridSection = document.getElementById("product-grid-section");
const checkoutSection = document.getElementById("checkout-section");
const checkoutForm = document.getElementById("checkout-form");
const checkoutSummary = document.getElementById("checkout-summary");
const cancelCheckoutBtn = document.getElementById("cancel-checkout-btn");

const customModal = document.getElementById("custom-modal");
const modalMessage = document.getElementById("modal-message");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalOkBtn = document.getElementById("modal-ok-btn");

let cart = {};

function showAlert(message) {
  modalMessage.textContent = message;
  customModal.style.display = "block";
}

function closeModal() {
  customModal.style.display = "none";
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeModal);
}

if (modalOkBtn) {
  modalOkBtn.addEventListener("click", closeModal);
}

if (customModal) {
  window.addEventListener("click", (e) => {
    if (e.target === customModal) {
      closeModal();
    }
  });
}

function renderProducts(category) {
  if (!productList) return;

  productList.innerHTML = "";
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  productSectionTitle.textContent = category;
  productCountSpan.textContent = `${filteredProducts.length} products available`;

  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "bg-white rounded-lg shadow-md product-card p-4";

    const benefitsHtml = product.benefits
      .map(
        (benefit) =>
          `<li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i>${benefit}</li>`
      )
      .join("");

    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg mb-4">
            <h4 class="text-xl font-bold mb-2">${product.name}</h4>
            <p class="text-gray-600 mb-2 font-semibold">₹${product.price}</p>
            <p class="text-gray-500 text-sm mb-4">${product.description}</p>
            <div class="bg-gray-50 p-3 rounded-lg">
                <h5 class="text-sm font-bold text-gray-700 mb-2">Benefits:</h5>
                <ul class="text-xs text-gray-600 space-y-1">
                    ${benefitsHtml}
                </ul>
            </div>
            <div class="flex items-center justify-between mt-4">
                <div class="flex items-center space-x-2">
                    <button class="quantity-btn p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200" data-action="decrease" data-id="${product.id}">
                        <i class="fas fa-minus text-gray-600 text-xs"></i>
                    </button>
                    <span class="quantity-display font-bold text-lg" data-id="${product.id}">1</span>
                    <button class="quantity-btn p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200" data-action="increase" data-id="${product.id}">
                        <i class="fas fa-plus text-gray-600 text-xs"></i>
                    </button>
                </div>
                <button class="add-to-cart-btn bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition-colors duration-200" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
    productList.appendChild(productCard);
  });
}

function updateCart() {
  if (!cartItemsList) return;

  let totalItems = 0;
  let totalPrice = 0;

  cartItemsList.innerHTML = "";

  const cartKeys = Object.keys(cart);
  if (cartKeys.length === 0) {
    cartItemsList.innerHTML =
      '<p class="text-gray-500 text-sm">Your cart is empty.</p>';
  }

  cartKeys.forEach((productId) => {
    const product = products.find((p) => p.id === parseInt(productId));
    const quantity = cart[productId];
    totalItems += quantity;
    totalPrice += product.price * quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "flex items-center justify-between border-b pb-2";
    cartItem.innerHTML = `
            <div>
                <span class="font-bold">${product.name}</span>
                <span class="text-sm text-gray-500">x${quantity}</span>
            </div>
            <button class="delete-item-btn p-1 text-red-500 hover:text-red-700 transition-colors duration-200" data-id="${product.id}">
                <i class="fas fa-times-circle"></i>
            </button>
        `;
    cartItemsList.appendChild(cartItem);
  });

  cartItemCount.textContent = totalItems;
  cartTotal.textContent = `₹${totalPrice}`;
}

document.querySelectorAll(".category-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const category = e.target.dataset.category;

    document.querySelectorAll(".category-link").forEach((l) => {
      l.classList.remove("bg-green-100", "text-green-700", "font-medium");
      l.classList.add("hover:bg-gray-100");
    });

    e.target.classList.add("bg-green-100", "text-green-700", "font-medium");
    e.target.classList.remove("hover:bg-gray-100");

    renderProducts(category);
  });
});

if (productList) {
  productList.addEventListener("click", (e) => {
    if (e.target.closest(".quantity-btn")) {
      const button = e.target.closest(".quantity-btn");
      const action = button.dataset.action;
      const id = button.dataset.id;
      const quantityDisplay = document.querySelector(
        `.quantity-display[data-id="${id}"]`
      );

      let currentQuantity = parseInt(quantityDisplay.textContent);

      if (action === "increase") {
        currentQuantity++;
      } else if (action === "decrease" && currentQuantity > 1) {
        currentQuantity--;
      }

      quantityDisplay.textContent = currentQuantity;
    }

    if (e.target.closest(".add-to-cart-btn")) {
      const button = e.target.closest(".add-to-cart-btn");
      const id = button.dataset.id;
      const quantityDisplay = document.querySelector(
        `.quantity-display[data-id="${id}"]`
      );
      const quantity = parseInt(quantityDisplay.textContent);

      if (cart[id]) {
        cart[id] += quantity;
      } else {
        cart[id] = quantity;
      }

      button.classList.add("animate-add-to-cart");
      setTimeout(() => {
        button.classList.remove("animate-add-to-cart");
      }, 500);

      updateCart();
    }
  });
}

if (cartItemsList) {
  cartItemsList.addEventListener("click", (e) => {
    if (e.target.closest(".delete-item-btn")) {
      const button = e.target.closest(".delete-item-btn");
      const id = button.dataset.id;
      delete cart[id];
      updateCart();
    }
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (Object.keys(cart).length === 0) {
      showAlert("Your cart is empty. Please add items before checking out.");
      return;
    }
    productGridSection.classList.add("hidden");
    checkoutSection.classList.remove("hidden");
    let summaryHtml = '<h4 class="text-lg font-bold mb-2">Order Summary</h4>';
    let summaryTotal = 0;
    Object.keys(cart).forEach((productId) => {
      const product = products.find((p) => p.id === parseInt(productId));
      const quantity = cart[productId];
      const itemTotal = product.price * quantity;
      summaryTotal += itemTotal;
      summaryHtml += `<div class="flex justify-between items-center text-sm mb-1"><span class="text-gray-600">${product.name} x${quantity}</span><span>₹${itemTotal}</span></div>`;
    });
    summaryHtml += `<div class="flex justify-between items-center font-bold mt-4"><span class="text-xl">Total:</span><span class="text-green-600 text-xl">₹${summaryTotal}</span></div>`;
    checkoutSummary.innerHTML = summaryHtml;
  });
}

if (cancelCheckoutBtn) {
  cancelCheckoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkoutSection.classList.add("hidden");
    productGridSection.classList.remove("hidden");
  });
}

if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showAlert("Thank you for your order! Your purchase has been confirmed.");
    cart = {};
    updateCart();
    setTimeout(() => {
      checkoutSection.classList.add("hidden");
      productGridSection.classList.remove("hidden");
    }, 500);
    checkoutForm.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts("All");
});

function selectTreatment(card) {
  document
    .querySelectorAll(".card")
    .forEach((c) => c.classList.remove("selected"));
  card.classList.add("selected");
}

const timeSlotsContainer = document.querySelector(".time-slots");

if (timeSlotsContainer) {
  timeSlotsContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      timeSlotsContainer.querySelectorAll("button").forEach((button) => {
        button.classList.remove("active");
      });
      event.target.classList.add("active");
    }
  });
}

const appointmentForm = document.querySelector("form");

if (appointmentForm) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedTreatment = document.querySelector(".card.selected");
    if (!selectedTreatment) {
      showAlert("Please select a Panchakarma treatment.");
      return;
    }

    const dateInput = document.querySelector('input[type="date"]');
    if (!dateInput.value) {
      showAlert("Please select a preferred date.");
      return;
    }

    const selectedTimeSlot = document.querySelector(
      ".time-slots button.active"
    );
    if (!selectedTimeSlot) {
      showAlert("Please select a preferred time slot.");
      return;
    }

    const fullName = document.querySelector('input[type="text"]').value.trim();
    const phoneNumber = document
      .querySelector('input[type="tel"]')
      .value.trim();
    const gender = document.querySelector("select").value;

    if (!fullName || !phoneNumber || gender === "Select gender") {
      showAlert(
        "Please fill in all the required fields: Full Name, Phone Number, and Gender."
      );
      return;
    }

    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(phoneNumber)) {
      showAlert("Please enter a valid 10-digit phone number.");
      return;
    }

    showAlert(
      "Appointment booked successfully! We will contact you within 24 hours to confirm."
    );

    // Persist appointment for calendar view in profile.html
    try {
      const therapyTitleRaw = selectedTreatment
        .querySelector("h3")
        .textContent.replace(/\s*₹.*$/, "").trim();
      const normalizeTherapyName = (name) => {
        const s = (name || "").toLowerCase();
        if (s.includes("abhyanga")) return "Abhyanga";
        if (s.includes("shirodhara")) return "Shirodhara";
        if (s.includes("shirovasti")) return "Shirovasti";
        if (s.includes("panchakarma")) return "Panchakarma";
        if (s.includes("basti")) return "Basti";
        if (s.includes("navarakizhi")) return "Navarakizhi";
        if (s.includes("patra") && s.includes("pinda")) return "Patra Pinda Sweda";
        if (s.includes("udwartana")) return "Udwartana";
        if (s.includes("pizhichil")) return "Pizhichil";
        if (s.includes("netra") && s.includes("tarpana")) return "Netra Tarpana";
        if (s.includes("karna") && s.includes("purana")) return "Karna Purana";
        if (s.includes("gandusha") || s.includes("kavala")) return "Gandusha/Kavala";
        if (s.includes("lepam")) return "Lepam";
        if (s.includes("consult")) return "Initial Consultation";
        if (s.includes("women")) return "Women's Health Treatment";
        return name;
      };
      const therapyTitle = normalizeTherapyName(therapyTitleRaw);
      const appointmentRecord = {
        id: Date.now(),
        date: dateInput.value, // ISO yyyy-mm-dd
        time: selectedTimeSlot.textContent.trim(),
        therapy: therapyTitle,
        status: "scheduled",
      };
      const existing = JSON.parse(localStorage.getItem("appointments") || "[]");
      existing.push(appointmentRecord);
      localStorage.setItem("appointments", JSON.stringify(existing));
    } catch (e) {
      console.error("Failed saving appointment", e);
    }

    if (selectedTreatment) {
      selectedTreatment.classList.remove("selected");
    }

    if (selectedTimeSlot) {
      selectedTimeSlot.classList.remove("active");
    }

    // Explicitly reset the date input
    dateInput.value = "";

    appointmentForm.reset();
  });
}
// Toggle between Patient and Admin/Doctor
const signInForm = document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');
const forgotPasswordForm = document.getElementById('forgot-password-form');
const showSignUpBtn = document.getElementById('show-signup-btn');
const showSignInBtn = document.getElementById('show-signin-btn');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const backToSignInBtn = document.getElementById('back-to-signin');
const patientBtn = document.getElementById('patient-btn');
const adminBtn = document.getElementById('admin-btn');
const signinSubmitBtn = document.getElementById('signin-btn');
const formTitle = document.getElementById('form-title');
const formSubtitle = document.getElementById('form-subtitle');

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");










let isPatient = true;

// Initial button and form state
patientBtn.classList.add('bg-white', 'text-green-600', 'shadow-sm');
adminBtn.classList.add('text-gray-500');

const toggleForms = (formToShow) => {
  signInForm.classList.add('hidden');
  signUpForm.classList.add('hidden');
  forgotPasswordForm.classList.add('hidden');
  formToShow.classList.remove('hidden');

  if (formToShow === signInForm) {
    formTitle.textContent = 'Sign In';
    formSubtitle.textContent = 'Access your health records and appointments';
  } else if (formToShow === signUpForm) {
    formTitle.textContent = 'Create Account';
    formSubtitle.textContent = 'Join our Panchakarma wellness community';
  } else if (formToShow === forgotPasswordForm) {
    formTitle.textContent = 'Forgot Password?';
    formSubtitle.textContent = 'Enter your email to receive a password reset link.';
  }
};

const toggleUserType = (isPatientUser) => {
  isPatient = isPatientUser;
  if (isPatient) {
    patientBtn.classList.remove('text-gray-500');
    patientBtn.classList.add('bg-white', 'text-green-600', 'shadow-sm');
    adminBtn.classList.remove('bg-white', 'text-green-600', 'shadow-sm');
    adminBtn.classList.add('text-gray-500');
    signinSubmitBtn.textContent = 'Sign in as Patient';
    document.getElementById('patient-id').parentNode.style.display = 'block';
  } else {
    adminBtn.classList.remove('text-gray-500');
    adminBtn.classList.add('bg-white', 'text-green-600', 'shadow-sm');
    patientBtn.classList.remove('bg-white', 'text-green-600', 'shadow-sm');
    patientBtn.classList.add('text-gray-500');
    signinSubmitBtn.textContent = 'Sign in as Admin';
    document.getElementById('patient-id').parentNode.style.display = 'none';
  }
};

// Event Listeners
showSignUpBtn.addEventListener('click', () => toggleForms(signUpForm));
showSignInBtn.addEventListener('click', () => toggleForms(signInForm));
forgotPasswordLink.addEventListener('click', (event) => {
  event.preventDefault();
  toggleForms(forgotPasswordForm);
});
backToSignInBtn.addEventListener('click', () => toggleForms(signInForm));
patientBtn.addEventListener('click', () => toggleUserType(true));
adminBtn.addEventListener('click', () => toggleUserType(false));

signInForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;
  const patientId = document.getElementById('patient-id').value;

  // Simulate login
  if (isPatient && email === 'patient@demo.com' && password === 'password123') {
    // Check if patient ID matches if provided
    if (patientId && patientId !== '123') {
      showCustomAlert("Invalid Patient ID. Please try again.");
    } else {
      showCustomAlert('Patient login successful!');
    }
  } else if (!isPatient && email === 'admin@demo.com' && password === 'admin123') {
    showCustomAlert('Admin login successful!');
  } else {
    showCustomAlert('Invalid credentials. Please try again.');
  }
});

signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    showCustomAlert("Passwords do not match.");
    return;
  }

  showCustomAlert("Account created successfully!");
  // You would typically send this data to a server here.
  toggleForms(signInForm);
});

forgotPasswordForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('forgot-email').value;
  showCustomAlert(`A password reset link has been sent to ${email}.`);
});

function showCustomAlert(message) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center';
  modal.innerHTML = `
                    <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
                        <p class="text-lg font-medium text-gray-800">${message}</p>
                        <button class="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">OK</button>
                    </div>
                `;
  document.body.appendChild(modal);

  modal.querySelector('button').addEventListener('click', () => {
    modal.remove();
  });
}