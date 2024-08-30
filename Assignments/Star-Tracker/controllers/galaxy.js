const { Galaxies } = require("../src/models");
//const { Galaxy } = require("../src/models/index.js");
const index = async (req, res) => {
  const galaxies = await Galaxies.findAll();
  try {
    res.render("galaxies/index.twig", { galaxies });
  } catch (error) {
    res.status(500).send({
      succeed: false,
      message: `${req.method} failed, consult error >>> ${error}`,
    });
  }
};

const show = async (req, res) => {
  res.render("galaxies/index.twig");
};

const create = async (req, res) => {
  res.render("views/galaxies/index.twig");
};

const update = async (req, res) => {
  res.status(200).json(`Galaxy#Form(:id)`);
};

const remove = async (req, res) => {
  res.status(200).json(`Galaxy#Remove`);
};

const form = async (req, res) => {
  res.status(200).json(`Galaxy#Form(:id)`);
};
module.exports = {
  index,
  show,
  create,
  update,
  remove,
  form,
};
