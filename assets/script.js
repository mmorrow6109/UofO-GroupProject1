const apiKey = '5iaotR2Z5ma2uclxvjEcoBf7CcXEmYfGeqeRZzvx-R2uN5EwxK2eLan3ajB06HHXstfqErs_LnseKrVNKwjTDazE6Sd_KTwR3d569SbpW5sEnnprcPaQR3V1kmp6ZXYx';
const searchInput = document.getElementById('search-in');
const searchBtn = document.getElementById('search-btn');
const reservationForm = document.getElementById('form');
const dateInput = document.getElementById('date');
const submitBtn = document.getElementById('submit-btn');
const translateApiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
const translateApiKey = '3f877754a2mshf4074c4dd98fe98p1bbe81jsn7911bc7ba389';

//function to fetch data from yelp api
searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const query = searchInput.value;

    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(query);
    localStorage.setItem('searches', JSON.stringify(searches));

    let apiUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=portland&price=1,2,3,4&term=${query}&limit=20`;

    const options = {
        headers: {
            "accept": "application/json",
            "x-requested-with": "xmlhttprequest",
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${apiKey}`,
        },
        method: 'GET',
    };
    const resultDiv = document.getElementById('result');

    fetch(apiUrl, options)
        .then(response => {
            resultDiv.classList.remove('hidden');

            return response.json();
        })

        .then(data => {
            const resultEls = [
                document.getElementById('result1'),
                document.getElementById('result2'),
                document.getElementById('result3'),
                document.getElementById('result4'),
                document.getElementById('result5'),
                document.getElementById('result6'),
                document.getElementById('result7'),
                document.getElementById('result8'),
                document.getElementById('result9'),
                document.getElementById('result10'),
                document.getElementById('result11'),
                document.getElementById('result12'),
                document.getElementById('result13'),
                document.getElementById('result14'),
                document.getElementById('result15'),
                document.getElementById('result16'),
                document.getElementById('result17'),
                document.getElementById('result18'),
                document.getElementById('result19'),
                document.getElementById('result20'),
            ];

            for (let i = 0; i < data.businesses.length; i++) {
                const business = data.businesses[i];
                const resultEl = resultEls[i];

                if (resultEl) {
                    const img = resultEl.querySelector('img');
                    if (img) {
                        img.src = business.image_url;
                    }

                    const p = resultEl.querySelector('p');
                    if (p) {
                        p.textContent = business.name;
                    }

                    createButtons(resultEl, business);
                }
            }
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

//function to creat buttons out of the data fetched from yelp api
function createButtons(element, business) {
    element.onclick = function () {
        // Show the modal
        const modal = document.getElementById('modal');
        modal.style.display = 'block';

        // Update the modal content with the business data
        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML = '';

        const bizList = document.createElement('ul');

        const nameItem = document.createElement('li');
        nameItem.textContent = `Name: ${business.name}`;
        bizList.appendChild(nameItem);

        const addressItem = document.createElement('li');
        addressItem.textContent = `Address: ${business.location.display_address}`;
        bizList.appendChild(addressItem);

        const categoryItem = document.createElement('li');
        categoryItem.textContent = `Category: ${business.categories[0].title}`;
        bizList.appendChild(categoryItem);

        const priceItem = document.createElement('li');
        priceItem.textContent = `Price: ${business.price}`;
        bizList.appendChild(priceItem);

        const ratingItem = document.createElement('li');
        ratingItem.textContent = `Rating: ${business.rating}`;
        bizList.appendChild(ratingItem);

        const phoneItem = document.createElement('li');
        phoneItem.textContent = `Phone: ${business.phone}`;
        bizList.appendChild(phoneItem);

        const reviewCountItem = document.createElement('li');
        reviewCountItem.textContent = `Reviews: ${business.review_count}`;
        bizList.appendChild(reviewCountItem);

        modalContent.appendChild(bizList);
    };
}

// function to submit information on the form
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

// this is the date picker
dateInput.addEventListener('change', (event) => {
// You can access the selected date with event.target.value
console.log('Selected date:', event.target.value);
});

// allows user to close the modal
const closeButton = document.getElementById('close');
closeButton.onclick = function() {
modal.style.display = 'none';
};

function translateText(text, targetLang) {
  const url = `${translateApiUrl}&q=${encodeURIComponent(text)}&target=${targetLang}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract the translated text
      const translatedText = data.translations[0].translatedText;

      // Use the translated text wherever needed
      // (e.g., update UI elements, send translated data)
      console.log(`Translated "${text}" to "${targetLang}": ${translatedText}`);
    })
    .catch(error => {
      console.error('Error translating text:', error);
    });
}