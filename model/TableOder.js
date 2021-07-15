var mogoose = require('mongoose')
let EnumCommon = require('/enum/Enumcommon')

var tableSchema = new mogoose.Schema({
   userID: String,
   date: date,
   personnumber: Number,
   status: {type: Number, default: EnumCommon.TableOrderStatus.COMING}
})

module.exports=mogoose.model('tableorder',tableSchema)