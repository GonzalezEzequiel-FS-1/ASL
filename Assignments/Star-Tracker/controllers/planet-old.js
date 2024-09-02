const { Planets } = require('../src/models');
const item = "Planet";

// Get all Planets
const index = async (req, res) => {
  try {
    const planets = await Planets.findAll();
    if (planets.length === 0) {
      return res.status(404).send({
        success: false,
        message: `No ${item}s found in the database`
      });
    }
    return res.status(200).json({
      success: true,
      message: `Successfully retrieved ${item}s from the database`,
      data: planets
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `${req.method} failed, consult error >>> ${error.message}`
    });
  }
};

// Get by ID
const show = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({
      success: false,
      message: `No ID provided`
    });
  }
  if (isNaN(parseInt(id, 10))) {
    return res.status(400).send({
      success: false,
      message: `ID expected to be a numerical value, received >>> ${id}`
    });
  }
  try {
    const planet = await Planets.findByPk(id);
    if (!planet) {
      return res.status(404).send({
        success: false,
        message: `${item} with ID ${id} not found`
      });
    }
    return res.status(200).json({
      success: true,
      message: `Successfully retrieved ${item} with ID:${id} from the database`,
      data: planet
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `${req.method} failed, consult error >>> ${error.message} for Find By ID`
    });
  }
};

// Create a new resource
const create = async (req, res) => {
  const { name, size, description } = req.body;
  if (!name || !size || !description) {
    return res.status(400).send({
      success: false,
      message: `Please provide all required fields, received: name = ${name}, size = ${size}, description = ${description}`
    });
  }
  try {
    const newPlanet = await Planets.create({ name, size, description });
    return res.status(201).json({
      success: true,
      message: `${item} created`,
      data: newPlanet
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `${req.method} failed, consult error >>> ${error.message}`
    });
  }
};

// Update an existing resource
const update = async (req, res) => {
  const id = req.params.id;
  const { name, size, description } = req.body;
  if (!id) {
    return res.status(400).send({
      success: false,
      message: `${req.method} failed, ID not provided`
    });
  }
  try {
    const [updatedRows] = await Planets.update({ name, size, description }, {
      where: { id: id }
    });
    if (updatedRows === 0) {
      return res.status(404).send({
        success: false,
        message: `No ${item} with the ID of ${id} found in the database`
      });
    }
    return res.status(200).json({
      success: true,
      message: `Successfully updated ${item} with the ID of ${id}`,
      data: { id, name, size, description }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `${req.method} failed, unable to update ${item} with the ID of ${id}. Please consult error ${error.message}`
    });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({
      success: false,
      message: `Unable to delete ${item} from the database, ID not provided`
    });
  }
  try {
    const removedItem = await Planets.destroy({
      where: { id: id }
    });
    if (removedItem === 0) {
      return res.status(404).send({
        success: false,
        message: `${item} with the ID of ${id} not found`
      });
    }
    return res.status(200).send({
      success: true,
      message: `${item} with the ID of ${id} has been removed from the database`
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `${req.method} failed, consult error >>> ${error.message}`
    });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };

