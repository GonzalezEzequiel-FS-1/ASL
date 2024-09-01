// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

//Load Image controller
const imageCtrl = require('../controllers/Images')

// Loading in our new middleware
const { uploadImage } = require('../middlewares')

//IMAGES
router.get('/', imageCtrl.index)
router.get('/new', imageCtrl.form)
router.get('/:id', imageCtrl.show)
router.get('/:id/edit', imageCtrl.form)

// Added our uploadImage middleware to our create route
router.post('/', imageCtrl.create, uploadImage)

// Added our uploadImage middleware to our update route
router.post('/:id', imageCtrl.update, uploadImage)
router.delete('/:id', imageCtrl.remove)
router.get('/:id/delete', imageCtrl.remove)

//IMAGES

// RESTful resource mappings (JSON)
router.get(`/`, galaxyCtlr.index);
router.post(`/`, galaxyCtlr.create);
router.get(`/:id(\\d+)`, galaxyCtlr.show);
router.put(`/:id(\\d+)`, galaxyCtlr.update);
router.delete(`/:id(\\d+)`, galaxyCtlr.remove);

// HTML5 Routes:
router.get("/new", galaxyCtlr.form);
router.get("/:id(\\d+)/edit", galaxyCtlr.form);
router.get("/:id(\\d+)/delete", galaxyCtlr.remove);
router.get("/:id(\\d+)", galaxyCtlr.show);
router.post("/:id(\\d+)", galaxyCtlr.update);


// export "router"
module.exports = router;
