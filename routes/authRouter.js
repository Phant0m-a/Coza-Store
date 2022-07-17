const express = require('express');
const bcrypt = require("bcryptjs");
const {
    // isAuth,
    generateToken
} = require('../utils/util');

const { User } = require('mongoose/node_modules/mongodb');
const UserModal = require('../modals/userModal');
// const CourserModal = require('../modals/courseModal');
// const CatModal = require('../modals/catModal');
const mongoose = require('mongoose')
const authRouter = express.Router();


authRouter.get("/", async (req, res) => {

    try {
        const users = await UserModal.find({});
        res.status(200).send({ success: true, data: users });
        // res.render('user/user', { users })
    } catch (err) {
        res.status(300).send({ success: false, message: `something went wrong ${err}` });


    }
});

// get user info ..here purchases {it will be changed don't worry}
authRouter.post('/', async (req, res) => {
    const {
        userid
    } = req.body;

    // const userPurchases = await UserModal.aggregate([
    //     {
    //         $match: {
    //             _id: { $eq: mongoose.Types.ObjectId(userid) }
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

    try {
        res.status(200).send({
            success: true,
            // message: userPurchases 
            message: 'you get nothing!'
        });
    } catch (err) {
        res.status(500).send({ success: false, message: `something went wrong! ${err}` });
    }

});


authRouter.get('/login', async (req, res) => {
    res.render('admin/login/login');
})

authRouter.post("/login", async (req, res) => {

    const {
        email,
        password
    } = req.body;

    const user = await UserModal.findOne({
        email: email
    });

    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.cookie('token', token);
            res.status(200).send({ success: true, message: "Login Successfully", user: user });
            // res.redirect('/api/home/')
        } else {
            res.status(401).send({ success: false, message: "User record not found!" });
            // res.render("admin/login/login", {
            //     errorMessage: 'Incorrect credentials'
            // });
        }
    } else {
        res.status(401).send({ success: false, message: "User record not found!" });
        // res.render("admin/login/login", {
        //     errorMessage: 'Incorrect credentials'
        // });
    }
});

authRouter.get('/logout', async (req, res) => {
    res.clearCookie('token');

    res.status(200).send({ success: true, message: 'logged out and cookies cleared!' });
    // res.redirect('/api/auth/login')
});

authRouter.get('/register', async (req, res) => {
    // res.render('admin/register/register');
    res.status(200).send({ success: true, message: "bro, im working on backend" });
})

authRouter.post("/register", async (req, res) => {

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
            res.status(200).send({ success: true, message: `Registered user Successfully, goto http://localhost:5000/auth/login to Login` });

        }

    }
    catch (err) {
        res.status(401).send({ success: false, message: 'failed! ', err });
    }

});
// auth end
module.exports = authRouter;