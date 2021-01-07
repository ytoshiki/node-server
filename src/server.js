const path = require('path');
const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');

const app = express();

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
  res.render('index', { title: 'Dynamic', body: 'Site' });
});

app.get('/help', (req, res) => {
  res.render('help', { help: 'HELP' });
});

app.get('*', (req, res) => {
  res.send('404');
});

app.listen(3000, () => {
  console.log(chalk.green.inverse('Node server running on Port 3000'));
});
