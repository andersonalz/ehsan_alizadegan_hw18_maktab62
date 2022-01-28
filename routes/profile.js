const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user')

// router.get("/", (req, res) => {
//     res.render("profile");
// });

router.get("/", (req, res) => {
  if(req.session.views){
    req.session.views ++
  }else{
    req.session.views = 1
  }
  if (req.session.user && req.cookies.user_seed) {
    const user = req.session.user;
    res.render("profile", {user , views : req.session.views});
  } else {
    res.redirect("/signIn");
  }
});

router.post("/", async (req, res) => {
  const user_session = req.session.user;
  const data = { firstName, lastName, userName, password, gender, phoneNumber } = req.body;
  if (!req.body.firstName.trim() ||
    !req.body.lastName.trim() ||
    !req.body.userName.trim() ||
    !req.body.gender.trim() ||
    !req.body.phoneNumber.trim()
  ) {
    return res.status(401).json({ message: 'Invalid' })
  }
  if(req.session.user.userName !== req.body.userName && await User.findOne({userName : req.body.userName}))
     return res.redirect("/profile")
  try {
    const updateUser = await User.findOneAndUpdate(user_session, data, {new: true}).lean();
    if(!updateUser){
      return response.status(400).send({
        success: false,
        message: 'user update was unsuccessfully.',
        data: null
    });
    }
    req.session.user = updateUser;
    return res.redirect("/profile");
  } catch (error) {
    res.send(error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("user_seed");
  res.redirect("/signIn");
});

module.exports = router;
