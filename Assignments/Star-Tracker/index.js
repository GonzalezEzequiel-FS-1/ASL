// Load in our Express framework
const express = require(`express`);

//load DotEnv
const dotenv = require("dotenv");
dotenv.config();

//Set Port wit DotEnv
const PORT = process.env.PORT || 3000;

//Loading Models:
const { Galaxies } = require("./src/models/");

// Create a new Express instance called "app"
const app = express();

// ***Loading Twig***
app.set("view engine", "twig");
app.set("views", __dirname + "/templates/views/");

// ***Load the JSON body parser***
app.use(express.json());
// Load in our RESTful routers
const routers = require("./routers/index.js");

// Home page welcome middleware
app.get("/", async (req, res) => {
  const galaxy = await Galaxies.findByPk(1);
  try {
    res.render("home/home.twig", { galaxy });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `${req.method}failed, consult error >>>${error}`,
    });
  }
});

// Register our RESTful routers with our "app"
app.use(`/planets`, routers.planet);
app.use(`/stars`, routers.star);
app.use(`/galaxies`, routers.galaxy);

// Set our app to listen on port 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
