const apiKey = 'vUx9WMXHYowUawuOk11GcMMkkdnhJAW22GwpL796e2zRyaCcxcMhcfJ1o2s3BdMsVqigXAAX2sfeL6J8ny1Xe6N1k_-72OrT4l0CI6Xmh4dB-U4h6HRyjjZumN93ZXYx';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  mode: 'no-cors' // add 'no-cors' mode here
};

fetch('https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));