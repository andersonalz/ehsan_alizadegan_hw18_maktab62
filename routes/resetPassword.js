const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const User = require("../model/user")

router.get('/' , (req , res) => {
    const user = req.session.user
    if(req.session.user && req.cookies.user_seed){
      res.render('resetPassword' ,{ user , msg : null})  
    }else{
        res.redirect('/signIn')
    }
})



router.post('/' , async (req , res) => {
    const user_session = req.session.user
    const data = {password , NewPassword , ReNewPassword} = req.body
try {
    if(!passUser){
        return res.render('resetPassword' , {msg : "require filed"})
    }
    if(req.body.NewPassword !== req.body.ReNewPassword){
        return res.render('resetPassword' , {msg : "pass and repass not equal"})
    }
    if(!await User.findOne({password : req.body.password})){
        return res.render('resetPassword' , {msg : "password is wrong"})
    }
    const resetPassword = await User.findOneAndUpdate( user_session , {password:req.body.NewPassword }  , {new : true}).lean();
    if(!resetPassword){
      return  res.render('resetPassword' , {msg : "update password failed" })
    }
    req.session.user = resetPassword  
    return res.redirect('/profile')
} catch (error) {
    res.render('resetPassword' , {msg : "problem in server"})
}
})
module.exports = router