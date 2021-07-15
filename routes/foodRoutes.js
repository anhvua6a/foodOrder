var express = require('express');
var router = express.Router();
var foodModel = require('../model/Food')

router.post('/addFood',async function (req,res,next ){
    let {foodName,price} = req.body
    let image = null;
    if (req.files) {
        image = req.files.image;
        let filename = uniqid() + "-" + image.name;
        image.mv(`./uploads/${filename}`)
        image = filename;
    }

    let food = new foodModel({foodName,price,image})
    console.log(food)
    await food.save().catch(err=> console.log(err))
    console.log(`Thêm xong`)
    res.redirect('/')
})

module.exports = router