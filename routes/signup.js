var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user')

// a12345678A
// const usercreate = {
// firstName: req.body.firstName,
// lastName: req.body.lastName,
// userName: req.body.userName,
// password: req.body.password,
// gender: req.body.gender,
// phoneNumber: req.body.phoneNumber
// }
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('signup', { msg: null });
});

router.post('/', async function (req, res) {
    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (!req.body.firstName.trim() ||
        !req.body.lastName.trim() ||
        !req.body.userName.trim() ||
        !req.body.password.trim() ||
        !req.body.phoneNumber.trim()
    ) {
        return res.status(401).json({ message: 'Invalid' })
    }
    if (!req.body.password.match(regexPass)) {
        return res.status(401).json({ message: 'Invalid password' })
    }
    try {
        const testUnique = await User.findOne({userName: req.body.userName})
        const phoneUnique = await User.findOne({phoneNumber : req.body.phoneNumber})
        if (testUnique || phoneUnique) {
            return res.render('signup' , {msg : "username already use"})
        } else {
            const user = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: req.body.password,
                gender: req.body.gender,
                phoneNumber: req.body.phoneNumber
            })
        }
        res.redirect('/signIn')
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'server error' })
    }
})
module.exports = router;