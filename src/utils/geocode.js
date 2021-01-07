const axios = require('axios');

function getGetcode(address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGF2aWRicmVudCIsImEiOiJja2ppODhpODMxYzBjMnFtc2MycG5zeDV5In0.k6KPIAgHa37YjEHO99bq1w&limit=1`;

  axios
    .get(url)
    .then((response) => {
      const data = response.data;

      const location = {
        lat: data.features[0].center[1],
        lng: data.features[0].center[0]
      };

      callback(location);
    })
    .catch((err) => {
      callback({});
    });
}

module.exports = getGetcode;
