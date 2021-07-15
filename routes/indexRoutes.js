var express = require('express');
var router = express.Router();
var userModel = require('../model/User')


/* GET home page. */
router.get('/', (req,res,next)=>{
  res.render('index',{title: 'Trang Chủ'})
})

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

// đăng ký
router.post('/register',  async function(req, res, next) {
  let {phoneNumber, passWord, name, address} = req.body
  let phone = await userModel.findOne({phoneNumber})

  if(phone){
      res.render('register',{err:true , message: "User already exits"})
  }
  if(passWord.length>6){
      res.render('register',{err:true , message: "Password too short"})
  }
  let user = new userModel({phoneNumber,passWord,name,address})
  console.log(user)
  await user.save().catch(err => console.log(err))

  res.redirect('/login')
});

// đăng nhập
router.post('/login', async function(req,res,next) {
  let {phoneNumber, passWord} = req.body
  let user = await userModel.findOne({phoneNumber})
    // check username
   if(!user){
     res.render('login',{err:true , message: "User does not exits"})
   }
   // check pass
   if(user.passWord !== passWord){
     res.render('login',{err:true , message: "Wrong password"})
   }
   res.redirect('/')
})
module.exports = router;
