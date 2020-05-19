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
                        return res.json('User found!');
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
    const password = Bcrypt.hashSync(req.body.password, 10); //hash the password

    const newUser = new User({username, email, password});

    newUser.save()
        .then(() => 
            res.json('User added!')
        )
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;