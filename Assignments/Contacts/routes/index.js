const express = require('express');
const router = express.Router();

// Import functions from your contact routes file
const {
    getAll,
    getContact,
    deleteContact,
    newContact,
    updateContact,
    filteredContacts
} = require("./controller/userController");

// Imporing required components from @jworkman-fs/asl
const {
    ContactModel,
    Pager,
    sortContacts,
    filterContacts} = require("@jworkman-fs/asl");

// Testing route to verify server is working
router.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'contacts-v1 works'
    });
});

// Testing route to verify contact routes are working
router.get('/contacts/test', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Server works'
    });
});

// Route to get all contacts with optional filtering and sorting
router.get("/contacts", getAll);

// Route to get a single contact by ID
router.get("/contacts/:id", getContact);

// Route to delete a contact by ID
router.delete("/contacts/:id", deleteContact);

// Route to create a new contact
router.post("/contacts", newContact);

// Route to update a contact by ID
router.put("/contacts/:id", updateContact);

module.exports = router;
