let mongoose = require('mongoose')
let EnumCommon = require("../enum/Enumcommon.js");


let billSchema = new mongoose.Schema({
  userID:String,
  address:String,
  description: String,
  price: Number,
  status: {type: Number, default: EnumCommon.BillStatus.DOING}
})

module.exports=mongoose.model('bill',billSchema)