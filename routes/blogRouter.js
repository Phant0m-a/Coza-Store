const express = require('express');
const BlogModal = require('../../tgcindiawebsite/modals/blogModal');
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
        const newblog = await BlogModal({
            title: req.body.title,
            discription: req.body.discription,
            category: req.body.category,
            thumbnail: req.body.thumbnail,
            content: req.body.content,
            drafted: req.body.drafted
        });

        await newblog.save();

        res.status(200).send({ success: true, message: { newblog } });
    } catch (err) {
        res.status(401).send({ success: false, message: 'Something went wrong', err });
    }


    //edit blog

    BlogRouter.put("/", async (req, res) => {

        try {
            //view
            const blog = await BlogModal.findById(id);

            blog.title = req.body.title ? req.body.title : blog.title;
            blog.discription = req.body.discription ? req.body.discription : blog.discription;
            blog.category = req.body.category ? req.body.category : blog.category;

            // implement if image exists>>
            if (req.files && req.files.thumbnail) {
                if (blog.thumbnail !== "") {
                    await deleteFile(blog.thumbnail);
                }
                let url = await saveImage(req.files.thumbnail);
                if (url != false)
                    blog.thumbnail = url;
            }

            blog.content = req.body.content ? req.body.content : blog.content;
            blog.drafted = req.body.drafted ? req.body.drafted : blog.drafted;

            res.status(200).send({ success: true, message: 'Blog updated!', data: { blog } });
        } catch (err) {
            res.status(401).send({ success: false, message: 'Something went wrong', err });
        }

    });


    // delete
    BlogRouter.delete("/", async (req, res) => {

        try {
            const {
                id
            } = req.body;
            //view

            const blog = await BlogModal.findById(id);

            await deleteFile(blog.thumbnail);
            await blog.findByIdAndDelete(id);
            res.status(200).send({ success: true, message: 'Blog deleted!' });
        } catch (err) {
            res.status(401).send({ success: false, message: 'Something went wrong', err });
        }

    });


});


module.exports = BlogRouter;