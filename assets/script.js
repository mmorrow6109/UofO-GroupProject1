  const apiKey = '5iaotR2Z5ma2uclxvjEcoBf7CcXEmYfGeqeRZzvx-R2uN5EwxK2eLan3ajB06HHXstfqErs_LnseKrVNKwjTDazE6Sd_KTwR3d569SbpW5sEnnprcPaQR3V1kmp6ZXYx';
  const searchInput = document.getElementById('search-in');
  const searchBtn = document.getElementById('search-btn');
  const reservationForm = document.getElementById('form');
  const dateInput = document.getElementById('date');
  const submitBtn = document.getElementById('submit-btn');
  
  
  searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    
    const query = searchInput.value;
    
    // Yelp API endpoint
    let apiUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=portland&price=1,2,3,4&term=${query}&limit=4`;
    
    // Yelp API request options
    const options = {
      headers: {
        "accept": "application/json",
        "x-requested-with": "xmlhttprequest",
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${apiKey}`,
      },
      method: 'GET',
    };

    // Make the API request
    fetch(apiUrl, options)
    .then(response => response.json())
    .then(data => {
      // Display the data in the HTML
      console.log(data)
      displayData(data);
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    });
    
  });

  function displayData(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    data.businesses.forEach(business => {
      const businessButton = document.createElement('button');
      businessButton.textContent = business.name;
      businessButton.onclick = function() {
        // Show the modal
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
  
        // Update the modal content with the business data
        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML = '';
        for (let key in business) {
          const listItem = document.createElement('li');
          listItem.textContent = `${key}: ${business[key]}`;
          modalContent.appendChild(listItem);
        }
      };
      resultsDiv.appendChild(businessButton);
    });
  }

// Add an event listener to the submit button
submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  // Add your reservation logic here
  const restaurant = document.getElementById('restaurant').value;
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const guests = document.getElementById('guests').value;
  const section = document.getElementById('section').value;

  // Create a reservation object
  const reservation = {restaurant, name, phone, date, time, guests, section};

  localStorage.setItem('reservation', JSON.stringify(reservation));
  console.log('Reservation Details:', {restaurant, name, phone, date, time, guests, section});
 
  // Update the modal content
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = '';
  for (let key in reservation) {
    const listItem = document.createElement('li');
    listItem.textContent = `${key}: ${reservation[key]}`;
    modalContent.appendChild(listItem);
  }

  // Show the modal
  const modal = document.getElementById('modal');
  modal.style.display = 'block';

  // Add an event listener to the close button
  const closeButton = document.getElementById('close');
  closeButton.onclick = function() {
    modal.style.display = 'none';
  };

  // Close the modal when the user clicks outside of it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
});

// Add an event listener to handle date selection
dateInput.addEventListener('change', (event) => {
  // You can access the selected date with event.target.value
  console.log('Selected date:', event.target.value);
});

const closeButton = document.getElementById('close');
closeButton.onclick = function() {
  modal.style.display = 'none';
};
