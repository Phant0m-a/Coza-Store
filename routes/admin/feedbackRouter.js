const express = require('express');

const FeedbackRouter = express.Router();

const feedbackModal = require('../../modals/feedbackModal');



FeedbackRouter.get("/", async (req, res) => {

    try {
        // get modal
        let feedback = await feedbackModal.find({});
        res.status(200).send({ success: true, message: {feedback} });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }

});

FeedbackRouter.post("/", async (req, res) => {

    try {
        let { email, message, comment, name,
            //  website 
        } = req.body;
        // use modal to save blog
        let feedback = feedbackModal({
            email: email,
            message: message,
            // comment: comment,
            name: name,
        });

        await feedback.save();

        res.status(200).send({ success: true, message: `feeback received Successfully from:${feedback.email} ` });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }

});


module.exports = FeedbackRouter;