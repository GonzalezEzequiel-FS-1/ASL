const { response } = require("express");
const { Galaxies } = require("../src/models");
const item = "Galaxy";
//const { Galaxy } = require("../src/models/index.js");
const index = async (req, res) => {
  try {
    const galaxies = await Galaxies.findAll();
    if (galaxies.length === 0) {
      return res.status(404).send({
        success: false,
        message: `No ${item}s found on Database`
      });
    }
    res.render("galaxies/index.twig", { galaxies });
  } catch (error) {
    res.status(500).send({
      succeed: false,
      message: `${req.method} failed, consult error >>> ${error}`,
    });
  }
};

const show = async (req, res) => {
//  res.render("galaxies/index.twig");
const id = req.params.id;
if (!id) {
  return res.status(400).send({
    success: false,
    message: `No ID provided`,
  });
}
if (isNaN(parseInt(id, 10))) {
  return res.status(400).send({
    success: false,
    message: `ID expected to be a numerical value, received >>> ${id}`,
  });
}
try {
  const galaxy = await Galaxies.findByPk(id);
  if (!galaxy) {
    return res.status(404).send({
      success: false,
      message: `Galaxy with ID ${id} not found`,
    });
  }
  return res.render("galaxies/show.twig", { galaxy })
  /*return res.status(200).json({
    success: true,
    message: `Successfully retrieved ${item} with ID:${id} from the database`,
    data: galaxy,
  });*/
} catch (error) {
  return res.status(500).send({
    success: false,
    message: `${req.method} failed, consult error >>> ${error.message} for Find By ID`,
  });
}

};

const create = async (req, res) => {
  const { name, size, description } = req.body;
  if (!name || !size || !description) {
    return res.status(400).send({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const galaxy = await Galaxies.create({ name, size, description });
    res.redirect(302, `/galaxies/${galaxy.id}`);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Failed to create galaxy. Error: ${error}`,
    });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { name, size, description } = req.body;

  // Check if ID is provided
  if (!id) {
    return res.status(400).send({
      success: false,
      message: `${req.method} failed, ID not provided`,
    });
  }

  try {
    // Update the galaxy entry
    const [updatedRows] = await Galaxies.update(
      { name, size, description },
      { where: { id: id } }
    );

    // Check if any rows were updated
    if (updatedRows === 0) {
      return res.status(404).send({
        success: false,
        message: `No galaxy with the ID of ${id} found in the database`,
      });
    }

    // Redirect to the updated galaxy's page
    return res.redirect(302, `/galaxies/${id}`);
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `${req.method} failed, unable to update galaxy with the ID of ${id}. Please consult error ${error.message}`,
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({
      success: false,
      message: `Unable to delete ${item} from the database, ID not provided`,
    });
  }
  try {
    const removedItem = await Galaxies.destroy({
      where: { id: id },
    });
    if (removedItem === 0) {
      return res.status(404).send({
        success: false,
        message: `${item} with the ID of ${id} not found`,
      });
    }
    return res.redirect(302, `/galaxies`);
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `${req.method} failed, consult error >>> ${error.message}`,
    });
  }


  //  res.status(200).json(`Galaxy#Remove`);
};

const form = async (req, res) => {
  if (typeof req.params.id !== 'undefined') {
    const galaxy = await Galaxies.findByPk(req.params.id);
    res.render('galaxies/_form.twig', { galaxy });
  } else {
    res.render('galaxies/_form.twig');
  }
};
module.exports = {
  index,
  show,
  create,
  update,
  remove,
  form,
};
