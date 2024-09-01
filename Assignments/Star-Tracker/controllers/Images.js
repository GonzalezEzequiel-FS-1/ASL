const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const { Image } = require('../src/models'); // Adjust the path as needed

// Promisify the fs functions for ease of use
const unlinkAsync = promisify(fs.unlink);

// Handle GET / (list images)
exports.index = async (req, res) => {
  try {
    const images = await Image.findAll(); // Use findAll() for Sequelize
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handle GET /new (form to create a new image)
exports.form = (req, res) => {
  res.render('images/new'); // Adjust to your view/template engine
};

// Handle GET /:id (show a specific image)
exports.show = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id); // Use findByPk() for Sequelize
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handle GET /:id/edit (form to edit a specific image)
exports.editForm = async (req, res) => { // Changed to avoid naming conflict with `form`
  try {
    const image = await Image.findByPk(req.params.id); // Use findByPk() for Sequelize
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.render('images/edit', { image }); // Adjust to your view/template engine
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handle POST / (create a new image)
exports.create = async (req, res) => {
  try {
    // Assuming `uploadImage` middleware handles saving the file
    const { file } = req;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const image = await Image.create({
      path: file.path,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size
    });

    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handle POST /:id (update a specific image)
exports.update = async (req, res) => {
  try {
    const { file } = req;
    if (file) {
      // Handle file replacement if needed
      const image = await Image.findByPk(req.params.id); // Use findByPk() for Sequelize
      if (image) {
        // Remove old file
        await unlinkAsync(image.path);
        // Update with new file
        image.path = file.path;
        image.originalName = file.originalname;
        image.mimeType = file.mimetype;
        image.size = file.size;
        await image.save();
      }
    }
    res.status(200).json({ message: 'Image updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handle DELETE /:id (delete a specific image)
exports.remove = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id); // Use findByPk() for Sequelize
    if (!image) return res.status(404).json({ error: 'Image not found' });

    // Remove the file from the filesystem
    await unlinkAsync(image.path);
    // Remove the image record from the database
    await image.destroy(); // Use destroy() for Sequelize
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
