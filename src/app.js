const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const getWeather = require('./utils/weather');

// console.log(__dirname);  //path of the directory where the file lives
// console.log(path.basename(__dirname)); //complete path to the file
// console.log(path.join(__dirname, '..', 'public')); //complete path to the file

const app = express();
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPaths = path.join(__dirname, '..', '/templates/partials');

//Establecer el motor de plantillas que usara express
app.set('view engine', 'hbs');
//Por default express busca la carpeta llamada "views" para traer las vistas, si queremos utilizar un nombre diferente tenemos que especificarle a express en donde tiene que ir a buscar las vistas, ejemplo:
app.set('views', viewsPath);

//Configurar la ruta de los partials (porciones de plantillas) en donde handlebars debe de buscar
hbs.registerPartials(partialPaths);
//Establecer directorio estatico a servir
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Javier Aguirre'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Javier Aguirre'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This a help message just for you :)',
    title: 'Help',
    name: 'Javier'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
     error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, data) => {
    if(error){
      return res.send({error: error});
    }
    // console.log(data);
    getWeather(data, (error, result) => {
      if(error){
        return res.send({error});
      }
      return res.send({
        forecast: `It is ${result.current.weather_descriptions[0]}`,
        location: result.location.name,
        address: req.query.address
      })
    })
  })
});

app.get('/products', (req, res) => {
  if(!req.query.search){
    return res.send({error: 'You must provide asearch term.'});
  }
    console.log(req.query)
    res.send({
      products: []
    })
})

app.get('/help/*', (req,res) => {
  res.render('error', {
    title: "NOT FOUND",
    errorMessage: 'Help article not found',
    name: 'Javier A.'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: "NOT FOUND",
    errorMessage: '404 PAGE',
    name: 'Javier Ag.'
  })
})
// Route Handlers
// app.get('', (req, res) => {
//   res.send('<h1>Hello Express!</h1>');
// });

// app.get('/help', (req, res) => {
//   res.send('<h1>Help Page</h1>');
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>About Page</h1>');
// });


app.listen(3000, () => {
  console.log('Server running!');
});