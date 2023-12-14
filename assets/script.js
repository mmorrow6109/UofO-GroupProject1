document.addEventListener('DOMContentLoaded', function () {
  const apiKey = '5iaotR2Z5ma2uclxvjEcoBf7CcXEmYfGeqeRZzvx-R2uN5EwxK2eLan3ajB06HHXstfqErs_LnseKrVNKwjTDazE6Sd_KTwR3d569SbpW5sEnnprcPaQR3V1kmp6ZXYx';
  const searchInput = document.getElementById('restaurant_search');
  const restaurantList = document.querySelector('.restaurant-list ul');
  const reservationForm = document.querySelector('.reservation-form form');
  const dateInput = document.getElementById('reservation-date');

  // Function to fetch restaurant data from Yelp API
  async function searchRestaurants(query) {
    try {
      const response = await fetch(`https://api.yelp.com/v3/businesses/search?term=${query}&location=city&limit=5`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const data = await response.json();
      return data.businesses;
    } catch (error) {
      console.error('Error fetching data from Yelp API', error);
      return [];
    }
  }
  // Function to display restaurants in the UI
  function displayRestaurants(restaurants) {
    restaurantList.innerHTML = ''; // Clear previous results
    if (restaurants.length === 0) {
      restaurantList.innerHTML = '<p>No restaurants found</p>';
      return;
    }
    restaurants.forEach((restaurant) => {
      const li = document.createElement('li');
      li.textContent = restaurant.name;
      restaurantList.appendChild(li);
    });
  }
  // Function to handle form submission
  reservationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Add your reservation logic here
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const partySize = document.getElementById('party-size').value;
    const seatingPreference = document.getElementById('seating-preference').value;
    // Add logic to make a reservation using the selected options
    console.log('Reservation Details:', { date, time, partySize, seatingPreference });
  });
  // Event listener for search input
  searchInput.addEventListener('input', async function () {
    const query = searchInput.value.trim();
    if (query.length > 2) {
      const restaurants = await searchRestaurants(query);
      displayRestaurants(restaurants);
    } else {
      restaurantList.innerHTML = ''; // Clear the list if the query is too short
    }
  });
});

// Add an event listener to handle date selection
dateInput.addEventListener('change', (event) => {
  // You can access the selected date with event.target.value
  console.log('Selected date:', event.target.value);
});