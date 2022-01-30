var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.user && req.cookies.user_seed) {
    res.redirect("/profile");
  } else {
    res.render("login" , {msg : null});
  }
});

router.post('/', async function (req, res) {
  try {
    if (!req.body.userName || !req.body.password) {
      return res.status(403).render("login" , { msg: 'require field' });
    }
    const loginUser = await User.findOne({ userName: req.body.userName , password: req.body.password })
    if (loginUser) {
      req.session.user = loginUser;
      res.redirect("/profile");
    }else{
      return res.render("login" ,{ msg: 'Invalid username or password' })
    }
  } catch (error) {
    res.status(403).json({
    message: "server error",
    err :  error })
  }
})

module.exports = router;
