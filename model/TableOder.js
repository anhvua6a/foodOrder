var mongoose = require('mongoose')
let EnumCommon = require('../enum/Enumcommon')

var tableSchema = new mongoose.Schema({
   userID: String,
   tableName: String,
   date: Date,
   personNumber: Number,
   status: {type: Number, default: EnumCommon.TableOrderStatus.COMING}
})

module.exports=mongoose.model('tableorder',tableSchema)