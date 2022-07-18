const express = require('express');

const BlogsCatRouter = express.Router();
const blogCat = require('../../modals/blogCategory');

BlogsCatRouter.get("/", async (req, res) => {
    try {
        //view
        const blogs = await blogCat.find({});
        res.status(200).send({ success: true, message: { blogs } });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err });
    }
});

BlogsCatRouter.post("/", async (req, res) => {
    try {
      
        const {
            title
        } = req.body;
    
        const newCat = blogCat({
            title: title
        });
        await newCat.save();
        res.status(200).send({ success: true, message: 'new category added successfully!' });
    } catch (err) {
        res.status(401).send({ success: false, message: err});
    }
   
    // res.redirect("/api/cats/")
});




module.exports = BlogsCatRouter;