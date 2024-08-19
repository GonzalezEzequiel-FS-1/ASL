const { ContactModel, Pager, filterContacts, sortContacts, PagerNoResultsError, PagerOutOfRangeError, PagerError } = require('@jworkman-fs/asl');
// Get All Contacts
const getAll = async (req, res) => {
    try {
        const allContacts = await ContactModel.index();

        const { filterBy, filterOp, filterVal, sortBy, sortDirection } = req.query;

        let filteredContacts = allContacts;
        if (filterBy && filterOp && filterVal) {
            try {
                filteredContacts = filterContacts(filteredContacts, filterBy, filterOp, filterVal);
            } catch (error) {
                return res.status(400).send({
                    success: false,
                    message: `Invalid filter field: ${filterBy}`
                });
            }
        }

        let sortedContacts = filteredContacts;
        if (sortBy && sortDirection) {
            try {
                sortedContacts = sortContacts(sortedContacts, sortBy, sortDirection);
            } catch (error) {
                return res.status(400).send({
                    success: false,
                    message: `Invalid sort field: ${sortBy}`
                });
            }
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        try {
            const pager = new Pager(sortedContacts, page, limit);
            const results = pager.results();

            if (!Array.isArray(results)) {
                throw new Error('Results are not an array');
            }

            const formattedResults = results.map(contact => ({
                id: contact.id,
                lname: contact.lname,
                fname: contact.fname,
                email: contact.email,
                phone: contact.phone,
                birthday: contact.birthday
            }));

            res.status(200).json({
                success: true,
                data: formattedResults,
                pagination: {
                    total: pager.total,
                    pages: pager.pages,
                    nextPage: pager.next(),
                    prevPage: pager.prev(),
                    left: pager.left
                }
            });
        } catch (error) {
            if (error instanceof PagerNoResultsError) {
                res.status(200).json({
                    success: true,
                    data: [],
                    pagination: {
                        total: 0,
                        pages: 0,
                        nextPage: null,
                        prevPage: null,
                        left: 0
                    }
                });
            } else if (error instanceof PagerOutOfRangeError) {
                res.status(400).send({
                    success: false,
                    message: `Page number out of range: ${error.message}`
                });
            } else if (error instanceof PagerError) {
                res.status(500).send({
                    success: false,
                    message: `Pagination error: ${error.message}`
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: `Failed to get contacts: ${error.message}`
                });
            }
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to get contacts: ${error.message}`
        });
    }
};

// Find Contact by ID
const getContact = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'User ID not provided'
        });
    }

    try {
        const data = await ContactModel.show(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            id: data.id,
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            phone: data.phone,
            birthday: data.birthday
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Consult error: ${error.message}`
        });
    }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID not provided'
        });
    }

    try {
        const removedContact = await ContactModel.remove(id);

        if (removedContact.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: `Contact with ID ${id} not found`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Contact with ID ${id} has been deleted`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Deletion failed: ${error.message}`
        });
    }
};

// Create New Contact
const newContact = async (req, res) => {
    const { fname, lname, phone, birthday, email } = req.body;

    if (!fname || !lname || !phone || !birthday || !email) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }

    try {
        const data = await ContactModel.create({
            fname,
            lname,
            phone,
            birthday,
            email
        });

        const newContactUrl = `/v1/contacts/${data.id}`;

        return res.status(303)
            .location(newContactUrl)
            .json({
                success: true,
                message: 'Contact created successfully. See the Location header for details.'
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Failed to create contact. Error: ${error.message}`
        });
    }
};

// Update Contact
const updateContact = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = {};

        if (req.body.fname !== undefined) {
            updateData.fname = req.body.fname;
        }
        if (req.body.lname !== undefined) {
            updateData.lname = req.body.lname;
        }
        if (req.body.phone !== undefined) {
            updateData.phone = req.body.phone;
        }
        if (req.body.email !== undefined) {
            updateData.email = req.body.email;
        }
        if (req.body.birthday !== undefined) {
            updateData.birthday = req.body.birthday;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields provided for update'
            });
        }

        const contactToUpdate = await ContactModel.update(id, updateData);

        if (!contactToUpdate) {
            return res.status(404).json({
                success: false,
                message: `Contact with ID ${id} not found`
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Contact updated successfully',
            data: contactToUpdate
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Update failed: ${error.message}`
        });
    }
};

module.exports = {
    getAll,
    getContact,
    deleteContact,
    newContact,
    updateContact
};