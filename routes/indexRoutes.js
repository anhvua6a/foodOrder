var express = require('express');
var router = express.Router();
var userModel = require('../model/User')
var foodModel = require('../model/Food')
let authMiddle = require('../middleware/AuthMiddle')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {RoleUser} = require('../enum/Enumcommon')

/* GET home page. */
router.get('/', authMiddle.checkLogin, async (req, res, next) => {
    let listFood = await foodModel.find({})
    res.render('index', {title: 'Trang Chủ', nav: true, foods: listFood})
})

// router.get('/',  async (req, res, next) => {
//     let listFood = await foodModel.find({})
//     res.render('index', {title: 'Trang Chủ', nav: true, foods: listFood})
// })

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Đăng nhập'});
});

router.get('/register', function (req, res, next) {
    res.render('register', {title: 'Express'});
});

// đăng ký
router.post('/register', async function (req, res, next) {
    let {phoneNumber, passWord, name, address} = req.body
    if (phoneNumber.length === 0 || passWord.length === 0 || name.length === 0 || address.length === 0) {
        return res.render('register', {title: 'Đăng kí', err: true, message: "Empty"})

    }
    let phone = await userModel.findOne({phoneNumber})

    if (phone) {
        return res.render('register', {title: 'Đăng kí', err: true, message: "User already exits"})
    }
    if (passWord.length < 6) {
        return res.render('register', {title: 'Đăng kí', err: true, message: "Password too short"})
    }
    let hash = await bcrypt.hash(passWord, saltRounds);
    let user = new userModel({
        phoneNumber,
        passWord: hash,
        name,
        address
    })
    await user.save().catch(err => console.log(err))
    res.redirect('/login')
});

// đăng nhập
router.post('/login', async function (req, res, next) {
    let {phoneNumber, passWord} = req.body
    let user = await userModel.findOne({phoneNumber})
    // check username
    if (!user) {
        return res.render('login', {err: true, message: "User does not exits"})
    }
    // check pass
    let checkPass = await bcrypt.compare(passWord, user.passWord);
    if (!checkPass) {
        return res.render('login', {err: true, message: "Wrong password"})
    }
    if (user.role !== RoleUser.ADMIN) {
        return res.render('login', {err: true, message: "You have not permission"})
    }
    // Set cookie
    res.cookie('user_id', user._id)
    return res.redirect('/')
})

// update
router.post('/update/:id', async (req, res) => {
    let id = req.params.id
    await userModel.findOneAndUpdate({_id: id}, {
        $set: {
            status: req.body.status
        }
    }, {new: true}).then(() => res.redirect('/users')).catch(err => console.log(err))
})
module.exports = router;
