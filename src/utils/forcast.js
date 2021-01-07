const axios = require('axios');

const rootUrl = 'http://api.weatherstack.com/';
const apiKey = '04ad5a2f19025d9b2f7189fb75431385';

const getWeather = (lat, lng, callback) => {
  let url = rootUrl + '/current?access_key=' + apiKey + '&query=' + lat + ',' + lng + '&units=f';
  axios
    .get(url)
    .then((response) => {
      callback(response.data.current);
    })
    .catch((err) => {
      callback({});
    });
};

module.exports = getWeather;
