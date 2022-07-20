const express = require('express');
const { findById } = require('../../modals/faqModal');

const tNCRouter = express.Router();

const termsModal = require('../../modals/terms&conModal');

tNCRouter.get("/", async (req, res) => {
    try {
        // get modal
        let terms = await termsModal.find({});
        res.status(200).send({ success: true, message: { terms } });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }
});


tNCRouter.post("/", async (req, res) => {
    try {
        const { terms } = req.body;


        // get modal
        let term = await termsModal({
            terms: terms
        });
        await term.save();

        res.status(200).send({ success: true, message: 'Added term successfully!' });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }
});
tNCRouter.put("/", async (req, res) => {
    try {
        //  take _id 
        const { id, terms } = req.body;

        // get modal
        let term = await termsModal.findById(id);


        term.terms = terms ? terms : term.terms

        await term.save();

        res.status(200).send({ success: true, message: `updated term!${term.id}` });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }
});

tNCRouter.delete('/', async (req, res) => {
    try {
        const { id } = req.body;
        termsModal.findByIdAndDelete({ _id: id });
        res.status(200).send({ success: true, message: `deleted term successfully!` });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }
});


module.exports = tNCRouter;