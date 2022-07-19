const express = require('express');
const bcrypt = require("bcryptjs");
const {
    isAuth,
    generateToken,
} = require('../../utils/util');

const { saveImage, deleteFile } = require('../../utils/file_handler')
const { User } = require('mongoose/node_modules/mongodb');
// const UserModal = require('../modals/userModal');
// const CourserModal = require('../modals/courseModal');
// const CatModal = require('../modals/catModal');
const mongoose = require('mongoose');
const UserModal = require('../../modals/userModal');
const BlogModal = require('../../modals/blogModal');
const userRouter = express.Router();



userRouter.get('/newUser', async (req, res) => {
    // res.render('admin/register/register');
    try {
        res.status(200).send({ success: true, message: "bro, This will be add new user form " });
    } catch (err) {
        res.status(401).send({ success: false, message: 'failed! ', err });
    }
})

userRouter.post("/newUser", async (req, res) => {

    try {
        const user = await UserModal.findOne({
            email: req.body.email
        });

        if (user) {

            res.status(401).send({ success: false, message: 'User already Registered with this email!' });

        } else {

            const ePassword = await bcrypt.hashSync(req.body.password, 8);
            const newUser = UserModal({
                name: req.body.name,
                email: req.body.email,
                password: ePassword
            })
            await newUser.save();
            // res.render('home');
            res.status(200).send({ success: true, message: `Registered user Successfully!` });

        }

    }
    catch (err) {
        res.status(401).send({ success: false, message: 'failed! ', err });
    }

});



userRouter.put('/updateUser', async (req, res) => {
    try {
        const user = await UserModal.findOne({
            email: req.body.email
        });

        if (!user) {

            res.status(401).send({ success: false, message: 'No User Registered with this email!' });

        }
        else if (req.body.password !== req.body.cpassword) {
            res.status(401).send({ success: false, message: 'passwords doesnt match!' });

        }
        else if (req.body.password === req.body.cpassword) {
            const ePassword = await bcrypt.hashSync(req.body.password, 8);

            user.password = ePassword;


        } else {
            res.status(401).send({ success: false, message: 'failed to update password! ', err });
        }


        //  check if (user.imgSrc === "") is empty
        // add image & user.imgSrc = new loc
        // else delete last image
        // add image & user.imgSrc = new loc

        if (req.files && req.files.imgSrc) {
            if (user.imgSrc !== "") {
                await deleteFile(user.imgSrc);
            }
            let url = await saveImage(req.files.imgSrc);
            if (url != false)
                user.imgSrc = url;
        }

        await user.save()
        // res.render('admin/register/register');
        res.status(200).send({ success: true, message: "user setting updated successfully!" });

    } catch (err) {
        res.status(401).send({ success: false, message: 'failed to update password! ', err });
    }
})





// all-users

userRouter.get('/allusers', async (req, res) => {
    try {
        // all users 
        let users = await UserModal.find({});

        // all blogs ->users 
        let blogs = await BlogModal.find({}).populate('author',).populate('category').exec();
        
   var usersObject = []; 
        users.forEach(user => {
            for (let i = 0; i < blogs.length; i++) {
              
                if(user.id == blogs[i].author._id){

                        console.log(blogs[i].author.name);
                        // stores blog temporary
                        let Blogs = blogs[i];
                        let newUserObject = {
                            // add user and all blog info
                            user,
                            Blogs
                        };
                        usersObject.push(newUserObject);
                }
                
            }
        });

    //   
    // const userBlogs = await UserModal.aggregate([
    //     {
    //         $match: {
    //             _id: { $eq: mongoose.Types.ObjectId(id) }
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "purchases",
    //             "localField": "_id",
    //             "foreignField": "user",
    //             "as": "purchases"
    //         },
    //     }
    // ]).exec();
    // 

        res.status(200).send({ success: true, message:
             { blogs, users },
              usersObject
             });

    } catch (err) {
        res.status(401).send({ success: false, message: 'failed to update password! ', err });
    }
});




// auth end
module.exports = userRouter;