const express = require('express');
const BlogModal = require('../modals/blogModal');
const { saveImage, deleteFile } = require('../utils/file_handler')
const BlogRouter = express.Router();


BlogRouter.get("/", async (req, res) => {

    try {
        //view
        const blogs = await BlogModal.find({});
        res.status(200).send({ success: true, message: { blogs } });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err });
    }

});


BlogRouter.post("/", async (req, res) => {

    try {
        //write blog
        let newblog = await BlogModal({
            title: req.body.title,
            discription: req.body.discription,
            category: req.body.category,
            author: req.body.author,
            subHeading: req.body.subHeading,
            drafted: req.body.drafted,
            tags: req.body.tags,
        });


        if (req.files && req.files.imgSrc) {

            let url = await saveImage(req.files.imgSrc);
            if (url != false)
                newblog.imgSrc = url;
        }

        await newblog.save();

        res.status(200).send({ success: true, message: `New Blog added with id ${newblog.title}` });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }

});

//edit blog

BlogRouter.put("/", async (req, res) => {

    try {

        //view
        let blog = await BlogModal.findById(req.body.id);

        // i know code is shit! 🙂
        blog.title = req.body.title ? req.body.title : blog.title;
        blog.author = req.body.author ? req.body.author : blog.author;
        blog.subHeading = req.body.subHeading ? req.body.subHeading : blog.subHeading;
        blog.drafted = req.body.drafted ? req.body.drafted : blog.drafted;
        blog.discription = req.body.discription ? req.body.discription : blog.discription;
        blog.category = req.body.category ? req.body.category : blog.category;

        // comments add array isnt working
        // blog.comments = req.body.comments ? req.body.comments : blog.comments;

        // implement tags, use spilcing and index to add or remove or add a tag
        // same goes for adding or removing comments

        if (req.files && req.files.imgSrc) {
            if (blog.imgSrc !== "") {
                await deleteFile(blog.imgSrc);
            }
            let url = await saveImage(req.files.imgSrc);
            if (url != false)
                blog.imgSrc = url;
        }

        blog.drafted = req.body.drafted ? req.body.drafted : blog.drafted;
        await blog.save();
        res.status(200).send({ success: true, message: 'Blog updated!', data: { blog } });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err: err });
    }

});


// delete
BlogRouter.delete("/", async (req, res) => {

    try {
        let id = req.body.id;
        //view

        const blog = await BlogModal.findById(id);

        if(blog.imgSrc !== ""){
            await deleteFile(blog.imgSrc);
        }

        await blog.deleteOne({ _id: id });
        res.status(200).send({ success: true, message: 'Blog deleted!' });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err });
    }

});





module.exports = BlogRouter;