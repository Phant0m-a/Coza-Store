const express = require('express');
const { findById } = require('../../modals/faqModal');

const faqRouter = express.Router();

const faqModal = require('../../modals/faqModal');

faqRouter.get("/", async (req, res) => {
    try {
        // get modal
        let faq = await faqModal.find({});
        res.status(200).send({ success: true, message: { faq } });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }
});


faqRouter.post("/", async (req, res) => {
    try {
        const { question, answer, order } = req.body;

        let count = faqModal.find({});
        count = faqModal.countDocuments();
        // console.log(count);
        // get modal
        let faq = await faqModal({
            question: question, answer: answer, order: order
            //  parseInt(count) + 1,
        });
        await faq.save();

        res.status(200).send({ success: true, message: 'Added faq successfully!' });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }
});
faqRouter.put("/", async (req, res) => {
    try {
        //  take _id 
        const { id, order, question, answer } = req.body;
        // get modal
        let faq = await faqModal.findById(id);

      
            faq.question= question ? question : faq.question,
            faq.answer= answer ? answer : faq.answer,
            faq.order= order ? parseInt(order) : faq.order
    
        await faq.save();

        res.status(200).send({ success: true, message: `updated Faq!${faq.id}` });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }
});

faqRouter.delete('/', async (req, res) => {
    try {
        const { id } = req.body;
        faqModal.findByIdAndDelete({ _id: id });
        res.status(200).send({ success: true, message: `deleted Faq successfully!` });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }
});


module.exports = faqRouter;