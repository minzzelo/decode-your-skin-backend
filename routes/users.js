const router = require('express').Router();
let User = require('../models/user.model');
const Bcrypt = require("bcryptjs");

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username : username})
        .then((user) => {
            if (!user) {
                return res.send('No Such User');
            } else {
                Bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        return res.send('User found!');
                    } else {
                        return res.send('Incorrect Password');
                    }
                })
            }
        });
})

router.route('/registerUser').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;

    User.findOne({email : email})
        .then((user) => {
            if (user) {
                return res.send("User exists");
            } else {

                const password = Bcrypt.hashSync(req.body.password, 10); //hash the password

                User.findOne({username : username})
                    .then(user => {
                        if (!user) {
                            const newUser = new User({username, email, password});
                            newUser.save()
                            .then(() => res.send('User added!'))
                            .catch((err) => res.status(400).send("ERROR : " + err))
                        } else {
                            return res.send("Username exists");
                        }
                    })
            }   
        })
});

module.exports = router;