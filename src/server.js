const path = require('path');
const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');

// Utils
const getWeather = require('./utils/forcast');
const getGetcode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;
// Define paths
const staticPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static pages
app.use(express.static(staticPath));

app.get('/', (req, res) => {
  res.render('index', { title: 'Weather', body: 'Site' });
});

app.get('/help', (req, res) => {
  res.render('help', { help: 'HELP' });
});

app.get('/weather', (req, res) => {
  if (Object.keys(req.query).length == 0) {
    return res.send('No query info is provided');
  }

  if (req.query.address) {
    const { address } = req.query;

    const callback = (location) => {
      if (!location.lat || !location.lng) {
        return res.status(400).json({
          success: false,
          message: 'Address in invalid'
        });
      }

      getWeather(location.lat, location.lng, (weatherInfo) => {
        if (Object.keys(weatherInfo).length === 0) {
          return res.status(400).json({
            success: false,
            message: 'Unknown Error Occured'
          });
        }

        return res.status(200).json({
          success: true,
          forecast: weatherInfo,
          location: location,
          address: req.query.address
        });
      });
    };

    getGetcode(address, callback);
  }
});

app.get('*', (req, res) => {
  res.send('404');
});

app.listen(port, () => {
  console.log(chalk.green.inverse('Node server running on ' + port));
});
