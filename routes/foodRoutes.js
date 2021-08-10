var express = require('express');
var router = express.Router();
var foodModel = require('../model/Food')
var tableModel = require('../model/Table')
let uniqid = require('uniqid')

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

// update
router.post('/updateFood/:id',async (req,res)=>{
    let id = req.params.id

    // check food tồn tại
    let foodId = await foodModel.findOne({_id:id})
    if(!foodId){
        return res.send("food doesn't exist")
    }

    let image = foodId.image;
    if (req.files) {
        image = req.files.image;
        // tạo tên để k trùng
        let filename = uniqid() + "-" + image.name;
        // save img
        image.mv(`./uploads/${filename}`)
        // gán img = tên vừa tạo
        image = filename;
    }
    await foodModel.findOneAndUpdate({_id:id},{$set:{
        foodName:req.body.foodName,
        price:req.body.price,
        image
        }},{new:true}).then(
            res.redirect('/')
    )
})

// delete
router.get('/deleteFood/:id',async function (req,res){
    let id = req.params.id
    await foodModel.findOneAndDelete({_id:id}).then(
        res.redirect('/')
    ).catch(res.send('lỗi'))
})

router.post('/addTable',async function (req,res,next ){
    let {tableName} = req.body


    let table = new tableModel({tableName})
    console.log(table)
    await table.save().catch(err=> console.log(err))
    console.log(`Thêm xong`)
    res.redirect('/')
})

module.exports = router