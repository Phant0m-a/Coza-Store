const express = require('express');

const ProductTypeRouter = express.Router();
const ProductTypeModal = require('../../modals/productType');

ProductTypeRouter.get("/", async (req, res) => {
    try {
        //view
        const cat = await ProductTypeModal.find({});
        res.status(200).send({ success: true, message: { cat } });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err });
    }
});

ProductTypeRouter.post("/", async (req, res) => {
    try {
      
        const {
            title
        } = req.body;
    
        const newCat = ProductTypeModal({
            title: title
        });
        await newCat.save();
        res.status(200).send({ success: true, message: 'new ProductType added successfully!' });
    } catch (err) {
        res.status(401).send({ success: false, message: err});
    }
   

});




module.exports = ProductTypeRouter;