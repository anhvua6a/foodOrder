var mogoose = require('mongoose')
let  EnumCommon = require("../enum/Enumcommon.js");

var foodSchema = new mogoose.Schema({
   foodName: String,
   price: String,
   image: String,
   status: {type: Number, default: EnumCommon.FoodStatus.NORMAL}
})

module.exports=mogoose.model('food',foodSchema)