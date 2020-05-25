const router = require('express').Router();
let User = require('../models/user.model');
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

router.route('/registerUser').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;

    User.findOne({email : email})
        .then((user) => {
            if (user) {
                return res.status(400).send("User exists");
            } else {

                const password = Bcrypt.hashSync(req.body.password, 10); //hash the password

                User.findOne({username : username})
                    .then(user => {
                        if (!user) {
                            const newUser = new User({username, email, password});
                            newUser.save()
                            .then(() => res.status(200).send('Thank you for registering!'))
                            .catch((err) => res.status(400).send("ERROR : " + err))
                        } else {
                            return res.status(400).send("Username exists");
                        }
                    })
            }   
        })
});

router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    User.findOne({username : username})
        .then((user) => {
            if (!user) {
                return res.status(400).send('No Such User');
            } else {
                Bcrypt.compare(password, user.password)
                    .then(ifMatch => {
                        if (ifMatch) {
                        //create JWT payload
                        const payload = {id : user.id, name : user.username};
                        //sign token
                        jwt.sign(payload, keys.secretOrKey, {expiresIn: 31556926}, (err, token) => {
                            return res.status(200).send({success : true, token : "Bearer " + token});
                        });
                        } else {
                            return res.status(400).send( "Password is incorrect");
                        }
                    });
            }
        });
});

module.exports = router;