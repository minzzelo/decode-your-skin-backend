const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username:username, password:password}, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).json('Error: ' + err)
        } 

        if (!user) {
            return res.status(404).send();
        }

        return res.json('User found!');
    })
})

router.route('/registerUser').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({username, email, password});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;