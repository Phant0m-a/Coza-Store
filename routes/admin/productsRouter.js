const express = require('express');

const ProductRouter = express.Router();
const { saveImage, deleteFile } = require('../../utils/file_handler')
const ProductModal = require('../../modals/ProductModal');

ProductRouter.get("/", async (req, res) => {
    try {
        //view
        const Products = await ProductModal.find({});
        res.status(200).send({ success: true, message: { Products } });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err });
    }
});



ProductRouter.post("/", async (req, res) => {
    try {
       
        let {
            title,
            price,
            size,
            color,
            quantity,
            featured,
            description,
            productType
        } = req.body;



        const newProduct = ProductModal({
            title: title,
            price: price,
            size: size,
            color: color,
            quantity: quantity,
            featured: featured,
            description: description,
            productType: productType
        });

        // srcImg, productImg
        if (req.files && req.files.imgSrc) {
            // TODO:pushing to array needs work
            let url = await saveImage(req.files.imgSrc);
            if (url != false)
                newProduct.imgSrc = url;
        }
        if (req.files && req.files.imgSrc) {
            // TODO:pushing to array needs work
            let url = await saveImage(req.files.demoImg);
            if (url != false)
                newProduct.demoImg = url;
        }
        await newProduct.save();
        res.status(200).send({ success: true, message: `new Product named:${newProduct.title} added successfully!` });
    } catch (err) {
        res.status(402).send({ success: false, message: err });
    }
});



ProductRouter.put("/", async (req, res) => {

    try {


        let {
            id,
            title,
            price,
            size,
            color,
            quantity,
            featured,
            description,
            productType
        }= req.body;

        let product = await ProductModal.findById(id);
        console.log(product);

        product.title = title ? title : product.title;
        product.price = price ? price : product.price;
        product.size = size ? size : product.size;
        product.color = color ? color : product.color;
        product.quantity = quantity ? quantity : product.quantity;
        product.featured = featured ? featured : product.featured;
        product.description = description ? description : product.description;
        product.productType = productType ? productType : product.productType;

        console.log('00');
        // imgSrc
        if (req.files && req.files.imgSrc) {
            console.log(req.files.imgSrc.name);
            if (product.imgSrc !== "") {
                await deleteFile(product.imgSrc);
            }
            let url = await saveImage(req.files.imgSrc);
            if (url != false)
                product.imgSrc = url;
        }
        console.log('here');
        // ToDo: Demo img uses array work later on it
        // if (req.files && demoImg) {
        //     if (product.demoImg !== "") {
        //         await deleteFile(product.demoImg);
        //     }
        //     let url = await saveImage(demoImg);
        //     if (url != false)
        //         product.demoImg = url;
        // }

        await product.save();
        res.status(200).send({ success: true, message: `new Product named:${product.title} updated successfully!` });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }

});


ProductRouter.delete("/", async (req, res) => {
    try {
        let id = req.body.id;
        //view

        const product = await ProductModal.findById(id);

        if (product.imgSrc !== "") {
            await deleteFile(product.imgSrc);
        }

        //Todo: demoImg have array of img So delete while looping!

        await product.deleteOne({ _id: id });
        res.status(200).send({ success: true, message: 'Product deleted!' });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err });
    }
});


module.exports = ProductRouter;