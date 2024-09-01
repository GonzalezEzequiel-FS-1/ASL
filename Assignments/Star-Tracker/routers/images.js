// Load in Express framework
const express = require('express');

// Load in our image controller
const imageCtrl = require('../controllers/Images');

// Load in our middleware
const { uploadImage } = require('../middlewares');

// Create a new Router instance and call it "router"
const router = new express.Router();

// Image Routes
router.get('/', imageCtrl.index);
router.get('/new', imageCtrl.form);
router.get('/:id', imageCtrl.show);
router.get('/:id/edit', imageCtrl.form);

// Use uploadImage middleware for file uploads
router.post('/', uploadImage, imageCtrl.create);
router.post('/:id', uploadImage, imageCtrl.update);
router.delete('/:id', imageCtrl.remove);
router.get('/:id/delete', imageCtrl.remove);

// Export "router"
module.exports = router;
