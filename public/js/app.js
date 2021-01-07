document.addEventListener('DOMContentLoaded', init);

function init() {
  const input = document.getElementById('address');
  const button = document.getElementById('address_button');
  const form = document.getElementById('address_form');
  const infoInsert = document.getElementById('weather_info');
  const img = document.getElementById('img');
  const p = document.querySelector('.weather');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      const url = `http://localhost:3000/weather?address=${input.value}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          p.textContent = data.address + ' is currently ' + data.forecast.weather_descriptions[0];
          img.setAttribute('src', data.forecast.weather_icons[0]);
          img.style.width = '100px';
          img.style.height = '100px';
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}
