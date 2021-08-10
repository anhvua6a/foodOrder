var mongoose = require('mongoose')
let  EnumCommon = require("../enum/Enumcommon.js");

var foodSchema = new mongoose.Schema({
   foodName: String,
   price: String,
   image: String,
   status: {type: Number, default: EnumCommon.FoodStatus.NORMAL}
})

module.exports=mongoose.model('food',foodSchema)