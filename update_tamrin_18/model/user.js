const mongoose = require('mongoose');
const schema = mongoose.Schema
const validator = require ('validator')




const UserSchema = schema({
    userName:{
        type : String,
        required : true,
        trim : true,               //because the client can't use space for username firstname and lastname
        minLength : [3 , 'username must be at more 4 characters'],
        maxLength : [30 , 'username must be at less 30 characters'],
        unique : true,
    },
    password:{
        type : String,
        trim : true,
        required : true,
        minLength : [8 , 'password must be at more 8 characters'],
        maxLength : [50 , 'password must be at less 30 characters'],
    },
    firstName:{
        type : String,
        trim : true,
        required : true,
        minLength : [3 , 'firstName must be at more 3 characters'],
        maxLength : [30 , 'firstName must be at less 30 characters'],

    },
    lastName:{
        type : String,
        trim : true,
        required : true,
        minLength : [3 , 'lastName must be at more 3 characters'],
        maxLength : [50 , 'lastName must be at less 50 characters'],
    },
    gender:{
        type : String,
        enum : ['male' , 'female'],
        default : 'male'
    },
    phoneNumber : { 
        type : String,
        trim : true,
        required : true,
        unique : true,
        minLength : [10 , 'phoneNumber must be  10 characters'],
        maxLength : [10 , 'phoneNumber must be  10 characters'],
    },
    role: {
        type: String,
        enum: ['admin', 'blogger'],
        default: 'blogger'
    },
},{
    timestamps: true,
  })


const User = mongoose.model('User', UserSchema)
module.exports = User