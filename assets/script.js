// DOM elements
const restaurantInput = document.getElementById('Restaurant');
const nameInput = document.getElementById('Name');
const phoneInput = document.getElementById('phone');
const sectionSelect = document.getElementById('section');
const guestSelect = document.getElementById('guest');
const reservationButton = document.querySelector('.nav button');

// Reservation object
let reservation = {
  restaurant: "",
  name: "",
  phone: "",
  section: "",
  guests: 0
};

// Event listeners
restaurantInput.addEventListener('input', (event) => {
  reservation.restaurant = event.target.value;
});

nameInput.addEventListener('input', (event) => {
  reservation.name = event.target.value;
});

phoneInput.addEventListener('input', (event) => {
  reservation.phone = event.target.value;
});

sectionSelect.addEventListener('change', (event) => {
  reservation.section = event.target.value;
});

guestSelect.addEventListener('change', (event) => {
  reservation.guests = parseInt(event.target.value);
});

reservationButton.addEventListener('click', () => {
  // Validate reservation
  if (!reservation.restaurant || !reservation.name || !reservation.phone) {
    alert('Please fill in all required fields.');
    return;
  }

  // Submit reservation
  console.log('Submitting reservation:', reservation);
  // TODO: Replace console.log with actual submission logic
  // (e.g., API call, database update, etc.)
});