const express = require('express');

const copyrightRouter = express.Router();

const copyRightModal = require('../../modals/copyRightModal');

copyrightRouter.get("/", async (req, res) => {
    try {
        // get modal
        let copyright = await copyRightModal.find({});
        res.status(200).send({ success: true, message: { copyright } });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }
});

copyrightRouter.post("/", async (req, res) => {
    try {

        const { description } = req.body;
        // get modal
        let copyright = await copyRightModal({
            description: description
        });
        await copyright.save();

        res.status(200).send({ success: true, message: 'Added copyright policy!' });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }
});


copyrightRouter.put("/", async (req, res) => {
    try {
        const { description, id } = req.body;
        // get modal
        let copyright = await copyRightModal.findById(id);
        copyright.description = description;

        await copyright.save();

        res.status(200).send({ success: true, message: 'updated copyright policy!' });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }
});


module.exports = copyrightRouter;