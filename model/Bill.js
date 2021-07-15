var mogoose = require('mongoose')
let  EnumCommon = require("../enum/Enumcommon.js");


var billSchema = new mogoose.Schema({
  userID:String,
  address:String,
  description: String,
  price: Number,
  status: {type: Number, default: EnumCommon.BillStatus.DOING}
})

module.exports=mogoose.model('bill',billSchema)