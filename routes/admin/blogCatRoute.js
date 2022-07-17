const express = require('express');

const BlogsCatRouter = express.Router();


BlogsCatRouter.get("/", async (req, res) => {
    try {
        //view
        const blogs = await blogCategory.find({});
        res.status(200).send({ success: true, message: { blogs } });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err });
    }
});


module.exports = BlogsCatRouter;