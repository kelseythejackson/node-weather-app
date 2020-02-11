const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Kelsey Jackson'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Kelsey Jackson'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Help Message',
    name: 'Kelsey Jackson'
  })
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an addresss'
    })
  }
  geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
    if (err) {
      return res.send({err})
    }

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({err})
      }

      res.json({
        forecast: forecastData,
        location,
        address: req.query.address
      }) 
    })
  })
  
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'you must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Article not Found',
    notFoundMsg: 'Help article not found',
    name: 'Kelsey Jackson'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not Found',
    notFoundMsg: 'Page not found',
    name: 'Kelsey Jackson'
  })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});