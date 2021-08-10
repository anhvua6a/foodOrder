var mongoose = require('mongoose')
let EnumCommon = require('../enum/Enumcommon')

var tableSchema = new mongoose.Schema({
    tableName: String,
    status: {type: Number, default: EnumCommon.TableStatus.NORMAL}
})

module.exports=mongoose.model('table',tableSchema)