const User = require("../models/user");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validator = require('express-validator');

//VALIDATE, REGISTER USER, LOGIN USER

exports.validate = (method) => {
    
    if (method === "registerUser") {
        return [validator.body('username', 'Username is required!').trim().isLength({ min: 1 }),
                validator.body('email', 'Email is invalid!').isEmail().normalizeEmail(), 
                validator.body('password', 'Password is too short!').trim().isLength({ min: 8 })];
    } else {
        return [validator.body('username', 'Username is required!').trim().isLength({ min: 1 }),
                validator.body('password', 'Password is too short!').trim().isLength({ min: 8 })]
    }
}

exports.registerUser =  (req, res) => {

    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
        //there are errors
        return res.status(400).send(errors.array()[0].msg);

    } else {
        console.log(req.body);

        const username = req.body.username;
        const email = req.body.email;
        const password = Bcrypt.hashSync(req.body.password, 10);
        
        const newUser = new User({username, email, password});
        
        newUser
        .save()
        .then(() => res.status(200).send("Thank you for registering!"))
        .catch((err) => res.status(400).send("ERROR : " + err));
    }
}

exports.loginUser = (req, res) => {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
        //there are errors
        return res.status(400).send(errors.array()[0].msg);

    } else {

        const username = req.body.username;
        const password = req.body.password;

        User.findOne({ username: username }).then((user) => {
            if (!user) {
            return res.status(400).send("No Such User");
            } else {
                Bcrypt.compare(password, user.password).then((ifMatch) => {
                    if (ifMatch) {
                    //create JWT payload
                    const payload = { id: user.id, name: user.username };
                    //sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 31556926 },
                        (err, token) => {
                        return res
                            .status(200)
                            .send({ success: true, token: "Bearer " + token });
                        }
                    );
                    } else {
                    return res.status(400).send("Password is incorrect");
                    }
                });
            }
        });
    }
}
