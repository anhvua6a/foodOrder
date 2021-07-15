var express = require('express');
var router = express.Router();
var userModel = require('../model/User')


// api đăng nhập
router.post('/api/login', async function(req,res,next) {
    let {phoneNumber, passWord} = req.body
    let user = await userModel.findOne({phoneNumber})
    // check username
    if(!user){
        res.json({status:'Fail' , message: "User does not exits"})
    }
    // check pass
    if(user.passWord !== passWord){
        res.json({status:'Fail' , message: "Wrong password"})
    }
})

// api đăng ký
router.post('/api/register',  async function(req, res, next) {
    let {phoneNumber, passWord, name, address} = req.body
    let phone = await userModel.findOne({phoneNumber})

    if(phone){
        res.json({status:'Fail' , message: "User already exits"})
    }
    if(passWord.length<6){
        res.json({status:'Fail',message:"Password too short"})
    }
    let user = new userModel({phoneNumber,passWord,name,address})
   // console.log(user)
    await user.save().catch(err => console.log(err))
    res.json({status:'Finish',message:"Đăng ký thành công"})
});