var express = require('express');
var router = express.Router();
var foodModel = require('../model/Food')
var tableOderModel = require('../model/TableOder')
var tableModel = require('../model/Table')
var userModel = require('../model/User')


router.get('/listFood', async function (req, res, next) {
    let listFood = await foodModel.find({})
    res.json(listFood)
})

router.get('/listTable', async function (req, res, next) {
    let listTable = await tableModel.find({})
    res.json(listTable)
})


router.post('/tableOrder', async function (req, res, next) {
    let {date, personNumber, userID, tableName} = req.body
    let user = await userModel.findOne({_id: userID})
    let name = await tableModel.findOne({tableName:tableName})

    if (!user) {
        return res.json({status: false, message: "User does not exist"})
    }
    if(!name) {
        return res.json({status: false, message: "Table does not exist"})
    }
    let table = new tableOderModel({userID, date, personNumber, tableName})
    await table.save()
    // đổi trạng thái bàn sau khi đặt thành công
    await tableModel.findOneAndUpdate({_id:name._id},{status:2})
    let socket = req.app.get('socket')
    socket.emit('order', {user, table})

    res.json({status: true, message: 'Đặt bàn thành công'})
})

module.exports = router