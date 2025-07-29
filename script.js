const hotelsContainer = document.getElementById("hotels-container");
const hotelNameSpan = document.getElementById("hotel-name");
const modal = document.getElementById("review-modal");
const submitButton = document.getElementById("submit-review");
const balanceSpan = document.getElementById("balance");
let selectedHotel = "";
let balance = parseInt(localStorage.getItem("balance")) || 0;
balanceSpan.textContent = balance;

// Nepali cities and hotel types
const cities = ["Kathmandu", "Pokhara", "Chitwan", "Lalitpur", "Biratnagar", "Butwal", "Nepalgunj", "Dharan", "Bhaktapur", "Hetauda", "Janakpur"];
const types = ["Hotel", "Resort", "Inn", "Lodge", "Retreat", "Suites", "Villa", "Guest House"];

// Generate 1000 hotels dynamically
const hotels = [];
for (let i = 1; i <= 1000; i++) {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  hotels.push({
    name: `${type} ${city} #${i}`,
    image: `https://source.unsplash.com/400x300/?hotel,room,nepal,${i}`
  });
}

// Render hotel cards
hotels.forEach(hotel => {
  const card = document.createElement("div");
  card.className = "hotel-card";
  card.innerHTML = `
    <img src="${hotel.image}" alt="${hotel.name}" />
    <h3>${hotel.name}</h3>
    <button onclick="openModal('${hotel.name}')">Review & Earn</button>
  `;
  hotelsContainer.appendChild(card);
});

// Modal controls
function openModal(hotelName) {
  selectedHotel = hotelName;
  hotelNameSpan.textContent = hotelName;
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

// Submit review
submitButton.onclick = function () {
  const name = document.getElementById("reviewer-name").value.trim();
  const stars = document.getElementById("review-stars").value;
  const review = document.getElementById("review-text").value.trim();

  if (name && review) {
    balance += 65;
    localStorage.setItem("balance", balance);
    balanceSpan.textContent = balance;
    alert(`Thank you, ${name}! You earned Rs.65 for reviewing ${selectedHotel}.`);
    closeModal();
    document.getElementById("reviewer-name").value = "";
    document.getElementById("review-text").value = "";
  } else {
    alert("Please fill in your name and review text.");
  }
};

// Logout
function logout() {
  window.location.href = "login.html";  // redirect to login page (change as needed)
}

