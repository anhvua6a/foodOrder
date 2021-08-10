var mongoose = require('mongoose')
var foodOrderSchema = new mongoose.Schema({
 billID: String,
 foodID: String
})

module.exports=mongoose.model('foodorder',foodOrderSchema)