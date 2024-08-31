// Load in our Express framework
const express = require(`express`);

// ***Load Path***
const path = require('path')

// Load DotEnv
const dotenv = require("dotenv");
dotenv.config();

// Set Port with DotEnv
const PORT = process.env.PORT || 3000;

// Loading Models:
const { Galaxies } = require("./src/models/");

// Create a new Express instance called "app"
const app = express();

// *** Loading Stylesheets ***
app.use(express.static(path.join(__dirname, 'public')));

// ***Loading Twig***
app.set("view engine", "twig");
app.set("views", __dirname + "/templates/views/");



// ***Load the URL-encoded body parser***
// This middleware is necessary to parse form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// ***Load the JSON body parser***
// This is useful if you're handling JSON data in requests
app.use(express.json());

// Load in our RESTful routers
const routers = require("./routers/index.js");

// Home page welcome middleware
app.get("/", async (req, res) => {
  // Example of loading a galaxy and rendering the home page
  /*
  const galaxy = await Galaxies.findByPk(1);
  try {
    res.render("home/home.twig", { galaxy });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `${req.method} failed, consult error >>> ${error}`,
    });
  }
  */
  res.render("home/home.twig");
});

// Register our RESTful routers with our "app"
app.use(`/planets`, routers.planet);
app.use(`/stars`, routers.star);
app.use(`/galaxies`, routers.galaxy);

// Set our app to listen on the specified port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});