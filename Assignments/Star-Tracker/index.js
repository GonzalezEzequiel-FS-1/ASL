// Load in our Express framework
const express = require(`express`)

//Loading Models:
const galaxyCtrl =require('./controllers/galaxy.js')

// Create a new Express instance called "app"
const app = express()

// ***Loading Twig***
app.set('views', __dirname + '/src/views')

// **Set Twig as our rendering agent***
app.set('view engine', 'twig' )

// ***Load the JSON body parser***
app.use(express.json());
// Load in our RESTful routers
const routers = require('./routers/index.js')

// Home page welcome middleware
app.get('/', (req, res) => {
  const id = req.params.id;
  const galaxy = Galaxy.fidByPk(4);
  res
   // .status(200)
  //  .send('Welcome to Star Tracker Library')
    .render('home',{ Galaxy  }
    )
})

// Register our RESTful routers with our "app"
app.use(`/planets`,  routers.planet)
app.use(`/stars`,    routers.star)
app.use(`/galaxies`, routers.galaxy)

// Set our app to listen on port 3000
app.listen(3000)
